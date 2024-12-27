import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "./ui/dialog";
import UserProfileForm, {
  userSchemaType,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { DialogTitle } from "@radix-ui/react-dialog";

type Props = {
  onCheckout: (userProfileData: userSchemaType) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading: isCheckoutLoading }: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isPending: isGetUserLoading } = useGetMyUser();

  if (!isAuthenticated) {
    return (
      <Button
        className="bg-orange-500 flex-1"
        onClick={() => {
          loginWithRedirect({ appState: { redirectTo: pathname } });
        }}
      >
        Login to Checkout
      </Button>
    );
  }

  if (isLoading || !currentUser || isCheckoutLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button disabled={disabled} className="bg-orange-500 flex-1 w-full">
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogHeader className="hidden">
        <DialogTitle>Edit profile</DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery details"
          buttonText="Proceed to Payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
