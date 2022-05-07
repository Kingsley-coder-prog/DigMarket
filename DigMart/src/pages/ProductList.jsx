import styled from "styled-components";
import ContentWrap from "../components/ContentWrap";

import Newsletter from "../components/Newsletter";
import Products from "../components/Products";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      <ContentWrap>
        <Title>Phones and Accessories</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Accessories:</FilterText>
            <Select>
              <Option disabled selected>
                Accessories
              </Option>
              <Option>ipod</Option>
              <Option>charger</Option>
              <Option>earpiece</Option>
              <Option>mp3 player</Option>
              <Option>charger cord</Option>
            </Select>
            <Select>
              <Option disabled selected>
                Color
              </Option>
              <Option>Black</Option>
              <Option>White</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Ash</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Accessories:</FilterText>
            <Select>
              <Option selected>Newest</Option>
              <Option>Price(Asc)</Option>
              <Option>Price(Desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products />
        <Newsletter />
      </ContentWrap>
    </Container>
  );
};

export default ProductList;
