import { create } from "zustand";
import  { THEMES } from "../constData";


type themeType = typeof THEMES[number]

type TThemes = {
  theme: themeType;
  changeTheme: (theme: themeType) => void
}


const useTheme = create<TThemes>((set) => ({
  theme: localStorage.getItem('chat-theme') as themeType || 'luxury',
  changeTheme: (theme) => {
    localStorage.setItem('chat-theme', theme)
    set({ theme })
  }
}));

export default useTheme
