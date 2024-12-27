import { SessionRequestType, useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetResturantRequest } from "@/api/ResturantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemCard from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import ResturantInfo from "@/components/ResturantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { userSchemaType } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const ResturantDetail = () => {
  const { id } = useParams();
  const { isLoading, data: resturant } = useGetResturantRequest(id);
  const {createSession: createCheckoutSession, isLoading: isCreateCheckoutLoading} = useCreateCheckoutSession()


  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${id}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  if (isLoading) {
    return <span>Loading Resturant</span>;
  }

  if (!resturant) {
    return <span>Error loading resturant</span>;
  }

  const addToCart = (menuItem: MenuItem) => {
    const currentIndex = cartItems.findIndex(
      (item) => item._id === menuItem._id
    );
    let updatedCartItems;
    if (currentIndex != -1) {
      updatedCartItems = [...cartItems];
      updatedCartItems[currentIndex].quantity++;
    } else {
      updatedCartItems = [...cartItems, { ...menuItem, quantity: 1 }];
    }

    sessionStorage.setItem(`cartItems-${id}`, JSON.stringify(updatedCartItems)); // Id refers to resturant id
    setCartItems(updatedCartItems);
  };

  const removeCartItem = (item: CartItem) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem._id !== item._id
    );
    sessionStorage.setItem(`cartItems-${id}`, JSON.stringify(updatedCartItems)); // Id refers to resturant id
    setCartItems(updatedCartItems);
  };

  const onCheckout = async (userFormData: userSchemaType) => {

    const checkoutSessionRequestData:SessionRequestType = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString()
      })),
      deliveryDetails: {
        email: userFormData.email as string,
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city
      },
      resturantId: resturant._id
    }

    const data = await createCheckoutSession(checkoutSessionRequestData)
    window.location.href = data.url
  };

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 6}>
        <img
          src={resturant.imageUrl}
          alt={resturant.resturantName}
          className="object-cover rounded-md w-full h-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <ResturantInfo resturant={resturant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {resturant.menuItems.map((menuItem) => (
            <MenuItemCard
              menuItem={menuItem}
              key={menuItem._id}
              addToCart={addToCart}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              cartItems={cartItems}
              resturant={resturant}
              removeCartItem={removeCartItem}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCreateCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ResturantDetail;
