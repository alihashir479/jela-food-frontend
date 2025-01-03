import { Order, OrderStatus, Resturant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyResturant = () => {
  const { getAccessTokenSilently } = useAuth0()
  const getMyResturantRequest = async(): Promise<Resturant> => {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/my/resturant`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if(!response.ok) {
      throw new Error('Error fetching resturant')
    }

    return response.json()
  }

  const {
    data: resturantData,
    isPending: isLoading
  } = useQuery({
    queryKey: ['get-my-resturant'],
    queryFn: getMyResturantRequest
  })

  return {
    resturantData,
    isLoading
  }
}

export const useGetMyResturantOrdersRequest = () => {
  const { getAccessTokenSilently } = useAuth0()
  const getMyResturantOrders = async () => {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/my/resturant/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok) {
      throw new Error('Error fetching orders')
    }

    return response.json()
  }

  const {data, isPending: isLoading} = useQuery({
    queryKey: ['get-my-resturant-orders'],
    queryFn: getMyResturantOrders,
  })

  return {
    data,
    isLoading
  }
}

export const useCreateMyResturant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyResturantRequest = async (resturantFormData: FormData):Promise<Resturant> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/my/resturant`, {
      method: 'POST',  
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: resturantFormData,
    });

    if(!response.ok) {
        throw new Error('Error creating request')
    }

    return response.json()
  };

  const {
    mutateAsync: createResturant,
    isPending: isLoading,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: createMyResturantRequest,
    mutationKey: ['create-resturant']
  })

  if(isSuccess) {
    toast.success('Resturant updated successfully')
  }

  if(isError) {
    toast.error('Error updating resturant')
  }

  return {
    createResturant,
    isLoading
  }
};

export const useUpdateMyResturant = () => {
  const { getAccessTokenSilently } = useAuth0()
  const updateMyResturant = async (resturantData: FormData):Promise<Resturant> => {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/my/resturant`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: resturantData
    })

    if(!response.ok) {
      throw new Error('Error updating resturant!')
    }

    return response.json()
  }

  const {
    mutateAsync: updateResturant,
    isPending: isLoading,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: updateMyResturant,
    mutationKey: ['update-resturant']
  })

  if(isSuccess) {
    toast.success('Resturant updated succesfully')
  }

  if(isError) {
    toast.error('Error updating resturant!')
  }

  return {
    updateResturant,
    isLoading
  }
}

type UpdateOrderStatusRequest = {
  orderId: string;
  status: OrderStatus;
}
export const useUpdateMyOrder = () => {
  const { getAccessTokenSilently } = useAuth0()
  const updateMyOrder = async (orderRequestData: UpdateOrderStatusRequest):Promise<Order> => {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/my/resturant/orders/${orderRequestData.orderId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: orderRequestData.status})
    })

    if(!response.ok) {
      throw new Error('Error updating order status')
    }

    return response.json()
  }

  const {
    mutateAsync: updateOrderStatus,
    isPending: isLoading,
    isSuccess,
    error,
    reset
  } = useMutation({
    mutationFn: updateMyOrder,
    mutationKey: ['order-status-update']
  })

  if(isSuccess) {
    toast.success('Order status updated succesfully')
  }

  if(error) {
    toast.error('Error updating order status')
    reset()
  }

  return {
    updateOrderStatus,
    isLoading
  }
}