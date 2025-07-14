import { useEffect, useRef } from 'react'
import useChat from '../store/useChat'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import { useAuth } from '../store/useAuth'

const ChatContainer = () => {
  const {
    chatMessages,
    isLoadingChat,
    getMessages,
    listenToMessages,
    unListenToMessages,
  } = useChat()
  const { selectedChat, user } = useAuth()
  const messageEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    getMessages(selectedChat?._id as string)
    listenToMessages()
    return () => unListenToMessages()
  }, [getMessages, selectedChat?._id, listenToMessages, unListenToMessages])
  useEffect(() => {
    if (messageEndRef.current && chatMessages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])
  const getTimeOnly = (date: string) => {
    const time = new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    return time
  }

  if (isLoadingChat)
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  return (
    <div className="flex-1 px-2">
      <ChatHeader />
      <div className="h-[72vh] overflow-y-auto p-4 space-y-4">
        {chatMessages &&
          chatMessages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.sender._id === user?._id ? 'chat-end' : 'chat-start'
              }`}
              ref={messageEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.sender._id === user?._id
                        ? user?.profilePic.url
                        : selectedChat?.profilePic.url
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {getTimeOnly(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image.url && (
                  <img
                    src={message.image.url}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.content && <p>{message.content}</p>}
              </div>
            </div>
          ))}
      </div>
      <ChatInput />
    </div>
  )
}

export default ChatContainer
