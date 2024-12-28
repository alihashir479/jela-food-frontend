import { Order } from "@/types/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};
const OrderStatusInfo = ({ order }: Props) => {
  const getExpectedDeliveryTime = () => {
    const createdDate = new Date(order.createdAt);
    createdDate.setMinutes(
      createdDate.getMinutes() + order.resturant.estimatedDeliveryTime
    );

    let hours = createdDate.getHours().toString().padStart(2, '0'),
      minutes = createdDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((orderItem) => orderItem.value === order.status)
  }
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight flex flex-col gap-5 md:flex-row md:justify-between mb-4">
        <span>Order status: {getOrderStatusInfo()?.label}</span>
        <span>Expected by: {getExpectedDeliveryTime()}</span>
      </h1>
      <Progress value={getOrderStatusInfo()?.progressValue} />
    </>
  );
};

export default OrderStatusInfo
