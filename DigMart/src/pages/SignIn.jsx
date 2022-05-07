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
width: 30%;
padding: 20px;
background-color: teal;
`;

const Title = styled.h1`
color: white;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 10px 0px ;
padding: 10px;
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
margin-bottom: 10px;
`;

const Link = styled.a`
margin: 5px 0px ;
font-size: 14px;
text-decoration: underline;
cursor:pointer;
`;

const SignIn = () => {
  return (
   <Container>
        <Wrapper>
            <Title>SIGN IN</Title>   
              <Form>
                  <Input placeholder="username" />
                  <Input placeholder="password" />
                  <Button>LOGIN</Button>
                  <Link>FORGOT PASSWORD?</Link>
                  <Link>CREATE NEW ACCOUNT</Link>
              </Form> 
        </Wrapper>
    </Container>
  )
}

export default SignIn