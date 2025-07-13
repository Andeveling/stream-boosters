import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { campaignSchema, type CampaignFormValues } from './schemas/campaignSchema';
import { FormField } from '../shared/FormField';
import { FormButton } from '../shared/FormButton';
import { FormLayout } from '../shared/FormLayout';

export const CampaignForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: CampaignFormValues) => {
    // Aquí iría la lógica de envío al backend
    alert('Datos enviados: ' + JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <FormLayout title="Campaña personalizada">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Objetivos de la campaña"
          name="goals"
          value={watch('goals') || ''}
          onChange={register('goals').onChange}
          error={errors.goals}
          placeholder="Describe los objetivos principales"
        />
        <FormField
          label="Público objetivo"
          name="target"
          value={watch('target') || ''}
          onChange={register('target').onChange}
          error={errors.target}
          placeholder="Ejemplo: gamers, jóvenes, etc."
        />
        <FormField
          label="Preferencias de streamer"
          name="streamerPreferences"
          value={watch('streamerPreferences') || ''}
          onChange={register('streamerPreferences').onChange}
          error={errors.streamerPreferences}
          placeholder="Opcional"
        />
        <FormField
          label="Fechas y horario"
          name="schedule"
          value={watch('schedule') || ''}
          onChange={register('schedule').onChange}
          error={errors.schedule}
          placeholder="Opcional"
        />
        <FormField
          label="Requisitos especiales"
          name="requirements"
          value={watch('requirements') || ''}
          onChange={register('requirements').onChange}
          error={errors.requirements}
          placeholder="Opcional"
        />
        <FormButton disabled={isSubmitting}>Enviar</FormButton>
      </form>
    </FormLayout>
  );
}
