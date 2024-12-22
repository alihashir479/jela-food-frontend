import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Enter the name and price for each menu item
        </FormDescription>
      </div>

      <FormField
        name="menuItems"
        control={control}
        render={() => (
          <FormItem>
            <FormControl>
            <div className="flex flex-col gap-2">
              {fields.map((field, idx) => (
                <MenuItemInput
                  removeMenuItem={() => {
                    remove(idx);
                  }}
                  index={idx}
                  key={field.id}
                />
              ))}
            </div>
            </FormControl>
          </FormItem>
        )}
      ></FormField>

      <Button
        type="button"
        onClick={() => {
          append({ name: "", price: 0 });
        }}
      >
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
