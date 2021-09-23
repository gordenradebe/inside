import styled from 'styled-components';
import {Avatar, Button, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import {SearchOutlined} from "@material-ui/icons";
import * as EmailValidator from "email-validator";
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from "react-firebase-hooks/firestore"
import { auth , db } from '../firebase';
import Chat from './Chat';

function Sidebar() {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users' , 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef); 


 const createChat = ()=>{
     const input = prompt('Please enter an email address for the user you wish to chat with');

    if(!input) return null;
    if(EmailValidator.validate(input) && 
    !chatAlreadyExists(input) &&
     input !== user.email)
      {
        // add chat to db
        db.collection('chats').add({
        users:[user.email , input],
    });
    }

 };

 const chatAlreadyExists = (recipientEmail) =>
     !!chatsSnapshot?.docs.find( (chat) => 
     chat.data().users.find( (user)=> user === recipientEmail)?.length > 0
     );
 
  return (
    <Container>
            <Header>
             <Avatar src= {user.photoURL} onClick={() => {
                  auth.signOut()
                      }}/>

            <HeaderInformation>
                <h3>eTutor<span>&Pass</span></h3>
            </HeaderInformation>
                      <IconsContainer>

                             <IconButton>
                             <ChatIcon/>
                             </IconButton>
                        
                             <IconButton>
                             <VideoLibraryIcon/>
                             </IconButton>
                      </IconsContainer>
            </Header>

            <SidebarSearch>
                <SidebarSearchContainer>
                    <SearchOutlined />
                    <input type="text" placeholder="Search contact"/>
                </SidebarSearchContainer>
            </SidebarSearch>
     <SidebarButton onClick={createChat}>
        <p> Chat </p> 
     </SidebarButton>

   {chatsSnapshot?.docs.map((chat) =>(

     <Chat key={chat.id} id = {chat.id} users={chat.data().users} />

   ))}

    </Container>
  )
}

export default Sidebar



const SidebarSearch = styled.div`

display: flex;
align-items: center;
background-color: #f6f6f6;
height: 39px;
padding: 10px;

`

const SidebarSearchContainer = styled.div`

display: flex;
align-items: center;
background-color: white;
width: 100%;
height: 35px;
border-radius: 20px;

input{
  border:none;
  margin-left: 10px;
}

`

const Container = styled.div` 

flex:0.45;
boarder-right: 1px solid whitesmoke;
height:100vh;
min-width:295px;
max-width:350px;
overflow-y:scroll;

::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width:none;

`;

const HeaderInformation = styled.div`

h3 {
   text-decoration: none;
   color: red;
   font-size: 1.4em;
   font-weight: bold;
}

span {
   color: #007AF3;
}
`;

const Header = styled.div`

display: flex;
position: sticky;
top : 0;
background-color: #0C6157;
z-index: 1;
justify-content: space-between;
align-items: center;
padding:15px;
height:80px;
`;

const Search = styled.div`
flex: 1;
display: flex;
align-items: center;
border-radius: 24px;

`;

const Searchinput = styled.div`
height: 4 px;
margin: 2px;
border: none;
width: 100%;
`;

const Searchicon = styled.div`
padding: 4px;
height: 24px !important;
background-color:  #0C6157;
place-items: center;

`;


const SidebarButton = styled(Button)`
width: 100%;

&&&{
boarder-top: 2px solid whitesmoke;
boarder-bottom: 2px solid whitesmoke;
background-color: #0C6157;
}

p {
  text-decoration: none;
  color: red;
  font-size: 1.4em;
  font-weight: bold;
}

`;


const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex:1;
  background-color:whitesmoke;
`;


const IconsContainer = styled.div`


`;