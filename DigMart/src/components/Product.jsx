import { Box } from "@material-ui/core";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import cogoToast from "cogo-toast";
import styled from "styled-components";
import { useCtx } from "../context/AppContext";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 128, 128, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 250px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fafd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
  width: 100%;
  object-fit: contain;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 1s ease;
  &:hover {
    background-color: teal;
    transform: scale(1.5);
  }
`;

const Product = ({ item }) => {
  const { addCartItem, cartIds } = useCtx();
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon
          onClick={() => {
            cartIds.includes(item.id)
              ? cogoToast.error("already added", { position: "bottom-right" })
              : addCartItem(item);
          }}
        >
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
