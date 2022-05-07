import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile, mobilesmall, tablet } from "../responsiveness";

const Container = styled.div`
  height: 60vh;
  background-color: #f5fafd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  margin-bottom: 20px;
  color: teal;
  textalign: "center";
  ${tablet({ fontSize: "70px" })};
  ${mobile({ fontSize: "50px" })}
  ${mobilesmall({ fontSize: "34px" })}
`;
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
  padding: 0 5px;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid teal;
  ${mobile({ width: "80%" })}
  ${mobilesmall({ width: "80%" })}
   ${tablet({ width: "80%" })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 2;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Subscribe to Get updates on latest products</Desc>
      <InputContainer>
        <Input placeholder="Email Here" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
