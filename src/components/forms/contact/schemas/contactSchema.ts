import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  projectType: z.enum(['marca', 'videojuego', 'producto'], {
    errorMap: () => ({ message: 'Selecciona el tipo de proyecto' })
  }),
  budget: z.string().optional(),
  description: z.string().min(10, 'Describe brevemente tu proyecto'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
