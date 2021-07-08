import React from 'react'
import './Sidebar.css'
import {Avatar} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import{useEffect,useState} from 'react'
import db from "./firebase"
import { useStateValue } from './StateProvider'


function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [{user},dispatch]=useStateValue();
    useEffect(() => {
    
     const unsub =db.collection('rooms').onSnapshot(snapshot=>{
          setRooms(snapshot.docs.map((doc)=>(
              {
                  id:doc.id,
                  data:doc.data(),
             
          })
      ))
        })
        return ()=>{
            unsub();
        }
    }, [])
    return (
        <div className="sidebar">
            
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                    <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                <SearchOutlinedIcon/>
                <input type="text" placeholder="Search or start new char"/>
                </div>
            </div>

            <div className="sidebar_chats">
            <SidebarChat addNewChat/>
               {rooms.map(room=>(
                   <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
               ))}
               
            </div>
        </div>
    )
}

export default Sidebar
