import { formSchema, type RestaurantFormData } from "./RestaurantFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import DetailsSection from "./DetailsSection";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import type { Restaurante } from "@/api/types";
import { useEffect } from "react";

type Props = {
    restaurante?: Restaurante
    onSave: (restaurantFormData: FormData)=>void;
    isLoading: boolean;
}

export default function ManageRestaurantForm({onSave, isLoading, restaurante}: Props) {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            restauranteName: "",
            city: "Zacatecas",
            country: "Mexico",
            deliveryPrice: "100",
            estimatedDeliveryTime: "30",
            cuisines: [],
            menuItems: [{name: "", price: "0.00"}],
        }
    });

    //useEffect para cargar los datos del restaurante en el formulario
    useEffect(()=>{
        if(!restaurante)
            return;

        //cargamos los datos del restaurante extraidos del backend en el formulario
        form.reset(restaurante);

    }, [form, restaurante]); // fin de useeffect

    //funcion para procesar los datos del usuario
    const onSubmit = (formDataJson: RestaurantFormData)=>{
        //console.log(formData);
        //convertimos los datos
        const formData = new FormData();

        formData.append("restauranteName", formDataJson.restauranteName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());

        //procesamos el arreglo de cocinas
        formDataJson.cuisines.forEach(
            (cuisine, index)=>{
                formData.append(`cuisines[${index}]`, cuisine)
            }
        )

        //procesamos el arreglo de los items del menu
        formDataJson.menuItems.forEach(
            (MenuItem, index)=>{
                formData.append(`menuItems[${index}][name]`, MenuItem.name)
                formData.append(`menuItems[${index}][price]`, MenuItem.price.toString())
            }
        );

        //verificamos que exista la imagen para un nuevp restaurante
        if(formDataJson.imageFile){
            //procesamos la imagen del restaurante
            formData.append("imageFile", formDataJson.imageFile ||"")
        }

        //enviamos los datos al backend
        onSave(formData);
    }; //fin de onSubmit

  return (
    <Card>
        <FormProvider {...form}>
        <form id="manage-restaurant-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
            <DetailsSection/>
            <Separator/>
            <CuisinesSection/>
            <Separator/>
            <MenuSection/>
            <Separator/>
            <ImageSection/>
            {
                isLoading ? <LoadingButton/> : <Button className='bg-black text-white' type="submit">Guardar</Button>
            }
        </form>
        </FormProvider>
    </Card>
  )
}
