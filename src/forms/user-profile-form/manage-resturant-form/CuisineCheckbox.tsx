import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<FieldValues, "cuisines">;
  cuisine: string;
};
const CuisineCheckbox = ({ field, cuisine }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 mt-4">
      <FormControl>
        <Checkbox
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value != cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="font-sm !mt-0">{cuisine}</FormLabel>
    </FormItem>
  );
};
export default CuisineCheckbox;
