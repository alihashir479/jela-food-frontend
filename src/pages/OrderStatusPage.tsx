import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusInfo from "@/components/OrderStatusInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Order } from "@/types/types";

const OrderStatusPage = () => {
  const { data: orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!orders || orders.length === 0) {
    return <span>No Orders found</span>;
  }

  return (
    <div className="space-y-10">
      {orders.map((order: Order) => (
        <div
          className="flex flex-col bg-gray-50 space-y-10 p-10"
          key={order._id}
        >
          <div className="">
            <OrderStatusInfo order={order} />
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img src={order.resturant.imageUrl} className="object-cover rounded-md h-full w-full" />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
