import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
//import Message from './Sections/Message';
import { List, Icon, Avatar } from 'antd';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Card from "../Components/Chatbot/Sections/Card";
import { SmileOutlined } from '@ant-design/icons';
import Message from '../components/Chatbot/Sections/Message';
import MicIcon from '@material-ui/icons/Mic';

let baseURL = 'http://localhost:5001/api/dialogflow';


function Chatbot() {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)

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


    return (
        <div style={{
           
            border: '3px solid pink', borderRadius: '7px',
            padding:'30px',
            background: '#e5ded8',
           // height:'190vh'
        }}>
            <div style={{ height: 844, width: '100%', overflow: 'auto' }}>


                {renderMessage(messagesFromRedux)}


            </div>
              <div
                style={{
                    // margin: 0,
                     width: '100%',
                     borderRadius: '4px',
                     fontSize: '1rem',
 
 
                     display: 'flex',
                     alignitems: 'center',
                     padding: '10px',
                     position:'sticky',
                     bottom:0,
                     background : 'white',
                     index:100,
 
                     flex: 1,
                     outline:'0',
                     border: 'none',
                     radius:'10px',
                     background:'whitesmoke',
                    // padding:20px;
                     marginLeft:'15px',
                    // marginRight:'15px'
 
 
                 }}
                 placeholder="Send a message..."
                 onKeyPress={keyPressHanlder}
                 type="text"
              
              >

              <InsertEmoticonIcon/>
              <input  
              
              style ={{

                flex: 1,
                outline:0,
                border: 'none',
                radius:'10px',
                color:'black',
                padding:'20px',
                left:'15px',
                right:'15px' 


              }} />     
            <MicIcon/>

              </div> 
        </div>
    )
}

export default Chatbot;