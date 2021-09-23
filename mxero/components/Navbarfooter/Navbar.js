import React from 'react'
import VideocamIcon from '@material-ui/icons/Videocam';
import ChatIcon from '@material-ui/icons/Chat';
import MicIcon from '@material-ui/icons/Mic';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import BrushIcon from '@material-ui/icons/Brush';
import {Avatar, Button, IconButton} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { GlobalStyle } from '../globalStyle';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './Navbarfooter';

const Navbar = () => {
  return (
    <>

 
       <Nav>
        
          <NavMenu> 
          
          <div>
          <MicIcon />
          <p>Mic</p>
          </div>
          

    <div style={{margin: '100px', display: 'space-between'}}>
  <ScreenShareIcon /> 
  <p>ShareScreen</p>
   </div>
  
   <div> 
< VideocamIcon />
<p>Join Class</p>
 </div>
     

       </NavMenu>

       </Nav>
   
    </>
  )
}

export default Navbar




