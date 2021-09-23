import styled from 'styled-components';
import React, {useRef,useEffect, useCallback} from 'react';
//import {useSpring, animated} from 'react-spring';
import {MdClose} from 'react-icons/md';
import Fab from '@material-ui/core/Fab';
import Calendar from './Calendar'

const Modal = ({showModal, setShowModal}) => {
    
    return (
        <>
             {showModal ? (
              <Background>
                <ModalWrapper showModal = {showModal}>
                    {/*<ModalImg src='' alt='camera'/>*/}
                    <Calendar/>
                    <ModalContent>
                        <h6> Ready to Schedule tutorial</h6>    
                 <FormBox >

        <form>
            
            <Input>
            <input placeholder="Name"/> 
            </Input>       

             <Input>
            <input placeholder="Phone 000-000-0000"/>
            </Input>
            <Input>
            <input placeholder="E-mail"/>
            </Input>

            <Textarea>
            <textarea placeholder="invite description"/>

            </Textarea>
            </form>
            </FormBox>
                 
                        <Fab variant ='extended' color ='secondary'  marginLeft='10px' >
                            <small>Send invite</small> 
                          </Fab>
                    </ModalContent>
                    <CloseModalButton aria-labels='Close modal' onClick={()=> setShowModal(prev => !prev)}/>
                </ModalWrapper>
             </Background>
                ) : null}
            
          </>
    );
};

export default Modal;

const Background = styled.div`
 width: 100%;
 height: 100%;
 background: rgba(0,0,0,0.8);
 
 display: flex;
 justify-content: center;
 align-items: center;


 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 
`


const FormBox  = styled.div`

display: block;
width: 100%;
padding: .5rem .8rem .5rem .8rem;
margin: .9vw 0 ;
border:0;
border-radius: 5px;
font-size: 20px;

`

const Textarea = styled.div`
height: 25vh;
display: block;
width: 15vw;
padding: .5rem .8rem .5rem .8rem;
margin: .9vw 0 ;
border:0;
border-radius: 5px;
font-size: 20px;

`


const Input= styled.div`

display: flex;
margin: 2px;
align-items: center;
background-color: #d1c3c2;
width: 100%;
height: 35px;
border-radius: 20px;

input{
  border:none;
  margin-left: 10px;

`

 

const ModalContent = styled.div``


const ModalWrapper = styled.div`
width: 900px;
height: 400px;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background: #fff;
color:#000;
display: grid;
grid-template-columns: 1fr 1fr;
position: relative;
z-index:10;
boarder-radius: 10px;
`
const ModalImg = styled.img`
 width: 100%;
 height: 100%;
 border-radius: 10px 0 0 10px;
 background: #000;

 p {

   margin-botton: 1rem;

 }

 button{
     padding: 10px 24px;
     background : #141414;
     color: #fff
     border : none;
 }
`

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;

`

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

