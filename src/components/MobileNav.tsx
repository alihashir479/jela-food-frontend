import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
import Separator from "./Separator";

const MobileNav = () => {
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold hover:text-orange-500 gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to Jela Foods</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-2 mt-2">
          {isAuthenticated ? (
            <MobileNavLinks logout={logout} />
          ) : (
            <Button className="flex-1 bg-orange-500 text-bold text-white" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
