import './Chat.css'
import {Avatar} from '@material-ui/core'
import { IconButton } from '@material-ui/core';
import React ,{useEffect,useState} from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import DB from './firebase';
import { useStateValue } from './StateProvider'
import firebase from "firebase"

function Chat() {
    const [input, setInput] = useState("")
    const [seed, setseed] = useState('')
    const {roomId}=useParams();
    const [roomName, setRoomName] = useState("")
    const[{user},dispatch]=useStateValue()
    
    const [messages, setMessages] = useState([])
    console.log("chat redender")
    useEffect(() => {
        if(roomId){
            DB.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name)
            DB.collection('rooms').doc(roomId)    
            .collection('Messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot=>(setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
            })
        }
        console.log("rerender when room name changes")
    
    }, [roomId])
    useEffect(() => {
      setseed(Math.floor(Math.random()*5000))
      console.log('inside useEffect')
       
    }, [])
 
    
   const sendMessage=(e)=>{
       e.preventDefault();
       console.log(input)
       DB.collection('rooms').doc(roomId).collection('Messages')
       .add({
           message:input,
           Name:user.displayName,
           timestamp:firebase.firestore.FieldValue.serverTimestamp(),
       })
       setInput("")

   }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {new Date(
                        messages[messages.length-1]?.timestamp
                        ?.toDate()).toUTCString()
                    }</p>
                </div>
                <div className="chat_headerRight">
                <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                    <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>

            </div>
            <div className="chat_body">
                {messages.map(message=>(
                       <p className={`chat_message ${message.Name===user.displayName && "chat_reciever"}`}>
                       <span className="chat_name">{message.Name}</span>
   
                       {message.message}
                       <span className="chat_timeStamp">
                           {new Date(message.timestamp?.toDate()).toUTCString()}
                       </span>
                   </p>
                ))}
             
            </div>
            <div className="chat_footer">
            <InsertEmoticonIcon/>
            <form /* onSubmit={sendMessage} */>
                <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Type a message"/>
                <button onClick={sendMessage} type="submit">Send</button>
            </form>
            < MicIcon/>

            </div>
        </div>
    )
}

export default Chat