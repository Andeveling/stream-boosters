import { z } from 'zod';

export const videogameSchema = z.object({
  videogame_description: z.string().min(5, 'La descripción es obligatoria.'),
  simulcast: z.enum(['yes', 'no'], { required_error: 'Selecciona una opción' }),
  videogame_streamers: z.coerce.number().min(1, 'Debe ser al menos 1'),
  videogame_duration: z.enum(['1week', '2weeks', '1month', 'custom'], { required_error: 'Selecciona la duración' }),
});

export const brandSchema = z.object({
  brand_description: z.string().min(5, 'La descripción es obligatoria.'),
  brand_promotion_type: z.enum(['product_showcase', 'brand_awareness', 'sponsorship', 'event'], { required_error: 'Selecciona el tipo de promoción' }),
  brand_streamers: z.coerce.number().min(1, 'Debe ser al menos 1'),
  brand_duration: z.enum(['1week', '2weeks', '1month', 'custom'], { required_error: 'Selecciona la duración' }),
});

export type VideogameForm = z.infer<typeof videogameSchema>;
export type BrandForm = z.infer<typeof brandSchema>;
