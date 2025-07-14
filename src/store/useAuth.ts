
import {create} from 'zustand'
import type { TUser } from '../types/storeTypes'
import axios, { isAxiosError } from 'axios'
import type { TLoginForm, TSignupForm } from '../zodValidation'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'


type TAuth = {
  user: TUser|null
  isAuthenticated: boolean
  isLoading: boolean
  isCheckingAuth: boolean
  onlineUsers: string[]
  isSelectingChat: boolean
  selectedChat: TUser|null
  socket: any,
  login:(user:TLoginForm)=>Promise<void>
  checkAuth:()=>Promise<void>
  signup: (user:TSignupForm)=> Promise<void>
  logout:()=>Promise<void>
  updateProfilePic: (file:FormData)=>Promise<void>
  getUser: (id:string) => Promise<void>
  resetSelectedUser: () => void
  connectSocket: () => void
  disConnectSocket: () => void
}


export const useAuth = create<TAuth>((set,get) => ({
  user: null,
  isAuthenticated: true,
  isLoading: false,
  isCheckingAuth: false,
  socket: null,
  onlineUsers: [],
  isSelectingChat: false,
  selectedChat: null,
  resetSelectedUser: () => set({ selectedChat: null }),
  getUser: async (id) => {
    try {
      set({ isSelectingChat: true });
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/getUser/${id}`, {
        withCredentials: true,
      });
      set({ selectedChat: response.data.data });
    } catch (error) {
      console.log(error);
    }finally {
      set({ isSelectingChat: false });
    }
  },
  checkAuth: async () => {
    try {
      set({isCheckingAuth:true,isAuthenticated:false})
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/checkAuth`,{
        withCredentials: true
      })
      set({user:response.data.data,isAuthenticated:true})
      get().connectSocket()
    } catch (error) {
      console.log(error)
      set({user:null})
    } finally {
      set({isCheckingAuth:false})
    }
  },
  login: async (user) => {
    try {
      set({isLoading:true})
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,user,{
        withCredentials: true
      })
      set({user:response.data.data,isAuthenticated:true,isLoading:false})
      toast.success('Login successful')
      get().connectSocket()
    } catch (error) {
      if(isAxiosError(error)){
        toast.error(error.response?.data.message)
      }else {
        toast.error('Something went wrong')
      }
    }finally {
      set({isLoading:false})
    }
  }
  ,
  signup: async (user) => {
    try {
      set({isLoading:true})
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`,user,{
        withCredentials: true
      })
      set({user:response.data.data,isAuthenticated:true,isLoading:false})
      toast.success('Signup successful')
      get().connectSocket()
    } catch (error) {
      if(isAxiosError(error)){
        toast.error(error.response?.data.message)
      }else {
        toast.error('Something went wrong')
      }
    }finally {
      set({isLoading:false})
    }
  },
  logout: async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{
        withCredentials: true
      })
      set({user:null,isAuthenticated:false,selectedChat:null})
      toast.success('Logout successful')
      get().disConnectSocket()
    } catch (error) {
      if(isAxiosError(error)){
        toast.error(error.response?.data.message)
      }else {
        toast.error('Something went wrong')
      }
    }
  },
  updateProfilePic: async (file) => {
    try {
      set({isLoading:true})
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/auth/updateProfile`,file,{
        withCredentials: true
      })
      set({user:response.data.data,isAuthenticated:true,isLoading:false})
      toast.success('Your profile picture has been updated')
    } catch (error) {
      if(isAxiosError(error)){
        toast.error(error.response?.data.message)
      }else {
        toast.error('Something went wrong')
      }
    }finally {
      set({isLoading:false})
    }
  },
  connectSocket: () => {
    const {isAuthenticated,user} = get()
    if(!isAuthenticated||get().socket) return
    const socket = io(import.meta.env.VITE_API_URL,{
      query:{
        userId:user?._id
      }
    })
    socket.connect()
    set({socket})
    socket.on('getOnlineUsers',(onlineUsers)=>{
      set({onlineUsers})
    })
  },
  disConnectSocket: () => {
    if(get().socket){
      get().socket.disconnect()
      set({socket:null})
    }
  },
}))
