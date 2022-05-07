import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCtx } from "../context/AppContext";
import { mobile, mobilesmall, tablet } from "../responsiveness";
import ContentWrap from "./ContentWrap";

const Container = styled.div`
  height: 60px;
  background-color: teal;
  padding: 0 10px;
  ${mobile({ height: "50px" })}
  ${mobilesmall({ height: "50px" })}
   ${tablet({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
  ${mobilesmall({ padding: "10px 0px" })}
   ${tablet({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${tablet({ display: "none" })}
`;
const Language = styled.span`
  font-size: 14;
  cursor: pointer;
  ${mobile({ display: "none" })}
  ${mobilesmall({ display: "none" })}
${tablet({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  ${mobilesmall({ width: "50px" })}
${tablet({ width: "100px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${tablet({ textAlign: "left" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  ${mobilesmall({ fontSize: "24px" })}
${tablet({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2 })}
  ${mobilesmall({ flex: 2 })}
${tablet({ flex: 2 })}
`;

const MenuItem = styled.div`
  font-size: 14;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  ${mobilesmall({ fontSize: "12px", marginLeft: "10px" })}
${tablet({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const { cart } = useCtx();
  return (
    <Container>
      <ContentWrap>
        <Wrapper>
          <Left>
            {/* <Language>EN</Language> */}
            <SearchContainer>
              <Input placeholder="search" />
              <Search style={{ color: "white", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to="/">
              <Logo>DigitalMart</Logo>
            </Link>
          </Center>
          <Right>
            <Link to="/signup">
              <MenuItem>SignUp</MenuItem>
            </Link>
            <Link to="/signin">
              <MenuItem>SignIn</MenuItem>
            </Link>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </ContentWrap>
    </Container>
  );
};

export default Navbar;
