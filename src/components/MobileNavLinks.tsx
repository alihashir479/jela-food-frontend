import { Link } from "react-router-dom"
import { Button } from "./ui/button"

type Props = {
  logout: () => void  
}
const MobileNavLinks = ({logout}: Props) => {
  return (
    <>
      <Link to='/user-profile' className="font-bold tex-orange-500">User profile</Link>
      <Link to='/manage-resturant' className="font-bold tex-orange-500">Manage Resturant</Link>
      <Button className="font-bold bg-orange-500 flex flex-1" onClick={logout}>Logout</Button>
    </>
  )
}

export default MobileNavLinks