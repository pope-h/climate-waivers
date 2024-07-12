
const ChatCard = ({createdAt, current, handleClick, id}) =>{
    function formatDate(isoDate){
        const d = new Date(Date(isoDate))
        return d.toISOString()
    }
    return <li onClick={(e)=>{handleClick(id)}} className={`border-b-[1px] border-gray-500 h-[45px] text-center ${current === id && "current"}`}>{formatDate(createdAt)}</li>
}

export default ChatCard