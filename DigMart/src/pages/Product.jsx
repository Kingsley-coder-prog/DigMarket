import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import ContentWrap from "../components/ContentWrap";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 40px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  background-color: teal;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
`;

const Button = styled.button`
  padding: 15px;
  border-radius: 50px;
  border: 2px solid black;
  background-color: teal;
  cursor: pointer;
  font-weight: 700;
  color: white;

  &: hover {
    background-color: white;
    color: black;
  }
`;

const Product = () => {
  return (
    <Container>
      <ContentWrap>
        <Wrapper>
          <ImgContainer>
            <Image src="https://i.ibb.co/6DgV4sk/iphone-13-pro.jpg" />
          </ImgContainer>
          <InfoContainer>
            <Title>Phone 13 Pro</Title>
            <Desc>
              The iPhone 13 Pro is Apple's smaller premium iPhone with a 6.1"
              screen size and for the first time in an iPhone, it comes with a
              120Hz ProMotion display for super smooth scrolling. The list of
              innovations includes a more capable triple camera setup, with a
              wide, ultra-wide and zoom cameras, as well as a LiDAR scanner.
            </Desc>
            <Price>5000 CFX</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color:</FilterTitle>
                <FilterColor color="black" />
                <FilterColor color="white" />
                <FilterColor color="darkblue" />
              </Filter>
              <Filter>
                <FilterTitle>Screensize:</FilterTitle>
                <FilterSize>
                  <FilterSizeOption>5.78 inch</FilterSizeOption>
                  <FilterSizeOption>5.78 inch</FilterSizeOption>
                  <FilterSizeOption>5.78 inch</FilterSizeOption>
                  <FilterSizeOption>5.78 inch</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove />
                <Amount>1</Amount>
                <Add />
              </AmountContainer>
              <Button>Add To Cart</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
      </ContentWrap>
    </Container>
  );
};

export default Product;
