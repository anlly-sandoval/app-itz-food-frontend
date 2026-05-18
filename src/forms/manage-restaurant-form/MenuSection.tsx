import { CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { type RestaurantFormData } from "./RestaurantFormSchema";
import { Field, FieldGroup } from "@/components/ui/field";
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";

export default function MenuSection() {
    const { control } = useFormContext<RestaurantFormData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'menuItems'
    });
  return (
    <div className="space-y-2">
        <div>
            <CardTitle className="text-2xl font-bold">
                Menu del Restaurante
            </CardTitle>
            <CardDescription>
                Crea tu menu y asigna a cada item del menu un nombre y un precio
            </CardDescription>
        </div>
        <CardContent>
            <FieldGroup>
                <Controller
                    control={control}
                    name="menuItems"
                    render={()=>(
                        <Field className="flex flex-col gap-2">
                            {
                                fields.map((_, index)=>(
                                    <MenuItemInput 
                                        key={index}
                                        index={index}
                                        removeMenuItem={()=>remove(index)} />
                                ))
                            }
                        </Field>
                    )}
                    />
            </FieldGroup>
        </CardContent>
        <Button className="bg-black text-white" type="button" onClick={()=>append({ name: "", price: '0'})}>
            Agregar al menu
        </Button>
    </div>
  )
}
