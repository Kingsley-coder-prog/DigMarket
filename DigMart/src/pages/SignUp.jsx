import styled from "styled-components"

const Container = styled.div`
width: 100vw;
height: 100vh;
background:linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://i.ibb.co/L6LDshc/shoppin-cart.jpg") center;
background-repeat:no-repeat;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: teal;
`;

const Title = styled.h1`
color: white;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap; 
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`;

const Agreement = styled.span`
font-size: 15px;
margin: 20px 0px;
`;

const Button = styled.button`
width: 40%;
padding: 20px;
padding: 15px;
border-radius: 50px;
border: 2px solid black;
background-color: white;
cursor: pointer;
font-weight: 700;
color: teal;

`;

const SignUp = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE ACCOUNT</Title>   
              <Form>
                  <Input placeholder="name" />
                  <Input placeholder="last name" />
                  <Input placeholder="username" />
                  <Input placeholder="email" />
                  <Input placeholder="password" />
                  <Input placeholder="confirm password" />
                  <Agreement>By Creating an account, i consent to the processing of my data in accordance with the <b>Privacy Policy</b></Agreement>
                  <Button>CREATE</Button>
              </Form> 
        </Wrapper>
    </Container>
  )
}

export default SignUp