import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
  selectedOption: string;
  onChange: (value: string) => void;
};

const SORT_OPTIONS = [
  { label: "Best Match", value: "bestMatch" },
  { label: "Delivery Price", value: "deliveryPrice" },
  { label: "Estimated Delivery Time", value: "estimatedDeliveryTime" },
];
const SortDropdownOptions = ({ selectedOption, onChange }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="w-full">
          Sort by: {SORT_OPTIONS.find(option => option.value === selectedOption)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            key={option.value}
            onClick={() => {
              onChange(option.value);
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdownOptions;
