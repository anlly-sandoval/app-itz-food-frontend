import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type { Restaurante, RestauranteSearchResponse } from "./types";
import type { SearchState } from "@/pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//hook para obtener los datos de un restaurante del backend
export function useGetRestaurante() {
    const { getAccessTokenSilently } = useAuth0();

    const getRestauranteRequest = async (): Promise<Restaurante> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok)
            throw new Error('Error al obtener los datos del restaurante');

        return res.json();
    }

    return useQuery({
        queryKey: ['restaurante'],
        queryFn: getRestauranteRequest
    });
}

export function useCreateRestaurante(){
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    //funcion para crear un restaurante en el backend
    const createRestauranteRequest = async (restaurantFormData: FormData): Promise<Restaurante>=>{
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'POST',
            headers:{
                Authorization: 'Bearer ' + accessToken,
            },
            body: restaurantFormData
        });
        if(!res.ok){
            throw new Error("Error al crear el restaurante")
        }
        return res.json();
    }
    return useMutation({
        mutationFn: (restaurante: FormData)=>createRestauranteRequest(restaurante),
        onError: (err)=>{
            toast.error("Error al crear el restaurante");
            console.log(err);
            throw new Error("Error al crear el restuarnte")
        },
        onSuccess: (restaurante)=>{
            toast.success("Restaurante creado correctamente");
            console.log(restaurante)
            queryClient.invalidateQueries({queryKey: ['restaurante']});
        },
    }) //fin de return
} // fin de useCreateRestaurante

//hook para actualizar un restaurante
export function useUpdateRestaurante(){
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    //funcion para actualizar un restaurante
    const updateRestauranteRequest = async (restauranteFormData: FormData): Promise<Restaurante>=>{
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            body: restauranteFormData
        });
        if(!res.ok){
            throw new Error("Error al actualizar el restaurante")
        }
        return res.json();
    } //fin de updateRestaurantRequest

    return useMutation({
        mutationFn: (formData: FormData)=> updateRestauranteRequest(formData),
        onError: (err)=>{
            console.log(err);
            toast.error(err.toString());
            throw new Error("Error al actualizar restaurante");
        },
        onSuccess: ()=>{
            toast.success("Restaurante actualizado")
            queryClient.invalidateQueries({queryKey: ['restaurante']});
        }
    }) //fin de return
} //fin de useUpdateRestaurante

//funcion para buscar restaurantes
export const useSearchRestaurantes = (searchState: SearchState, city?: string)=>{
    const getSearchRestauranteRequest = async (searchState: SearchState):Promise<RestauranteSearchResponse>=>{
        const params = new URLSearchParams();
        
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedCuisines", searchState.selectedCuisines.join(","));
        params.set("sortOptions", searchState.sortOptions);

        const url = API_BASE_URL
                    + '/api/restaurante/search/'
                    + city
                    + '?'
                    + params.toString();
        console.log(url);

        const res = await fetch(url);

        if(!res.ok) {
            throw new Error("Error al buscar restaurante");
        }
        return res.json();
    } //fin de createSearchRequest

    return useQuery({
        queryKey: ['searchRestaurantes', searchState],
        queryFn: ()=>getSearchRestauranteRequest(searchState),
        enabled: !!city
    }); //fin de return
} //fin de useSearchRestaurantes
