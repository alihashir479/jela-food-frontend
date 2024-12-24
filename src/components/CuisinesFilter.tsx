import { cuisineList } from "@/config/resturant-option-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpanded: () => void;
};
const CuisinesFilter = ({ onChange, selectedCuisines, isExpanded, onExpanded }: Props) => {
  const handleResetFilters = () => {
    onChange([]);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentCuisine = event.target.value;
    const isChecked = event.target.checked;

    const cuisineList = isChecked
      ? [...selectedCuisines, currentCuisine]
      : selectedCuisines.filter((cuisine) => cuisine != currentCuisine);
    onChange(cuisineList);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-end gap-2">
        <div className="text-md font-semibold">Filter By Cuisines</div>
        <div
          className="text-sm font-semibold cursor-pointer text-blue-600"
          onClick={handleResetFilters}
        >
          Reset Filter
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-2">
        {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
          const isSelected = selectedCuisines.includes(cuisine);
          return (
            <div className="flex" key={cuisine}>
              <input
                type="checkbox"
                id={`cuisine_${cuisine}`}
                value={cuisine}
                checked={isSelected}
                className="hidden"
                onChange={handleFilterChange}
              />
              <Label
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 gap-2 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold border ${
                  isSelected
                    ? "border-green-600 text-green-600"
                    : "border-slate-300"
                }`}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          );
        })}
      </div>
      <Button variant='link' className="mt-4 flex-1" onClick={onExpanded}>
         {isExpanded && (
            <span className="flex items-center text-center gap-2">View Less <ChevronUp /></span>
         )}
         {!isExpanded && (
            <span className="flex items-center text-center gap-2">View More <ChevronDown /></span>
         )}
      </Button>
    </div>
  );
};

export default CuisinesFilter;
