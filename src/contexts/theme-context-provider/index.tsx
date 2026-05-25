import type { ReactNode } from "react"
import { createContext, useEffect, useState } from "react"

type Theme = "dark" | "light" 

type IThemeProviderProps = {
  children: ReactNode
}

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => null,
})

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
    const storedTheme = localStorage.getItem("theme")
  const currentTheme = storedTheme  ? storedTheme as Theme : "dark"
  const [theme, setTheme] = useState(currentTheme)

  // const toggleTheme = () => {
  //   setTheme(prev => {
  //     const newTheme = prev === "dark" ? "light" : "dark"
  //     localStorage.setItem("theme", newTheme)
  //     return newTheme
  //   })
  // }

  useEffect(() => {
    const root = window.document.documentElement
 
    root.classList.remove("light", "dark")
 
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <main className={`${theme} text-foreground bg-background`}>
      {children}

        </main>
    </ThemeContext.Provider>
  )
}
