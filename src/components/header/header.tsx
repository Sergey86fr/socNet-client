import { ThemeContext } from "@/contexts/theme-context-provider"
import { useContext } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Title from "../title/title"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { logout, selectIsAuthenticated } from "@/features/user/userSlice"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const { setTheme } = useContext(ThemeContext)

  const isAuthennticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()



  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token")
    void navigate('auth')

  }


  return (
    <div className="flex justify-between">
      <Title />
      <div className="flex gap-3">

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setTheme("light")
            }}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme("dark")
            }}
          >
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {
        isAuthennticated && (
          <Button  onClick={handleLogout}  variant='outline'>Выйти</Button>
        )
      }
      </div>
    </div>
  )
}

export default Header
