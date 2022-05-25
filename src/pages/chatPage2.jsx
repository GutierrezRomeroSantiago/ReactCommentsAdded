import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import styles from "./LoginPage.module.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, child, get, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Import from MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

const firebaseConfig = {
    apiKey: "AIzaSyC520WwbYJJwLOCoSkBXEuWytzASwZ2qOU",
    authDomain: "fir-2-935b2.firebaseapp.com",
    databaseURL: "https://fir-2-935b2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-2-935b2",
    storageBucket: "fir-2-935b2.appspot.com",
    messagingSenderId: "933312935174",
    appId: "1:933312935174:web:5aa100233f3423881ada87",
    measurementId: "G-JTTS1M0D7Q"
  };
const app = initializeApp(firebaseConfig);

const db = getDatabase();
// Initialize Firebase

const analytics = getAnalytics(app);
const dbRef = ref(getDatabase());

export function ChatPage(){

    const [messages, setmessages] = useState([
        // {id: 0, text: "Hola"},
        // {id: 1, text: "Hola"},
        // {id: 2, text: "Hola"},
    ]);
    const [message, setmessage] = useState("");

    const a = function updateMessage(e){
        setmessage(e.target.value)
        console.log(message);
    }

    useEffect(() => {
        get(child(dbRef, `messages/`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              setmessages(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    },[])

    const b = function handleSubmit(e){
        const cookies = new Cookies();
        e.preventDefault();
        console.log("hola")
        const newMessage = {id: messages.length, text: message, user: cookies.get('usuario')}
        set(ref(db, 'messages/' + newMessage.id), newMessage)
        setmessages([...messages, newMessage])
        setmessage("")
    }

    return(
        <div>
             <Box
             component="div"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
      }}
    >
        {
            messages.map(messagex => {
                return (
                // <li key={messagex.id}>{messagex.text}</li>
                <div>
                <Chip 
                sx={{padding: "5px", margin: "5px"}}
                label={messagex.text} 
                icon={ <Avatar 
                sx={{ bgcolor: deepOrange[500], width: 27, height: 27 }} 
                alt={messagex.user} 
                src='../default-placeholder.png' />} />
                <br/>
                </div>
                )
            })
        }
        </Box>
        <form onSubmit={b}>
            {/* <input onChange={a} type="text" placeholder="Escribe un mensaje" value={message}/> */}
            <TextField sx={{width: "99%", position:"fixed"  }} variant="standard" onChange={a} type="text" placeholder="Escribe un mensaje" value={message} />
            <button className={styles.butto}>
                <SendOutlinedIcon />
            </button>
        </form>
    
    </div>
    )


}