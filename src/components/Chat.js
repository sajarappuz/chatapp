import { useState,useEffect } from "react"
import { db,auth } from "../config/Firebase";
import {addDoc, collection , doc, onSnapshot, orderBy, query, serverTimestamp, where} from "firebase/firestore";
import { async } from "@firebase/util";
import "../styles/Chat.css"
export const Chat = (props) =>{
  const {room} = props;
  const [newMessage,setNewMessage] = useState("");
  const [messages,setMessages] = useState([]);

  const messageRef = collection(db,"messages");

  useEffect(() => {
    const qureyMessages = query(messageRef,
       where("room","==",room),
       orderBy("createdAt")
       );
    const unsuscribe = onSnapshot(qureyMessages,(snapshot)=>{
        let messages = [];
         snapshot.forEach((doc) =>{
          messages.push({...doc.data(), id:doc.id});
         });
      setMessages(messages);
    });
     return ()=> unsuscribe();

  },[]);
  const handleSubmit = async (e) =>{
    e.preventDefault();
      if (newMessage === '') return;
      
      await addDoc(messageRef,{
        text:newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room, 
      });
      setNewMessage("");
    
    
  }; 

    return <div className="chat">
      <div className="header">
        <h1>welcome to :{room.toUpperCase()}</h1>
      </div>
        <div className="messages">
          {messages.map((message) =><h1>
           <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
             {message.text}
             
             </div>
        </h1>
        )}</div>
        <form onSubmit={handleSubmit} className="newmessage">
            <input className="newmsginput" placeholder="type your message" 
            onChange={(e) => {setNewMessage(e.target.value);}}
            value={newMessage} />
            <button  type="submit" className="sendmsg">send</button>
        </form>
    </div>
    ;
};