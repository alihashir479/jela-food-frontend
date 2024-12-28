import { Order } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type SessionRequestType = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  resturantId: string;
};

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0()
  const getMyOrders = async ():Promise<Order[]> => {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if(!response.ok) {
      throw new Error('Error fetching order')
    }

    return response.json()
  }

  const {
    data,
    isPending: isLoading
  } = useQuery({
    queryKey: ['get-my-orders'],
    queryFn: getMyOrders,
    refetchInterval: 5000
  })

  return {
    data,
    isLoading
  }
}
export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckoutSession = async (
    checkoutSessionRequest: SessionRequestType
  ) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Error creating checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createSession,
    error,
    isPending: isLoading,
    reset,
  } = useMutation({
    mutationKey: ["create-checkout-session"],
    mutationFn: createCheckoutSession,
  });

  if (error) {
    toast.error(error.message);
    reset();
  }

  return {
    createSession,
    isLoading,
  };
};
