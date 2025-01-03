import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { CircleUserRound } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import Separator from "./Separator"

const Usermenu = () => {
  const { user, logout } = useAuth0()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 font-bold px-3 hover:text-orange-500">
         <CircleUserRound className="text-orange-500" />
         {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to='/manage-resturant' className="font-bold hover:text-orange-500">Manage Resturant</Link>  
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/user-profile' className="font-bold hover:text-orange-500">User Profile</Link>  
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
           <Button className="flex flex-1 font-bold bg-orange-500" onClick={() => logout()}>Logout</Button> 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Usermenu