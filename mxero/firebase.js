
import firebase from 'firebase';


//console.log('hi',process.env.apiKey)
//"AIzaSyAIYhn8PrpUI0jhv8bsJIRjTqK96oehuD8",

// the values keys are stored locally in next.config.js file 

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId:process.env.messagingSenderId,
    appId: "1:245317868997:web:f685de92ba15171ba27fac"
  }; 


const app = !firebase.apps.length ? 
firebase.initializeApp(firebaseConfig) :
firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db,auth,provider};
