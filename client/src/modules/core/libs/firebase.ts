import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"; 

const firebaseConfig = {

    apiKey: "AIzaSyCm51XRdM-9p81q6HvLfRUY8mlLMhe0H3A",
  
    authDomain: "new-realestate-f4127.firebaseapp.com",
  
    projectId: "new-realestate-f4127",
  
    storageBucket: "new-realestate-f4127.appspot.com",
  
    messagingSenderId: "658717400987",
  
    appId: "1:658717400987:web:2974bd07213538e15c0b3e"
  
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function nameDB(){
    console.log(db.app.name);
    
}