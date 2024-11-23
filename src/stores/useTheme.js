import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { lightColors, darkColors } from '../styles/colors';

const useThemeStore = create()(
  devtools(
    (set) => ({
      userTheme: 'light',
      colors: lightColors,
      setTheme: (theme) =>
        set(() => ({
          userTheme: theme,
          colors: theme === 'light' ? lightColors : darkColors
        }))
    }),
    {
      name: 'user-theme-store'
    }
  )
);

export const useUserTheme = () => useThemeStore((store) => store.userTheme);
export const useThemeColors = () => useThemeStore((state) => state.colors);

export default useThemeStore;
