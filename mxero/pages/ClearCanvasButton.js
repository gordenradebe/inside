import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useCanvas } from './CanvasContext';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas()

  return (
    <div>
  <div>
  <Fab variant ='extended' color ='secondary' onClick={clearCanvas} marginLeft='10px' >
     <NavigationIcon/> <small>clear slate</small> 
  </Fab>
</div>
  
</div>
)
}