const ChatCard = ({createdAt, current, handleClick, id}) =>{
    function formatDate(isoDate){
        const d = new Date(Date(isoDate))
        return d.toISOString()
    }
    return <li onClick={(e)=>{handleClick(id)}} className={`chat-card ${current === id && "current"}`}>{formatDate(createdAt)}</li>
}

export default ChatCard