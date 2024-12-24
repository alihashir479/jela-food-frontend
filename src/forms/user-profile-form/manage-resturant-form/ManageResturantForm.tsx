import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import Separator from "@/components/Separator";
import CuisineSection from "./CuisineSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Resturant, MenuItem } from "@/types/types";
import { useEffect } from "react";

const formSchema = z.object({
  resturantName: z.string({
    required_error: "Resturant Name is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required",
    invalid_type_error: "Must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select atleast one cuisine",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z.coerce.number().min(1, "Price is required"),
    })
  ),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, { message: "image is required" }).optional()
}).refine((data) => data.imageFile || data.imageUrl, {
  message: 'Either image file or image url is required',
  path: ['imageFile']
});

type ResturantSchemaType = z.infer<typeof formSchema>;

type Props = {
  resturantData?: Resturant;
  onSave: (resturantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageResturantForm = ({ resturantData, onSave, isLoading }: Props) => {
  const form = useForm<ResturantSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: resturantData
  });

  const saveResturant = async (resturantFormdataJson: ResturantSchemaType) => {
    const formData = new FormData();

    formData.append("resturantName", resturantFormdataJson.resturantName);
    formData.append("city", resturantFormdataJson.city);
    formData.append("country", resturantFormdataJson.country);

    formData.append(
      "deliveryPrice",
      (resturantFormdataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      resturantFormdataJson.estimatedDeliveryTime.toString()
    );
    resturantFormdataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    resturantFormdataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if(resturantFormdataJson.imageFile) {
      formData.append("imageFile", resturantFormdataJson.imageFile);
    }
    onSave(formData);
  };

  useEffect(() => {
    if(!resturantData) return

    const updatedDeliveryPrice = parseInt((resturantData.deliveryPrice / 100).toFixed(2))

    const updatedMenuItems = resturantData.menuItems.map((menuItem: MenuItem) => ({
      ...menuItem,
      price: parseInt((menuItem.price / 100).toFixed(2))
    }))

    const updatedData = {
      ...resturantData,
      deliveryPrice: updatedDeliveryPrice,
      menuItems: updatedMenuItems
    }

    form.reset(updatedData)
  }, [form, resturantData])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveResturant)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />

        {isLoading ? <LoadingButton /> : <Button type="submit">Save</Button>}
      </form>
    </Form>
  );
};

export default ManageResturantForm;
