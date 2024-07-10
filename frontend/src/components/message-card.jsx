import Cookies from "js-cookie"
import { getUser } from "../utils/factory"

const MessageCard = ({body, postedBy, postedAt}) =>{
    const user = getUser()
    return  <div className={` flex flex-row  ${user.id === postedBy ? "items-left self-end": "items-right self-start"} my-2 `}>
    <img
      src={postedBy?.profile_pic ? postedBy.profile_pic : "../../pic1.png"}
      className="mr-2 rounded-full h-12"
      alt="Profile Pic"
    />{" "}<div className={`message-card bg-[#008080] border-gray-300`}>
        <p>{body}</p>
    </div>
    </div>
}

export default MessageCard