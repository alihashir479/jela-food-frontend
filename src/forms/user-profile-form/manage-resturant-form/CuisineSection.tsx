import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/resturant-option-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisineSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>Enter the cuisines for your resturant</FormDescription>
      </div>

      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid md:grid-cols-5">
                {cuisineList.map((cuisineItem: string, idx: number) => (
                  <CuisineCheckbox
                    field={field}
                    cuisine={cuisineItem}
                    key={idx + "-" + cuisineItem}
                  />
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </div>
  );
};

export default CuisineSection;
