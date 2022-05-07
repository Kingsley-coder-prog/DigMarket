//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@chainlink/contracts/src/v0.4/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Ownable.sol";

interface IMarketplace1 {
    enum ProductState {
        NotDeployed, // don't exist or removed
        Deployed // created or redeployed
    }

    enum Currency {
        DMT, // "token wei" (10^-18 GMT)
        USD // dollars (10^-18 USD)
    }

    function getProduct(bytes32 id)
        external
        view
        returns (
            string memory name,
            address owner,
            address beneficiary,
            uint256 pricePerSecond,
            Currency currency,
            ProductState state
        );
}

contract Marketplace is Ownable, IMarketplace1 {
    using SafeMath for uint256;
    bool public halted = false;
    IERC20 public digimart;
    IMarketplace1 marketplace;
    AggregatorV3Interface internal priceFeed;
    address public currencyUpdateAgent;
    address payable public _beneficiary;
    //uint public dmtPerUsd = 100000000000000000; //Exchange rates is formatted as 10^18, like ether = 0.1 DMT/USD.

    uint8 constant INTERNAL_PRICE_DECIMALS = 2;

    mapping(address => uint256[]) public cart;
    mapping(bytes32 => Product) public products;
    mapping(uint256 => StoreData) storeData;
    mapping(uint256 => address) productBalance;
    mapping(address => uint256) amountSpentByCustomerInUsd; //Track amount spent by each customer

    /// events
    event Halted();
    event Resumed();

    // product events
    event ProductCreated(
        address indexed owner,
        bytes32 indexed id,
        string name,
        address beneficiary,
        Currency currency
    );
    event ProductUpdated(
        address indexed owner,
        bytes32 indexed id,
        string name,
        address beneficiary,
        Currency currency
    );
    event ProductDeleted(
        address indexed owner,
        bytes32 indexed id,
        string name,
        address beneficiary,
        Currency currency
    );
    event ProductImported(
        address indexed owner,
        bytes32 indexed id,
        string name,
        address beneficiary,
        Currency currency
    );
    event ProductRedeployed(
        address indexed owner,
        bytes32 indexed id,
        string name,
        address beneficiary,
        Currency currency
    );
    event ProductOwnershipOffered(
        address indexed owner,
        bytes32 indexed id,
        address indexed to
    );
    event ProductOwnershipChanged(
        address indexed newOwner,
        bytes32 indexed id,
        address indexed oldOwner
    );
    event PurchaseSuccessful(address customer, uint256 amount);
    event Withdraw(uint256 amount);

    event PaymentRequiredUSD(uint256 paymentusd);
    event UsdToDmt(uint256 usd_wei);
    event Dmt(uint256 dmt_cost);

    // modifiers
    modifier whenNotHalted() {
        require(!halted || owner == msg.sender, "error_halted");
        _;
    }

    modifier onlyProductOwner(bytes32 productId) {
        (, address _owner, , , , ) = getProduct(productId);
        require(_owner != address(0), "error_notFound");
        require(
            _owner == msg.sender || owner == msg.sender,
            "error_productOwnersOnly"
        );
        _;
    }

    // Product registry
    struct Product {
        bytes32 id;
        string name;
        address owner;
        address beneficiary; // account where revenue is directed to
        Currency priceCurrency;
        ProductState state;
        address newOwnerCandidate;
    }

    // stores data for a single product release
    struct StoreData {
        uint32 startPriceUsd;
        uint32 endPriceUsd;
        uint32 feesPerproductUsd;
        uint16 totalProductSupply;
        uint16 buybackPercent;
        uint256 startTimestamp;
        uint256 endTimestamp;
    }

    constructor(address digiMartTokenAddress) public Ownable() {
        _initialize(digiMartTokenAddress);
        // Chainlink ETH/USD Kovan Address = 0x9326BFA02ADD2366b30bacB125260Af641031331
        priceFeed = AggregatorV3Interface(
            0x9326BFA02ADD2366b30bacB125260Af641031331
        );
    }

    function reInitialize(address digiMartTokenAddress) public onlyOwner {
        _initialize(digiMartTokenAddress);
    }

    function _initialize(address digiMartTokenAddress) internal {
        digimart = IERC20(digiMartTokenAddress);
    }

    /**
     * get product details
     */
    function getProduct(bytes32 id)
        public
        view
        override
        returns (
            string memory name,
            address owner,
            address beneficiary,
            uint256 pricePerSecond,
            Currency currency,
            ProductState state
        )
    {
        if (owner != address(0) || address(marketplace) == address(0))
            return (name, owner, beneficiary, pricePerSecond, currency, state);
        (
            name,
            owner,
            beneficiary,
            pricePerSecond,
            currency,
            state
        ) = marketplace.getProduct(id);
        return (name, owner, beneficiary, pricePerSecond, currency, state);
    }

    function _getProductDetails(bytes32 productId)
        internal
        returns (bool imported)
    {
        if (address(marketplace) == address(0)) {
            return false;
        }
        Product storage p = products[productId];
        if (p.id != 0x0) {
            return false;
        }
        (
            string memory _name,
            address _owner,
            address _beneficial,
            uint256 _pricePerSecond,
            IMarketplace1.Currency _priceCurrency,
            IMarketplace1.ProductState _state
        ) = marketplace.getProduct(productId);
        if (_owner == address(0)) {
            return false;
        }
        p.id = productId;
        p.name = _name;
        p.owner = _owner;
        p.beneficiary = _beneficial;
        p.priceCurrency = _priceCurrency;
        p.state = _state;
        emit ProductImported(
            p.owner,
            p.id,
            p.name,
            p.beneficiary,
            p.priceCurrency
        );
        return true;
    }

    // Add carts
    function addItemsToCart(uint256 _productId) public {
        cart[msg.sender].push(_productId);
    }

    function getItemFromCart() public view returns (uint256[] memory) {
        return cart[msg.sender];
    }

    /**
     * createProductProfile for listing
     */
    function createProductProfile(
        bytes32 id,
        string memory name,
        address beneficiary,
        Currency currency
    ) public whenNotHalted {
        _createProductProfile(id, name, beneficiary, currency);
    }

    function _createProductProfile(
        bytes32 id,
        string memory name,
        address beneficiary,
        Currency currency
    ) internal {
        require(id != 0x0, "error_nullProductId");
        (, address _owner, , , , ) = getProduct(id);
        require(_owner == address(0), "error_alreadyExists");
        products[id] = Product({
            id: id,
            name: name,
            owner: msg.sender,
            beneficiary: beneficiary,
            priceCurrency: currency,
            state: ProductState.Deployed,
            newOwnerCandidate: address(0)
        });
        emit ProductCreated(msg.sender, id, name, beneficiary, currency);
    }

    /**
     * Stop offering the product
     */
    function removeProduct(bytes32 productId)
        public
        onlyProductOwner(productId)
    {
        _getProductDetails(productId);
        Product storage p = products[productId];
        require(p.state == ProductState.Deployed, "error_notDeployed");
        p.state = ProductState.NotDeployed;
        emit ProductDeleted(
            p.owner,
            productId,
            p.name,
            p.beneficiary,
            p.priceCurrency
        );
    }

    /**
     * Return product to market
     */
    function redeployProduct(bytes32 productId)
        public
        onlyProductOwner(productId)
    {
        _getProductDetails(productId);
        Product storage p = products[productId];
        require(p.state == ProductState.NotDeployed, "error_mustBeNotDeployed");
        p.state = ProductState.Deployed;
        emit ProductRedeployed(
            p.owner,
            productId,
            p.name,
            p.beneficiary,
            p.priceCurrency
        );
    }

    /**
     * update product status
     */
    function updateProduct(
        bytes32 productId,
        string memory name,
        address beneficiary,
        Currency currency,
        bool redeploy
    ) public onlyProductOwner(productId) {
        _getProductDetails(productId);
        Product storage p = products[productId];
        p.name = name;
        p.beneficiary = beneficiary;
        p.priceCurrency = currency;
        emit ProductUpdated(p.owner, p.id, name, beneficiary, currency);
        if (redeploy) {
            redeployProduct(productId);
        }
    }

    function currentProductPrice(uint256 tokenId)
        public
        view
        returns (
            uint32,
            uint32,
            uint32,
            uint32
        )
    {
        return productPriceData(tokenId, block.timestamp);
    }

    /**
     *   get product data
     */
    function productPriceData(uint256 productId, uint256 targetDate)
        public
        view
        returns (
            uint32,
            uint32,
            uint32,
            uint32
        )
    {
        StoreData storage store = storeData[productId];

        uint256 startTimestamp = store.startTimestamp;
        uint256 endTimestamp = store.endTimestamp;
        uint256 clampedDate = Math.max(
            startTimestamp,
            Math.min(endTimestamp, targetDate)
        );
        uint256 totalAgingDuration = endTimestamp - startTimestamp;
        uint256 elapsedDuration = clampedDate - startTimestamp;

        uint32 startPrice = store.startPriceUsd;
        uint32 endPrice = store.endPriceUsd;
        uint32 priceRange = endPrice - startPrice;
        uint32 additionalPrice = uint32(
            uint256(priceRange).mul(elapsedDuration).div(totalAgingDuration)
        );
        uint32 currProductPrice = store.startPriceUsd + additionalPrice;

        return (
            currProductPrice,
            store.startPriceUsd,
            store.endPriceUsd,
            store.feesPerproductUsd
        );
    }

    /**
     * Changes ownership of the product.
     */
    function offerProductOwnership(bytes32 productId, address newOwnerCandidate)
        public
        onlyProductOwner(productId)
    {
        _getProductDetails(productId);
        products[productId].newOwnerCandidate = newOwnerCandidate;
        emit ProductOwnershipOffered(
            products[productId].owner,
            productId,
            newOwnerCandidate
        );
    }

    /**
     * Changes ownership of the product.
     */
    function claimProductOwnership(bytes32 productId) public whenNotHalted {
        _getProductDetails(productId);
        Product storage p = products[productId];
        require(msg.sender == p.newOwnerCandidate, "error_notPermitted");
        emit ProductOwnershipChanged(msg.sender, productId, p.owner);
        p.owner = msg.sender;
        p.newOwnerCandidate = address(0);
    }

    function halt() public onlyOwner {
        halted = true;
        emit Halted();
    }

    function resume() public onlyOwner {
        halted = false;
        emit Resumed();
    }

    /**
     * purchase product.
     */
    function purchase(uint256 amount, uint16 quantity) public payable {
        require(
            msg.sender != productBalance[amount],
            "cannot purchase product"
        );

        (uint32 tokenPriceUsd, , , uint32 feePriceUsd) = productPriceData(
            amount,
            block.timestamp
        );
        uint256 paymentRequiredUSD = uint256(tokenPriceUsd + feePriceUsd).mul(
            quantity
        );
        uint256 usdToDmt = usdToDmtExchangeRate();
        emit UsdToDmt(usdToDmt);
        emit PaymentRequiredUSD(paymentRequiredUSD);

        uint256 dmtRequired = paymentRequiredUSD.mul(usdToDmt);
        emit Dmt(dmtRequired);
        require(
            msg.value >= dmtRequired,
            "Payment does not cover the price of the product."
        );
        digimart.transferFrom(msg.sender, address(this), dmtRequired);
        amountSpentByCustomerInUsd[msg.sender] += paymentRequiredUSD;

        uint256 feesInUsd = uint256(feePriceUsd).mul(quantity);
        uint256 feesInDmt = feesInUsd.mul(usdToDmt);
        (bool success, ) = productBalance[amount].call{
            value: msg.value.sub(feesInDmt)
        }("");
        require(success, "Transfer did not succceed.");
        emit PurchaseSuccessful(msg.sender, dmtRequired);
    }

    /**
     * usd to dmt rate.
     */
    function usdToDmtExchangeRate() internal view returns (uint256) {
        (, int256 usdToEthRate, , , ) = priceFeed.latestRoundData();
        uint8 rateDecimals = priceFeed.decimals();
        require(usdToEthRate > 0, "Cannot buy when rate is 0 or less.");
        uint256 usdToDmt = uint256(10**(rateDecimals - INTERNAL_PRICE_DECIMALS))
            .mul(1 ether)
            .div(uint256(usdToEthRate));
        return usdToDmt;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        _beneficiary.transfer(balance);
        emit Withdraw(balance);
    }
}
