import { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import MessageCard from "./message-card";

const Chatcomponent = ({messages, handlePostMessage}) => {
  const bodyRef = useRef()

  

  return (
    <div className="max-h-fit h-[90%] flex flex-col justify-between">
      <div className="overflow-auto message-card-list" >
        {
          !messages?.length?
          <p className="null">no messages yet</p>:
          messages.map(m=>{
          return <MessageCard postedBy={m.postedBy} key={m.remoteId} body={m.body} postedAt={m.postedAt} />})
        }
      </div>
      <div className="bg-graylight p-1 mx-5 md:p-2 border-2 border-gray-500  rounded-full flex flex-row items-center ">
        <input
          className="justify-self-end w-[80%] focus:outline-0 focus:bg-gray-200 rounded-full p-2 text-black "
          type="text"
          placeholder="Ask waverX a question about disaster"
          ref={bodyRef}
        />{" "}
        <AiOutlineSend
          size={25}
          onClick={()=>{
            handlePostMessage(bodyRef.current?.value)
            bodyRef.current.value = ""
          }}
          className="items-end p-.5 ml-3 cursor-pointer "
          type="submit"
        />
      </div>
    </div>
  );
};

export default Chatcomponent;
