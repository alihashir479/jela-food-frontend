import {
  useCreateMyResturant,
  useGetMyResturant,
  useUpdateMyResturant,
} from "@/api/MyResturantApi";
import ManageResturantForm from "@/forms/user-profile-form/manage-resturant-form/ManageResturantForm";

const ManageResturantPage = () => {
  const { createResturant, isLoading: isCreateLoading } =
    useCreateMyResturant();
  const { resturantData, isLoading } = useGetMyResturant();
  const { updateResturant, isLoading: isUpdateLoading } =
    useUpdateMyResturant();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const existing = !!resturantData

  return (
    <ManageResturantForm
      resturantData={resturantData}
      onSave={existing ? updateResturant : createResturant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageResturantPage;
