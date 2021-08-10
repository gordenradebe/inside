import React from 'react';
import styled from "styled-components";
import Head from 'next/head';

import ChatScreen from '../components/ChatScreen';
import SideRob from '../components/SideRob';
import { Gradient } from '@material-ui/icons';



const ai = () => {
  return (
    <Container>
    <Head>
        <title>Chat with robot</title>
    </Head>

   <SideRob />

    <ChatContainer>

        </ChatContainer>
 </Container>
  )
}

export default ai;



const Container = styled.div`
display :flex;

`;

const ChatContainer = styled.div`

flex:1;
overflow:scroll;
height:100vh;

 ::-webkit-scrollbar{
     display: none;
 }
 -ms-overflow-style: none;
 scrollbar-width:none;
`;




