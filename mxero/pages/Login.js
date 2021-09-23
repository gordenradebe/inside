import styled from "styled-components";
import Head from 'next/head';
import { Button} from '@material-ui/core';
import { auth , provider } from "../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }
  return (
    <Container>
       <Head>
           <title>Login</title>
            
       </Head>

      <LoginContainer>
          <Logo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OJW0KUrh-3T2TBQt94N960-yusz__8TjkA&usqp=CAU"/>
           <Button onClick ={signIn} variant="outlined">Sign with gmail</Button>

      
      </LoginContainer>
    </Container>
  )
}
export default Login

const Container = styled.div`
display:grid;
place-items:center;
height:100vh;
`;

const LoginContainer = styled.div`
padding:100px;
display: flex;
flex-direction: column;
box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`;
const Logo = styled.img`

height:200px;
width:200px;
margin-bottom:50px;

`;

