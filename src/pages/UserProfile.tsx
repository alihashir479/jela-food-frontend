import { useGetMyUser, useMyUpdateUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isPending: isUpdateLoading } = useMyUpdateUser()
  const { currentUser, isPending: isGetLoading} = useGetMyUser()

  if(isGetLoading) {
    return <span>...Loading</span>
  }

  if(!currentUser) {
    return <span>Error fetching user</span>
  }

  return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />;
};

export default UserProfilePage;
