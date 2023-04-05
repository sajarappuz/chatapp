
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { useState, useRef } from 'react';
import { Chat } from './components/Chat';
import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import { auth } from "./config/Firebase"
const cookies = new Cookies();

function App() {
  
  const[isAuth,setIsAuth] = useState(cookies.get("auth-token"));
  const[room,setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async() =>{
    await signOut(auth)
    cookies.remove("auth-token")  
    setIsAuth(false)
    setRoom(null)
  }

   if (!isAuth){
  return (
    <div className="App">
      <Auth setIsAuth={setIsAuth}/>
    </div>
  );}
   return <> {room? <div> <Chat room={room}/></div> : 
   <div className='room'>
    <label>enter room name:</label>
    <input ref={roomInputRef} />
     <button onClick={() => setRoom(roomInputRef.current.value)}>enter room</button>
   </div> }
        <div className='signout'>
          <button onClick={signUserOut}>Sign Out</button>
          </div>   
   </> 

};

export default App;
