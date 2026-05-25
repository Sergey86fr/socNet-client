import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu"
import { SquareChartGantt, Users, UserStar } from "lucide-react"


const Navbar = () => {
  return (
    <NavigationMenu className='min-w-50 flex justify-start items-start' >
      <NavigationMenuList className="flex flex-row md:flex-col   md:items-start gap-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild >
            <Link to="/" className="flex-row items-center gap-2"> <SquareChartGantt />Посты</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild >
            <Link to="following" className="flex-row items-center gap-2"><UserStar />Подписки</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild >
            <Link to="followers" className="flex-row items-center gap-2"><Users />Подписчики</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar
