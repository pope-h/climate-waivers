import { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
// import { useParams } from "react-router-dom";
import MessageCard from "./message-card";

const Chatcomponent = ({messages, handlePostMessage}) => {
  const bodyRef = useRef()

  

  return (
    <div className="max-h-fit h-[90%] flex flex-col justify-between">
      <div className="overflow-auto message-card-list" >
        {
          !messages?.length?
          <p className="null">Ask me anything about disasters</p>:
          messages.map(m=>{
          return <MessageCard postedBy={m.postedBy} key={m.remoteId} body={m.body} postedAt={m.postedAt} />})
        }
      </div>
      <div className="bg-gray-100 p-1 mx-5 md:p-2 border-2 border-gray-100  rounded-2xl flex flex-row items-center ">
        <input
          className="justify-self-end w-[80%] focus:outline-0 focus:bg-white rounded-2xl p-2 text-black "
          type="text"
          placeholder="Ask waverX a question about disaster"
          ref={bodyRef}
        />{" "}
        <IoSend
          size={25}
          onClick={()=>{
            handlePostMessage(bodyRef.current?.value)
            bodyRef.current.value = ""
          }}
          className="items-end p-.5 ml-3 cursor-pointer mr-0 "
          color="#008080"
          type="submit"
        />
      </div>
    </div>
  );
};

export default Chatcomponent;
