import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import Usermenu from "./Usermenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const loginAuth0 = async () => {
    await loginWithRedirect();
  };

  return (
    <span className="flex space-x-2">
      {isAuthenticated ? (
        <Usermenu />
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
