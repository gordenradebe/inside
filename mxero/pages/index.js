import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";
import Sidebar from '../components/Sidebar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from '../components/VideoPlayer';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import VideocamIcon from '@material-ui/icons/Videocam';
import ChatIcon from '@material-ui/icons/Chat';
import MicIcon from '@material-ui/icons/Mic';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';


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


export default function Home() {
  const router = useRouter();
  const Testing = () => {
  router.push('/Testchat')

 }

 const Maths = () => {
  router.push('/MathsChat')

 }

  const classes = useStyles();

  return (
    <div className={styles.container}>
      <Head>
        <title>etutor&pass</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
     
      <Sidebar/>
     
      <div className={classes.wrapper}>
      <VideoPlayer />
  
    </div>

      </main>

      <footer className={styles.footer}>
       <div>    
          <ChatIcon />
          <p>chat</p>
          </div>

          <div> 
          <MicIcon />
          <p>Mic</p>
          </div>
  <div>
  <ScreenShareIcon /> 
  <p>ShareScreen</p>
     </div>

        <div> 
       < VideocamIcon />
       <p>Join Class</p>
         
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

