import Cookies from "js-cookie"

const MessageCard = ({body, id, postedBy}) =>{
    const user = JSON.parse(Cookies.get("user"))
    return <div className={`message-card ${user.id === id && "user-message-card"}`}>
        <p>{body}</p>
    </div>
}