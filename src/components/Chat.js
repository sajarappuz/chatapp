import { useState,useEffect } from "react"
import { db,auth } from "../config/Firebase";
import {addDoc, collection , doc, onSnapshot, query, serverTimestamp, where} from "firebase/firestore";
import { async } from "@firebase/util";
export const Chat = (props) =>{
  const {room} = props;
  const [newMessage,setNewMessage] = useState("");
  const [messages,setMessages] = useState([]);

  const messageRef = collection(db,"messages");

  useEffect(() => {
    const qureyMessages = query(messageRef, where("room","==",room));
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
        <div>{messages.map((message) =><h1>
            {message.text}
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