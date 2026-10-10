import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import getMessages from "../features/getMessages"
import { setMessages } from "../redux/messageSlice"

function ChatArea() {
    const { selectedConversation } = useSelector(state => state.conversation)
    
    const dispatch = useDispatch()

    useEffect(() => {
    const getMesg = async () => {
        if (!selectedConversation || selectedConversation.title=="New Chat") {
            dispatch(setMessages([]))
            return;
        }

        const data = await getMessages(selectedConversation?._id)
        dispatch(setMessages(data))
    }

    getMesg()
}, [selectedConversation?._id])

    return (
        <div className="flex-1 flex flex-col min-w-0">
           <Nav/>
           <MessageList/>
           <ChatInput/>
        </div>
    )
}

export default ChatArea;