import '../styles/globals.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from "../firebase";
import Login from './Login';
import Loading from '../components/Loading';
import {useEffect, useReducer} from "react";
import firebase from 'firebase';
//import { ContextProvider } from './Context';
import { CanvasProvider } from "./CanvasContext";
import Reducer from '../_reducers';
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, HashRouter } from "react-router-dom";


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)



  useEffect (()=>{

   if(user) {
     db.collection('users').doc(user.uid).set({
     email: user.email,
     lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
     photoUrl: user.photoURL,

     },
     {merge: true}
     
     ); }

  },[user])


  if(loading) return <Loading />
  if(!user) return <Login/>
  return (

     <Provider
          store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
          )}>

        <CanvasProvider>
          <HashRouter>
          <BrowserRouter>
                     <Component {...pageProps} />
                </BrowserRouter>
          </HashRouter>
         
        </CanvasProvider>
  
    </Provider>
  )}

export default MyApp
