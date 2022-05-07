const DigitalMarketPlace_Contract = artifacts.require("MarketPlace");
const DigimartToken = artifacts.require("DigiMart");

module.exports = async function(deployer) {
   deployer.deploy(DigimartToken).then(function(){
      return deployer.deploy(DigitalMarketPlace_Contract, DigimartToken.address)
  });
};
