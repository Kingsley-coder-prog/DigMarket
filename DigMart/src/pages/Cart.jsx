import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import ContentWrap from "../components/ContentWrap";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SingleCartItem from "../components/SingleCartItem";
import { useCtx } from "../context/AppContext";
import { tablet } from "../responsiveness";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f5fafd;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid teal;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin: 30px 0 10px 0;
`;

const SummaryTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "25px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
  border-radius: 10px;
`;

const Cart = () => {
  const { cart } = useCtx();
  const costOfProducts = cart.reduce(
    (prev, curr) => prev + curr.price * curr.count,
    0
  );
  const shippingFee = 100;
  const discount = 50;
  return (
    <Container>
      <ContentWrap>
        <Wrapper>
          <Title>SHOPPING CART</Title>
          <Top>
            <TopButton>
              <Link to="/products">CONTINUE SHOPPING</Link>
            </TopButton>
            <TopTexts>
              {/* <TopText>Iphone 13 pro (1)</TopText> */}
              <TopText>Your Wishlist (0)</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {cart &&
                cart.map((item, index) => {
                  return <SingleCartItem key={index} item={item} />;
                })}

              <Hr />
            </Info>
            {cart.length !== 0 && (
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>SubTotal</SummaryItemText>
                  <SummaryItemPrice>{costOfProducts} CFX</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping Cost</SummaryItemText>
                  <SummaryItemPrice>{shippingFee} CFX</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>{discount} CFX</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    {costOfProducts + shippingFee + discount} CFX
                  </SummaryItemPrice>
                </SummaryItem>
                <Button>CHECKOUT NOW</Button>
              </Summary>
            )}
          </Bottom>
        </Wrapper>
      </ContentWrap>
    </Container>
  );
};

export default Cart;
