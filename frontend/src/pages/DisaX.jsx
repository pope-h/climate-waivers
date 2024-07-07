import React, { useEffect, useRef, useState } from "react";
import Leftsidebar from "../components/Leftsidebar";
import Topbar from "../components/Topbar";
import { BsRobot } from "react-icons/bs";
import Chatcomponent from "../components/Chatcomponent";
import ChatCard from "../components/Chat-card";

import "./styles/disax.css"
import { getUser } from "../utils/factory";
import axios from "axios";
import { watchCollection } from "../services/firebase.service";

const chatbot = `${import.meta.env.VITE_APP_CHATBOT_URL}/api/v1` || "http://localhost:3004/api/v1"

const DisaXBot = () => {
  const [chats, setChats] = useState([])
  const [current, setCurrent] = useState("")
  const [messages, setMessages] = useState()


  useEffect(()=>{
    fetchChats()
    .then((res)=>{
      res.data && setChats(res.data)
    })
    if(current){
      //firebase path to chat collection
      const path = `ChatMessages/${current}/messages`
      watchCollection(path, (snapshot)=>{
        const data = snapshot.docs.map((d)=>({...d.data(), remoteId: d.id}))
        const sorted = data.sort((a,b)=>a.postedAt-b.postedAt)
        setMessages(sorted)
      })
    }
  }, [current])

  const messageBodyRef = useRef()

  async function fetchChats(){
    const url = `${chatbot}/chats?userId=${getUser()?.id}`
    return axios.get(url)
  }

  function handleChatCardClicked(id){
    setCurrent(id)
  }

  async function handleCreateChat(){
    const userId = getUser()?.id
    console.log({userId})
    const res = await axios.post(`${chatbot}/chats`, {userId})
    if(res.data){
        setChats([res.data, ...chats])
    }
  }

  async function handlePostMessage(body){
    if(!body)return
    try{
    const url = `${chatbot}/chats/${current}`
    const res = await axios.post(url, {body, userId: getUser()?.id})
    }catch(err){
      console.log({err})
    }
    
  }

  return (
    <div className="bg-bgGradient text-white ">
      <div className=" block md:hidden ">
        <Topbar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-3 md:px-20 h-[100vh] ">
        <Leftsidebar />
        <div className="text-xl text-center md:pt-5 items-center ">
          <div className="md:pb-3 px-[40%] md:pt-5 text-lg md:text-xl border-gray-500 lg:border-b-2 font-semibold flex flex-row items-center">
            <BsRobot className="mr-2" size="22" />
            <h>WaverX</h>
          </div>
          {current && <Chatcomponent handlePostMessage={handlePostMessage} messages={messages} />}
        </div>
        <div className=" border-l-[1px] border-gray-700 hidden md:block pt-5 ">
          {/* Search btn */}
          <div className=" border-gray-500 md:pl-6 ">
            <input
              className="bg-graylight p-1 ml-2 md:p-2 rounded-full text-black w-[80%]"
              type="text"
              placeholder="🔍Search"
            />
          </div>
          <div className=" bg-graydark min-h-[200px] m-4 rounded-xl border-gray-500 border-[1px] h-[70vh]">
            <button onClick={handleCreateChat} className="bg-transparent outline outline-2 outline-[#008080] rounded-xl p-2  w-[100%] ">
              {" "}
              + New Chat
            </button>
            <ul className="mt-1">
              {
                chats.map((c)=>{
                  return <ChatCard key={c.id} handleClick={handleChatCardClicked} id={c.id} createdAt={c.createdAt} current={current} />
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisaXBot;
