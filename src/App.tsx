import ChatContainer from './components/ChatContainer'
import NoSelectedChat from './components/NoSelectedChat'
import Sidebar from './components/Sidebar'
import { useAuth } from './store/useAuth'

const App = () => {
  const { selectedChat } = useAuth()
  return (
    <div className="flex w-full py-5">
      <Sidebar />
      {selectedChat ? <ChatContainer /> : <NoSelectedChat />}
    </div>
  )
}

export default App
