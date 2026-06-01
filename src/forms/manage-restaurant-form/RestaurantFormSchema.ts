import { z } from 'zod';

const menuItemSchema = z.object({
  name: z.string().min(1, 'El nombre debe tener al menos 1 caracter'),
  price: z.number().min(1, 'El precio debe ser mayor a 0'),
});

export const formSchema = z.object({
  restaurantName: z.string().min(1, 'El nombre del restaurante es requerido').trim(),
  city: z.string().min(1, 'El nombre de la ciudad es requerido').trim(),
  country: z.string().min(1, 'El nombre del país es requerido').trim(),
  deliveryPrice: z.number().min(1, 'El precio de entrega debe ser mayor a 0'),
  estimatedDeliveryTime: z.number().min(1, 'El tiempo estimado debe ser mayor a 0'),
  cuisines: z.array(z.string()).nonempty({ message: 'Selecciona al menos una cocina' }),
  menuItems: z.array(menuItemSchema),
  imagenFile: z.custom<File>(
    (val) => !val || (typeof File !== 'undefined' && val instanceof File),
    { message: 'La imagen es requerida' }
  ).optional(),
  imagenUrl: z.string().optional(),
}).refine(
  (data) => data.imagenUrl || data.imagenFile,
  {
    message: 'Se debe proporcionar un archivo de imagen o una URL de imagen',
    path: ['imagenFile'],
  }
);

export type RestaurantFromData = z.infer<typeof formSchema>;