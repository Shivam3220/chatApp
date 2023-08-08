import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Home = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  // useEffect(() => {
  //   console.log(allMessages)
  // }, [allMessages]);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io(undefined,{
      path:"/api/socket"
    });

    socket.on("receive-message", (data) => {
      setAllMessages(pre=>[...pre, data])
      const msg= [...allMessages,data]
      console.log(msg)
    });
  }

  function HandleSend() {
    socket.emit("send-message", {
      username,
      message
    });
    setMessage("");
  }

  return (
    <div className='bg-gray-50 h-screen relative'>
    {/* title bar */}
    <div className='p-4'>
      <div>
        <label>Enter Your User Name</label>
        <input className='mx-4 rounded-xl w-1/2 p-2' placeholder='USER NAME' value={username} onChange={(e)=>setUsername(e.target.value)}/>
      </div>
    </div>

    {/* message box */}
    <div className='h-full overflow-y-scroll'>  
        {allMessages.map((e,index)=>{
         return  <div className={`"my-4 bg-gray-100" ${e.username==username?"text-right":""}`} key={index}>
          <h1>{e.username}:</h1>
          <p>{e.message}</p>
          </div>
        })}
    </div>


    {/* footer  */}
    <div className='absolute w-full bottom-0 bg-gray-200'>
      <div className='p-4'>
      <input className='p-2 rounded-xl w-1/2' placeholder='ENTER TEXT HERE...' value={message} onChange={(e)=>setMessage(e.target.value)}/>
      <button onClick={HandleSend} className='mx-4 p-2 bg-green-500 rounded-full font-bold text-white'>Send</button>
      </div>
    </div>
</div>
  );
};

export default Home;