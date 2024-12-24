import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

type Props = {
  onSubmit: (data: SearchDataType) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery: string;
};

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Search query is required",
  }),
});

export type SearchDataType = z.infer<typeof formSchema>;
function SearchBar({ onSubmit, onReset, placeholder, searchQuery }: Props) {
  const form = useForm<SearchDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  const clearForm = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <SearchIcon
          className="text-orange-500 ml-1 hidden md:block"
          strokeWidth={2.5}
          size={30}
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button
          type="button"
          variant="outline"
          className="rounded-lg"
          onClick={clearForm}
        >
          Clear
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
}
export default SearchBar;
