import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateRestaurante, useGetRestaurante, useUpdateRestaurante } from "@/api/RestauranteApi";

export default function ManageRestaurantPage() {
    const createRestauranteRequest = useCreateRestaurante();
    const { data:restaurante, isLoading } = useGetRestaurante();
    const updateRestauranteRequest = useUpdateRestaurante();

    const isEdditing = !!restaurante;

  return (
    <ManageRestaurantForm
        restaurante={restaurante}
        onSave={isEdditing? updateRestauranteRequest.mutate : createRestauranteRequest.mutate}
        isLoading={isLoading}/>
  )
}
