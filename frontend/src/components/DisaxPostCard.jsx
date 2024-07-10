import Accountcard from "./Accountcard";
import { AiFillHeart } from "react-icons/ai";
import { IoChatboxEllipses } from "react-icons/io5";
import { PiBookmarkFill } from "react-icons/pi";
import { TbLineDashed } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaDonate } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";



export const DisaxPostCard = ({post}) =>{

    const postUser = {
        image: "",
        username: post.username,
        first_name: "WaverX",
        userId: post.userId
    }
    console.log(post)

    return <div className="disaster-post-card border-b-[1px] border-gray-700 py-4">
    <Accountcard user={postUser} />
    <div onClick={() => commentPage(post)}>
      <p className="text-left text-sm px-3 my-3 ">{post.body}</p>
      {
      post.image && <img
        className="w-[100%] px-3 "
        src={post.image}
        alt=""
      />
      }
    </div>
    <div className="flex flex-row justify-between px-3 mt-2 ">
      <div
        className="flex flex-row items-center"
        onClick={() => {
          post.is_liked
            ? unlikeMutation.mutate(post.id)
            : likeMutation.mutate(post.id);
        }}
      >
        <AiFillHeart size={18} color={post.is_liked ? "#e01616" : ""} />
        <p className="text-xs ml-1 ">{post.likers_count}</p>
      </div>
      <div className="flex flex-row items-center">
        <FaDonate size={18} />
        <p className="text-xs ml-1 ">{post.comments_count}</p>
      </div>
       <Link onClick={() => setIsModalopen(true)}>
        <div
          className="flex flex-row items-center  "
          // onClick={() => setIsModalopen(true)}
        >
          <IoChatboxEllipses size={18} />
          <p className="text-xs ml-1 ">{post.comments_count}</p>
        </div>
      </Link>
      <div
        className="flex flex-row items-center"
        // onClick={() => {
        //   post.is_saved
        //     ? unsaveMutation.mutate(post.id)
        //     : saveMutation.mutate(post.id);
        // }}
      >
        <PiBookmarkFill
          size={18}
          color={post.is_saved ? "rgb(0 128 128 / 1)" : ""}
        />
        <p className="text-xs ml-1 ">{post.savers_count}</p>
      </div>
      <div className="flex flex-row items-center  ">
        {post.isAlert? <IoAlertCircle color="red" />: <TbLineDashed size={18} />}
      </div>
    </div>
  </div>
}