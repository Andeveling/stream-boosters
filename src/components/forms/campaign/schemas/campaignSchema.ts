import { z } from 'zod';

export const campaignSchema = z.object({
  campaignName: z.string().min(3, 'El nombre de la campaña es requerido'),
  objectives: z.string().min(10, 'Describe los objetivos de la campaña'),
  targetAudience: z.string().min(3, 'Indica el público objetivo'),
  duration: z.string().min(3, 'Indica la duración de la campaña'),
  budget: z.string().optional(),
  streamerPreferences: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
  specialRequirements: z.string().optional(),
});

export type CampaignFormValues = z.infer<typeof campaignSchema>;
