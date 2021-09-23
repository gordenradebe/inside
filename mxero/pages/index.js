import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";

// import for components sidebar and pop modal component
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';

// the aha moment 
import { List, Icon } from 'antd';
import  { useEffect } from 'react';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import VideoPlayer from '../components/VideoPlayer'; old peer using context 

import styled from 'styled-components';

// import for webrtc elements video conferencing

import CreateRoom from './routes/CreateRoom';
import Room from './routes/Room';

// material Ui components and Icons
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import VideocamIcon from '@material-ui/icons/Videocam';
import ChatIcon from '@material-ui/icons/Chat';
import MicIcon from '@material-ui/icons/Mic';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import BrushIcon from '@material-ui/icons/Brush';
import {Avatar, Button, IconButton} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { saveMessage } from '../_actions/message_actions';

// react router used to create room routes

import { BrowserRouter,HashRouter, Route, Switch } from "react-router-dom";
import Message from '../components/Chatbot/Sections/Message';

// import style for global Modal styled components

import {GlobalStyle} from '../components/globalStyle';

import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbarfooter/Navbar';
//import { saveMessage } from '../_actions/message_actions';



const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',
    top: '100',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
 
  wrap :{
    display: 'flex',
    flex:'1',
    
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
}));


let baseURL = 'http://localhost:5001/api/dialogflow';

export default function Home() {

  const messagesFromRedux = useSelector(state => state.message.messages)


  const router = useRouter();
  const [showModal, setShowModal] = useState(false);


  const dispatch = useDispatch();
  

    useEffect(() => {

        eventQuery('Welcome')

    }, [])


    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))
        // console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post(`${baseURL}/textQuery`, textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))

        }
    }

    const eventQuery = async (event) => {

        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post(`${baseURL}/eventQuery`, eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }


    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('you need to type somthing first')
            }

            //we will send request to text query route 
            textQuery(e.target.value)


            e.target.value = "";
        }
    }

    const renderCards = (cards) => {
        return cards.map((card,i) => <Card key={i} cardInfo={card.structValue} />)
       
    }


    const renderOneMessage = (message, i) => {
        console.log('message', message)

        // we need to give some condition here to separate message kinds 

        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />

        } else if (message.content && message.content.payload.fields.card) {

            const AvatarSrc = message.who === 'bot' ? <SmileOutlined type="robot" /> : <SmileOutlined type="smile" />
            return <div>
        
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}/>
                 
                </List.Item>
                </div>
        }

        // template for card message 

    }

           
    const renderMessage = (returnedMessages) => {

      if (returnedMessages) {
          return returnedMessages.map((message, i) => {
              return renderOneMessage(message, i);
          })
      } else {
          return null;
      }
  }



 // const [cards, setCards] = useState(cards)

 const classes = useStyles();

  // function control modal
  
   const openModal = () => {
      setShowModal(prev => !prev)
   }
  // Route to dialogflow AI element
  
  const Testing = () => {
  router.push('/Testchat')

 }

 // Route to Maaths pix
 const Maths = () => {
  router.push('/MathsChat')

 }

 // Maths Graph Api

 const Sketch = () => {
  router.push('/Paint')

 }

 
  return (
    <div className={styles.container}>
      <Head>
        <title>etutor&pass</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
     
     <Sidebar/> 

     <BrowserRouter>
     <HashRouter>
          <Switch> 
              <Route exact path="/" component={CreateRoom}/>
              <Route path="/room/:roomID" component ={Room}/> 
          </Switch>
          </ HashRouter >
    </BrowserRouter> 

     <div> {renderMessage} </div>
            
      <div className={classes.wrapper}>


    
    </div>

  
      </main>


      <footer className={styles.footer}>
       <div> 
           <Navbar/>
     </div>

   <div>
     <IconButton>
           <CalendarTodayIcon onClick ={openModal}/>
           <Modal showModal ={showModal} setShowModal = {setShowModal} />
           <GlobalStyle/>
      </IconButton> 
          <p>Schedule Meeting</p>
          </div>


          <div> 
        <IconButton>
       < BrushIcon onClick ={Sketch}/>
         </IconButton>
         <p>Sketch</p>
        </div>

        <div  className ={styles.robot}>
              <Fab variant ='extended' color ='secondary' onClick={Testing} marginLeft='10px' >
                 <NavigationIcon/> <small>e-tutor</small> 
              </Fab>
        </div>

        <div  className ={styles.robot}>
              <Fab variant ='extended' color ='secondary' onClick={Maths} marginLeft='10px' >
                 <NavigationIcon/> <small>e-Maths</small> 
              </Fab>   
        </div>
        
      </footer>
    </div>
  )
}


// using styled components now for modal

const PopupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const ButtonP = styled.button`
min-width:100px;
padding: 16px 32px;
boarder-radius: 4px;
border: none;
background: #141414;
color: #fff;
font-size: 24px;
cursor: pointer;
`
