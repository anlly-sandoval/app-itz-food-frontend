import UserProfileForm from "@/forms/UserProfileForm";
import { useUpdateUser, useGetUser } from "@/api/UserApi";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner";

export default function UserProfilePage() {
  const { data: user, isLoading, isError } = useGetUser();
  const updateUserRequest = useUpdateUser();

  if(isLoading)
    return (<LoadingButton />)

  if(isError){
    toast.error("Error al cargar los datos del usuario")
  }

  return (
    <UserProfileForm 
    onSave={updateUserRequest.mutate}
    getUser={user} />
  )
}


