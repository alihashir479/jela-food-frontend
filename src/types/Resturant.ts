type MenuItem = {
  _id: string;
  name: string;
  price: number;
};
export type Resturant = {
  _id: string;
  resturantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};
