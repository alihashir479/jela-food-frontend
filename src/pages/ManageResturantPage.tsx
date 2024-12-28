import {
  useCreateMyResturant,
  useGetMyResturant,
  useGetMyResturantOrdersRequest,
  useUpdateMyResturant,
} from "@/api/MyResturantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageResturantForm from "@/forms/user-profile-form/manage-resturant-form/ManageResturantForm";
import { Order } from "@/types/types";

const ManageResturantPage = () => {
  const { createResturant, isLoading: isCreateLoading } =
    useCreateMyResturant();
  const { resturantData, isLoading } = useGetMyResturant();
  const { updateResturant, isLoading: isUpdateLoading } =
    useUpdateMyResturant();

  const { data: orders, isLoading: isGetOrdersLoading } =
    useGetMyResturantOrdersRequest();

  if (isLoading || isGetOrdersLoading) {
    return <span>Loading...</span>;
  }

  const existing = !!resturantData;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-resturant">Manage Resturant</TabsTrigger>
      </TabsList>
      <TabsContent
        className="space-y-5 rounded-lg bg-gray-50 pg-10"
        value="orders"
      >
        <h1 className="text-2xl font-bold">{orders?.length} active orders</h1>
        {orders?.map((order: Order) => (
          <OrderItemCard order={order} key={order._id} />
        ))}
      </TabsContent>
      <TabsContent value="manage-resturant">
        <ManageResturantForm
          resturantData={resturantData}
          onSave={existing ? updateResturant : createResturant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageResturantPage;
