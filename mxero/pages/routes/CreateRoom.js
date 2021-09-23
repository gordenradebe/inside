
//import React from "react";
import { v1 as uuid } from "uuid";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import styled from "styled-components";

const CreateRoom = (props) => {
    
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
        console.log('show in console after button press',id)
    }
    return (
        <div > 

            <Container>
               <Fab variant ='extended' color ='secondary' onClick={create} margin='90px 60px 60px 60px' align-item ='space-between' >
                 <NavigationIcon/> <small>Launch Video Chat</small> 
              </Fab>
              </Container>
          </div>
    );
};

export default CreateRoom;

const Container = styled.div`
  position: absolute; 
  margin: 60px 70px;
  padding: 20px;

`

/*

<div>
               <Fab variant ='extended' color ='secondary' onClick={create} margin='60px 60px 60px 60px' align-item ='space-between' >
                 <NavigationIcon/> <small>Launch Video Chat</small> 
              </Fab>
            
          </div> */