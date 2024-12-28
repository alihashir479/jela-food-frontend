import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import Usermenu from "./Usermenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const loginAuth0 = async () => {
    await loginWithRedirect();
  };

  return (
    <span className="flex space-x-2">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold text-orange-500">
            Order status
          </Link>
          <Usermenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:bg-white hover:text-orange-500"
          onClick={async () => await loginAuth0()}
        >
          Login
        </Button>
      )}
    </span>
  );
};

export default MainNav;
