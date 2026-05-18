import { CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { Controller, useFormContext } from "react-hook-form";
import { type RestaurantFormData } from './RestaurantFormSchema';
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function ImageSection() {
    const { control, watch } = useFormContext<RestaurantFormData>();
    const existingImageUrl = watch("imageUrl")
  return (
    <div className="space-y-2">
        <div>
            <CardTitle className="text-2xl font-bold">
                Imagen
            </CardTitle>
            <CardDescription>
                <div>
                    Agregue una imagen que se mostrara en la seccion de busqueda del listado de restaurantes
                </div>
                <div>
                    Agregar una imagen sustituye una ya existente
                </div>
            </CardDescription>
        </div>
        <CardContent>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {
                    existingImageUrl && (
                        <AspectRatio ratio={16/9}>
                            <img
                                src={existingImageUrl}
                                className="rounded-md object-cover h-full w-full"/>
                        </AspectRatio>
                    )
                }
                <FieldGroup>
                    <Controller
                        control={control}
                        name="imageFile"
                        render={({field, fieldState})=>(
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Nombre del restaurante</FieldLabel>
                                <Input
                                    id="imageFile"
                                    type="file"
                                    accept="image/*"
                                    ref={field.ref}
                                    className='bg-white'
                                    onChange={(event)=>
                                        field.onChange(
                                            event.target.files ? event.target.files[0] : null
                                        )
                                    }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                        errors={[fieldState.error]} />
                                    )}
                            </Field>
                        )}
                        />
                </FieldGroup>
            </div>
        </CardContent>
    </div>
  )
}
