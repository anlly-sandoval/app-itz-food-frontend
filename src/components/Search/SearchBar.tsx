"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Field, FieldGroup } from '@/components/ui/field';
import { useEffect } from 'react';


const formSchema = z.object({
    searchQuery: z.string('Nombre del restaurante es requerido')
}); //fin de formSchema

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset? : ()=>void;
    searchQuery?: string;
}

export default function SearchBar({onSubmit, onReset, placeHolder, searchQuery}:Props) {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: ''
        }
    })

    useEffect(()=>{
        form.reset({searchQuery})
    }, [form, searchQuery]
    )//fin de useEffect

    const handleReset = ()=>{
        form.reset({
            searchQuery: ''
        });
        if(onReset)
            onReset();
    }; //fin de handleReset

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className='w-full'>
            <Controller
                name="searchQuery"
                control={form.control}
                render={({field})=>(
                    <Field>
                        <ButtonGroup>
                            <Input
                                {...field}
                                placeholder={placeHolder}
                                id='searchQuery'
                                className='shadow-none text-x1 focus-visible:ring-0 focus-visible:border-orange-500'/>
                                        <Button onClick={handleReset}
                                                type='button'
                                                variant="ghost"
                                                className='rounded-full border-blue-100 ml-2 mr-2'>
                                                    Limpiar
                                                </Button>
                                <Button variant="outline" aria-label='Search' type='submit' className='rounded-full bg-orange-500'>
                                    Buscar <SearchIcon className='text-orange-500'/>
                                </Button>
                        </ButtonGroup>
                    </Field>
                )}
                />
        </FieldGroup>
    </form>
  )
}
