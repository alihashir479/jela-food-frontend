export type User = {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
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

export type ResturantResponseType = {
  data: Resturant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  }  
}
