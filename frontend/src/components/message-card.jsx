import Cookies from "js-cookie"
import { getUser } from "../utils/factory"

const MessageCard = ({body, postedBy, postedAt}) =>{
    const user = getUser()
    return <div className={`message-card ${user.id === postedBy ?"self": "other"}`}>
        <p>{body}</p>
    </div>
}

export default MessageCard