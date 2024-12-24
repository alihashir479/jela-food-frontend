import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};
const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="flex flex-col justify-between lg:flex-row lg:items-center gap-3 my-4">
      <div className="text-xl font-bold">
        {total} results found for {city}
        <Link
          to="/"
          className="text-sm font-semibold cursor-pointer text-blue-500 ml-2"
        >
          Change location
        </Link>
      </div>
    </div>
  );
};

export default SearchResultInfo;
