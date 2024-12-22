import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  removeMenuItem: () => void;
  index: number;
};
const MenuItemInput = ({ removeMenuItem, index }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        name={`menuItems.${index}.name`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                className="bg-white"
                placeholder="Menu Item name"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      ></FormField>

      <FormField
        name={`menuItems.${index}.price`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Price <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                className="bg-white"
                placeholder="Menu Item price"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      ></FormField>

      <Button type="button" className="bg-red-500" onClick={removeMenuItem}>
        Remove
      </Button>
    </div>
  );
};
export default MenuItemInput;
