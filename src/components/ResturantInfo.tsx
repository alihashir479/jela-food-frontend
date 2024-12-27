import { Resturant } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  resturant: Resturant;
};
const ResturantInfo = ({ resturant }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-right">
          {resturant.resturantName}
        </CardTitle>
        <CardDescription>
          {resturant.city}, {resturant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {resturant.cuisines.map((cuisine, idx) => (
          <span className="flex" key={`${cuisine}-${idx}`}>
            {cuisine} {idx !== resturant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResturantInfo;
