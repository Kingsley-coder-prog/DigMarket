import {
  Facebook,
  Instagram,
  MailOutlined,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile, mobilesmall, tablet } from "../responsiveness";
import ContentWrap from "./ContentWrap";

const Wrapper = styled.div`
  display: flex;

  ${mobile({ flexDirection: "column" })}
  ${mobilesmall({ flexDirection: "column" })}
   ${tablet({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "teal",
      }}
    >
      <ContentWrap>
        <Wrapper>
          <Left>
            <Logo>DigitalMart</Logo>
            <Desc>
              DigitalMart is the best marketplace were you can get all your
              gadgets at the comfort of your home with your crypto, for Now we
              support Conflux token
            </Desc>
            <SocialContainer>
              <SocialIcon color="3B5999">
                <Facebook />
              </SocialIcon>
              <SocialIcon color="E4405F">
                <Instagram />
              </SocialIcon>
              <SocialIcon color="55ACEE">
                <Twitter />
              </SocialIcon>
              <SocialIcon color="E60023">
                <Pinterest />
              </SocialIcon>
            </SocialContainer>
          </Left>
          <Center>
            <Title>useful Links</Title>
            <List>
              <ListItem>Home</ListItem>
              <ListItem>Cart</ListItem>
              <ListItem>Categoties</ListItem>
              <ListItem>Accessories</ListItem>
              <ListItem>My Account</ListItem>
              <ListItem>Order Tracking</ListItem>
              <ListItem>Wishlist</ListItem>
              <ListItem>Terms</ListItem>
            </List>
          </Center>
          <Right>
            <Title>Contact</Title>
            <ContactItem>
              <Room style={{ marginRight: "10px" }} />
              25, Rumuola Port Harcourt, Rivers, Nigeria.
            </ContactItem>
            <ContactItem>
              <Phone style={{ marginRight: "10px" }} /> +234 816 540 7995
            </ContactItem>
            <ContactItem>
              <MailOutlined style={{ marginRight: "10px" }} />{" "}
              Contact@digitalmart.com
            </ContactItem>
          </Right>
        </Wrapper>
      </ContentWrap>
    </div>
  );
};

export default Footer;
