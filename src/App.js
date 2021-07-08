

import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {useState} from'react'
import Login from "./Login"
import { useStateValue } from './StateProvider';

function App() {
  const [{user},dispatch]=useStateValue();
  
  return (
  
    
  <div className="app">
      {!user? (
      <Login/>
      ):(
         <div className="app_body">
    
         <BrowserRouter>
         <Sidebar/>
   
   
         <Switch>
             <Route path="/rooms/:roomId">
                     <Chat/>
             </Route>
             <Route path="/">
                     <Chat/>
             </Route>
         </Switch>
   
   
         </BrowserRouter>
        
       </div>
      )}
    
   
    </div>
  );
}

export default App;
