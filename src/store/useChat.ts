import { create } from "zustand";
import type { TChat, TUser } from "../types/storeTypes";
import axios from "axios";
import { useAuth } from "./useAuth";


interface TChatStore {
  chats: TUser[];
  isLoadingChat: boolean;
  isLoadingChats: boolean;
  chatMessages: TChat[]|null;
  isSendingMessage: boolean;
  getAllChats: () => Promise<void>;
  getMessages: (id:string) => Promise<void>
  sendMessage: (id:string,formData:FormData) => Promise<void>
  listenToMessages: () => void
  unListenToMessages: () => void
}

const useChat = create<TChatStore>((set) => ({
  chats: [],
  isSelectingChat: false,
  selectedChat: null,
  isSendingMessage: false,
  isLoadingChat: true,
  isLoadingChats: false,
  chatMessages: null,
  getAllChats: async () => {
    try {
      set({ isLoadingChats: true });
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/getAllUsers`, {
        withCredentials: true,
      });
      set({ chats: response.data.data });
    } catch (error) {
      console.log(error);
    }finally {
      set({ isLoadingChats: false });
    }
  },
  getMessages: async (id) => {
    try {
      set({ isLoadingChat: true });
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/getMessages/${id}`, {
        withCredentials: true,
      });
      set({ chatMessages: response.data.data });
    } catch (error) {
      console.log(error);
    }finally {
      set({ isLoadingChat: false });
    }
  },
  sendMessage: async (id,formdata) => {
    try {
      set({ isSendingMessage: true });
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/message/send/${id}`,formdata, {
        withCredentials: true,
      });
      set({ chatMessages: response.data.data });
    } catch (error) {
      console.log(error);
    }finally {
      set({ isSendingMessage: false });
    }
  },
  listenToMessages: () => {
    const {selectedChat,socket} = useAuth.getState()
    if(!selectedChat) return
    socket.on("newMessage", ([messages, id]: [TChat[], string]) => {
      if (id !== selectedChat._id) return;
      set({ chatMessages: messages });
    })
  },
  unListenToMessages: () => {
    const {selectedChat,socket} = useAuth.getState()
    if(!selectedChat) return
    socket.off("newMessage")
  },
}));

export default useChat;

