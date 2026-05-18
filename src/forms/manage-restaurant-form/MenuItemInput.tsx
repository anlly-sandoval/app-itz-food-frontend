import { Controller, useFormContext } from "react-hook-form";
import { type RestaurantFormData } from "./RestaurantFormSchema";
import { FieldGroup, Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
    index: number;
    removeMenuItem: ()=> void;
}

export default function MenuItemInput({index, removeMenuItem}: Props) {
    const { control } = useFormContext<RestaurantFormData>();
  return (
    <div className="flex flex-row items-end gap-2">
        <FieldGroup>
            <Controller
                control={control}
                name={`menuItems.${index}.name`}
                render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='flex items-center gap-1'>
                            Nombre
                        </FieldLabel>
                        <FieldGroup>
                            <Input 
                                {...field}
                                placeholder="Hambuerguesa"
                                className='bg-white' />
                        </FieldGroup>
                        { fieldState.invalid && (
                            <FieldError errors={[fieldState.error]}/>
                        )}
                    </Field>
                )}
                />
        </FieldGroup>
        <FieldGroup>
            <Controller
                control={control}
                name={`menuItems.${index}.price`}
                render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='flex items-center gap-1'>
                            Precio ($)
                        </FieldLabel>
                        <FieldGroup>
                            <Input 
                                {...field}
                                placeholder="99.99"
                                className='bg-white' />
                        </FieldGroup>
                        { fieldState.invalid && (
                            <FieldError errors={[fieldState.error]}/>
                        )}
                    </Field>
                )}
                />
        </FieldGroup>
        <Button 
            type="button"
            onClick={removeMenuItem}
            className="bg-red-500 max-h-fit" >
                Eliminar
            </Button>
    </div>
  )
}
