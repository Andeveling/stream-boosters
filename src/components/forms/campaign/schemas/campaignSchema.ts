import { z } from 'zod';

export const campaignSchema = z.object({
  goals: z.string().min(5, 'Describe los objetivos de la campaña'),
  target: z.string().min(3, 'Indica el público objetivo'),
  streamerPreferences: z.string().optional(),
  schedule: z.string().optional(),
  requirements: z.string().optional(),
});

export type CampaignFormValues = z.infer<typeof campaignSchema>;
