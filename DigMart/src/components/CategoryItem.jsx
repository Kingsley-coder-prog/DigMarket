import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, mobilesmall, tablet } from "../responsiveness";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
  ${mobilesmall({ height: "40vh" })}
   ${tablet({ height: "40vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  background-color: white;
  padding: 10px;
  font-size: 20px;
  color: teal;
  margin-bottom: 20px;
`;
const Button = styled.button`
  background-color: teal;
  padding: 10px;
  font-size: 20px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>
          <Link to="/products">Shop Now</Link>
        </Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
