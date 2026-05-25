import { Outlet, useNavigate } from "react-router-dom"
import Header from "../header/header"
import Navbar from "../navbar/navbar"
import { selectIsAuthenticated, selectUser } from "@/features/user/userSlice"
import { useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import Profile from "../profile/profile"


const Layout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated ) {
       // eslint-disable-next-line @typescript-eslint/no-floating-promises
       navigate("/auth")
    }
  }, [isAuthenticated, navigate])

  return (
    // <div className="flex flex-col p-5">
    //   <Header />
    //   <div className="flex mt-5">
    //     <Navbar  />
    //     <div className="flex-2 p-4">
    //       <Outlet />
    //     </div>
    //     <div className="flex-1 p-4">
          
    //       {!user && <Profile/>}
            
          
    //     </div>
    //   </div>
    // </div>
     

     <>
      {/* ДЕСКТОПНАЯ ВЕРСИЯ (от 768px) */}
      <div className="hidden md:block">
        <div className="flex flex-col p-5">
          <Header />
          <div className="flex mt-5">
            <Navbar />
            <div className="flex-2 p-4">
              <Outlet />
            </div>
            <div className="flex-1 p-4">
              {!user && <Profile />}
            </div>
          </div>
        </div>
      </div>

      {/* МОБИЛЬНАЯ ВЕРСИЯ (до 768px) */}
      <div className="md:hidden m-3">
        {/* Хедер */}
        <Header />
        
        {/* Навбар */}
        <div className="px-4 py-2">
          <Navbar />
        </div>
        
        {/* Профиль по центру */}
        <div className="flex justify-center w-full py-2">
          {!user && <Profile />}
        </div>
        
        {/* Контент на всю ширину */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
     
  )
}

export default Layout
