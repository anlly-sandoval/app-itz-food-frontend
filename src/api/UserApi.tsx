const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type {User, UpdateUser, BackEndUser} from "./types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'sonner';

//funcion crea un usuario en el backend
export function useCreateUser() {
    const queryClient = useQueryClient();
    const {getAccessTokenSilently} = useAuth0();

    //funcion para crear un usuario en el backend
    const createUserRequest = async (user:User)=>{
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if(!res.ok){
            console.log(res)
            throw new Error ('Error al crear el usuario');
        }
        return res.json();
    }//fin de createUserRequest

    return useMutation({
        mutationFn: (user:User)=> createUserRequest(user),
        onError: (err)=>{
            toast.error("Error al crear usuario");
            console.log(err);
            throw new Error('Error al crear el usuario');
        },
        onSuccess: (user)=>{
            console.log(user);
            queryClient.invalidateQueries({queryKey: ['user']});
        }
    })
    
}//fin de useCreateUser

//funcion para actualizar usuario en
export function useUpdateUser(){
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    //funcion para actualizar un usuario ene l backend
    const updateUserRequest = async (formData: UpdateUser)=>{
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(formData)
        });
        if(!res.ok){
            throw new Error("Error al actualizar usuario");
        }
    }

    return useMutation({
        mutationFn: (formData: UpdateUser)=>updateUserRequest(formData), 
        onError: (err)=>{
            toast.error(err.toString());
            console.log(err);
            throw new Error("Error al actualizar usuario")
        },
        onSuccess: (user)=>{
            toast.success("Perfil actualizado");
            console.log(user);
        }
})
}// fin de useupdateuser

//funcion para obtener los datos del usuario
export function useGetUser(){
    const { getAccessTokenSilently } = useAuth0();
    //funcion para pedir los datos del usuraior en el backend
    const getUserRequest = async ():Promise<BackEndUser>=>{
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });
        if(!res.ok)
            throw new Error ('Error al obtener los datos del usuario');
        return res.json();
    };// fin de getuserrequest

    return useQuery({
        queryKey: ['users'],
        queryFn: getUserRequest
    }); //fin return
}