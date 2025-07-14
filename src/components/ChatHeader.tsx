import { X } from 'lucide-react'
import { useAuth } from '../store/useAuth'

const ChatHeader = () => {
  const { selectedChat, resetSelectedUser } = useAuth()
  const { onlineUsers } = useAuth()
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedChat?.profilePic.url}
                alt={selectedChat?.fullname}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedChat?.fullname}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedChat?._id as string)
                ? 'Online'
                : 'Offline'}
            </p>
          </div>
        </div>

        <button onClick={resetSelectedUser} className="cursor-pointer">
          <X />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
