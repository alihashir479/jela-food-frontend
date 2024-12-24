import { User } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type createUserRequest = {
  auth0Id: string;
  email: string;
};
export const useMyCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (
    user: createUserRequest
  ): Promise<void> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error creating user!");
    }
  };

  const {
    mutateAsync: createUser,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: createMyUserRequest,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    createUser,
    isPending,
    isSuccess,
    isError,
  };
};

type UserProfileData = {
  email: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useMyUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UserProfileData) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("error updating user");
    }
  };

  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });

  if (isSuccess) {
    toast.success("User updated successfully");
  }

  if (isError) {
    toast.error("Error updating user");
    reset();
  }

  return {
    updateUser,
    isPending,
    isSuccess,
    isError,
  };
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()
  const fetchMyUser = async():Promise<User> => {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/my/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      method: 'GET'
    })

    if(!response.ok) {
      throw new Error('Error fetching user')
    }

    return response.json()
  }

  const {
    isPending,
    data: currentUser
  } = useQuery({
    queryKey: ['fetchMyUser'],
    queryFn: fetchMyUser
  })

  return {
    isPending,
    currentUser
  }
}
