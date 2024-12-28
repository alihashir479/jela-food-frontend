import { Order, OrderStatus } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Separator from "./Separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyOrder } from "@/api/MyResturantApi";
import { useState } from "react";

type Props = {
  order: Order;
};
const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState(order.status)
  const { updateOrderStatus, isLoading } = useUpdateMyOrder();

  const getTime = () => {
    const createdTime = new Date(order.createdAt);
    const hours = createdTime.getHours().toString().padStart(2, "0");
    const minutes = createdTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateOrderStatus({ orderId: order._id, status: newStatus });
    setStatus(newStatus)
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md-grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              {(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem.menuItemId}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of the order</Label>
          <Select value={status} onValueChange={handleStatusChange} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Status"></SelectValue>
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
export default OrderItemCard;
