import { searchState } from "@/pages/SearchResturantPage";
import { ResturantResponseType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useResturantsSearch = (searchState: searchState, city?: string) => {
  const searchResturants = async (): Promise<ResturantResponseType> => {
    const params = new URLSearchParams()
    params.set('searchQuery', searchState.searchQuery)
    params.set('page', searchState.page.toString())
    params.set('selectedCuisines', searchState.selectedCuisines.join(','))
    params.set('sortOption', searchState.sortOption)

    const response = await fetch(`${API_BASE_URL}/resturant/search/${city}?${params.toString()}`);

    if (!response.ok && !(response.status === 404)) {
      throw new Error("Error fetching resturants");
    }

    return response.json();
  };

  const { data: results, isPending: isLoading } = useQuery({
    queryKey: ["resturant-search", searchState],
    queryFn: searchResturants,
    enabled: !!city
  });

  return {
    results,
    isLoading,
  };
};
