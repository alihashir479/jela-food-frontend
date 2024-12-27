import { CartItem } from "@/pages/ResturantDetail";
import { Resturant } from "@/types/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Separator from "./Separator";
import { Trash } from "lucide-react";

type Props = {
  resturant: Resturant;
  cartItems: CartItem[];
  removeCartItem: (item: CartItem) => void;
};
const OrderSummary = ({ resturant, cartItems, removeCartItem }: Props) => {
  const getTotalCost = () => {
    const totalCost = cartItems.reduce(
      (totalPrice, menuItem) => totalPrice + menuItem.price * menuItem.quantity,
      0
    );
    const totalCostWithDelivery = totalCost + resturant.deliveryPrice;

    return (totalCostWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold text-2xl tracking-tight">
          <span>Your Order</span>
          <span>{getTotalCost()}</span>
        </CardTitle>
        <CardContent className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <div className="flex justify-between" key={item._id}>
              <span>
                <Badge variant="outline" className="mr-2">
                  {item.quantity}
                </Badge>{" "}
                {item.name}
              </span>
              <span className="flex items-center gap-1">
                <Trash color="red" size='20' className="cursor-pointer" onClick={() => {removeCartItem(item)}} />
                {((item.quantity * item.price) / 100).toFixed(2)}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{(resturant.deliveryPrice / 100).toFixed(2)}</span>
          </div>
          <Separator />
        </CardContent>
      </CardHeader>
    </>
  );
};
export default OrderSummary;
