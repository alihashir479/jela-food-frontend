import { useResturantsSearch } from "@/api/ResturantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PaginationSelector from "@/components/Pagination";
import SearchBar, { SearchDataType } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortDropdownOptions from "@/components/SortDropdownOptions";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type searchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
const SearchResturantPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<searchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading } = useResturantsSearch(searchState, city);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data.length || !city) {
    return <span>No Results found!</span>;
  }

  const handleSearchQuery = (searchState: SearchDataType) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchState.searchQuery,
    }));
  };

  const resetSearchQuery = () => {
    setSearchState((prev) => ({ ...prev, searchQuery: "", page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setSearchState((prev) => ({ ...prev, page }));
  };

  const handleSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({ ...prev, sortOption, page: 1 }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisinesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={handleSelectedCuisines}
          isExpanded={isExpanded}
          onExpanded={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        />
      </div>
      <div id="main-content">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={handleSearchQuery}
          onReset={resetSearchQuery}
          placeholder="Search by cuisine or Resturant name"
        />
        <div className="flex justify-between">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortDropdownOptions
            selectedOption={searchState.sortOption}
            onChange={setSortOption}
          />
        </div>
        {results.data.map((resturant) => (
          <SearchResultCard key={resturant._id} resturant={resturant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchResturantPage;
