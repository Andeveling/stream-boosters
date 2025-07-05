import { z } from 'zod';
import type { DurationType, PromotionType, SimulcastType } from '../types';

// Esquemas base para tipos
export const simulcastSchema = z.enum(['yes', 'no'] as const, {
  required_error: 'Selecciona una opción'
});

export const durationSchema = z.enum(['1week', '2weeks', '1month', 'custom'] as const, {
  required_error: 'Selecciona la duración de la campaña'
});

export const promotionTypeSchema = z.enum(['product_showcase', 'brand_awareness', 'sponsorship', 'event'] as const, {
  required_error: 'Selecciona el tipo de promoción'
});

// Esquema para formulario de videojuego
export const videogameSchema = z.object({
  videogame_description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  
  simulcast: simulcastSchema,
  
  videogame_streamers: z
    .number({ required_error: 'Especifica el número de streamers' })
    .min(1, 'Debe ser al menos 1 streamer')
    .max(50, 'Máximo 50 streamers por campaña'),
  
  videogame_duration: durationSchema
});

// Esquema para formulario de marca
export const brandSchema = z.object({
  brand_description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  
  brand_promotion_type: promotionTypeSchema,
  
  brand_streamers: z
    .number({ required_error: 'Especifica el número de streamers' })
    .min(1, 'Debe ser al menos 1 streamer')
    .max(50, 'Máximo 50 streamers por campaña'),
  
  brand_duration: durationSchema
});

// Esquemas para validación por pasos (videojuego)
export const videogameStep1Schema = z.object({
  videogame_description: videogameSchema.shape.videogame_description
});

export const videogameStep2Schema = z.object({
  simulcast: videogameSchema.shape.simulcast
});

export const videogameStep3Schema = z.object({
  videogame_streamers: videogameSchema.shape.videogame_streamers
});

export const videogameStep4Schema = z.object({
  videogame_duration: videogameSchema.shape.videogame_duration
});

// Esquemas para validación por pasos (marca)
export const brandStep1Schema = z.object({
  brand_description: brandSchema.shape.brand_description
});

export const brandStep2Schema = z.object({
  brand_promotion_type: brandSchema.shape.brand_promotion_type
});

export const brandStep3Schema = z.object({
  brand_streamers: brandSchema.shape.brand_streamers
});

export const brandStep4Schema = z.object({
  brand_duration: brandSchema.shape.brand_duration
});

// Mapeo de esquemas por paso
export const stepSchemas = {
  videogame: [
    videogameStep1Schema,
    videogameStep2Schema,
    videogameStep3Schema,
    videogameStep4Schema
  ],
  brand: [
    brandStep1Schema,
    brandStep2Schema,
    brandStep3Schema,
    brandStep4Schema
  ]
};

// Tipos inferidos de los esquemas
export type VideogameFormData = z.infer<typeof videogameSchema>;
export type BrandFormData = z.infer<typeof brandSchema>;
export type FormData = VideogameFormData | BrandFormData;
