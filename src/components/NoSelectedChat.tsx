import { MessageSquare } from 'lucide-react'

const NoSelectedChat = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <MessageSquare className="text-primary" />
      <p>Welcome to Chatty!</p>
      <p>Select a conversation from the sidebar to start a chat</p>
    </div>
  )
}

export default NoSelectedChat
