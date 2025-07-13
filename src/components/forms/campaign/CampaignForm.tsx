import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { campaignSchema, type CampaignFormValues } from './schemas/campaignSchema';
import { FormField } from '../shared/FormField';
import { FormButton } from '../shared/FormButton';
import { FormLayout } from '../shared/FormLayout';
import { useFormSubmission } from '../shared/useFormSubmission';
import { Notification } from '../shared/Notification';

export const CampaignForm: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    mode: 'onBlur',
  });

  const { isLoading, isSuccess, isError, error, submitForm, resetState } = useFormSubmission({
    endpoint: '/campaign_submit.php',
    onSuccess: (data) => {
      console.log('Formulario de campaña enviado exitosamente:', data);
      setShowNotification(true);
      reset();
    },
    onError: (error) => {
      console.error('Error al enviar formulario de campaña:', error);
      setShowNotification(true);
    }
  });

  const onSubmit = async (data: CampaignFormValues) => {
    try {
      resetState(); // Limpiar estado anterior
      await submitForm(data);
    } catch (error) {
      // Error ya manejado en useFormSubmission
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    resetState();
  };

  return (
    <FormLayout title="Campaña personalizada">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Nombre de la campaña"
          name="campaignName"
          value={watch('campaignName') || ''}
          onChange={register('campaignName').onChange}
          error={errors.campaignName}
          placeholder="Nombre descriptivo de tu campaña"
        />
        <FormField
          label="Objetivos de la campaña"
          name="objectives"
          as="textarea"
          value={watch('objectives') || ''}
          onChange={register('objectives').onChange}
          error={errors.objectives}
          placeholder="Describe los objetivos principales de la campaña"
        />
        <FormField
          label="Público objetivo"
          name="targetAudience"
          value={watch('targetAudience') || ''}
          onChange={register('targetAudience').onChange}
          error={errors.targetAudience}
          placeholder="Ejemplo: gamers, jóvenes de 18-25 años, etc."
        />
        <FormField
          label="Duración de la campaña"
          name="duration"
          value={watch('duration') || ''}
          onChange={register('duration').onChange}
          error={errors.duration}
          placeholder="Ejemplo: 2 semanas, 1 mes, etc."
        />
        <FormField
          label="Presupuesto"
          name="budget"
          value={watch('budget') || ''}
          onChange={register('budget').onChange}
          error={errors.budget}
          placeholder="Opcional - Presupuesto estimado"
        />
        <FormField
          label="Requisitos especiales"
          name="specialRequirements"
          as="textarea"
          value={watch('specialRequirements') || ''}
          onChange={register('specialRequirements').onChange}
          error={errors.specialRequirements}
          placeholder="Opcional - Cualquier requisito específico"
        />
        <FormButton disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </FormButton>
      </form>

      {/* Notificaciones */}
      {showNotification && isSuccess && (
        <Notification
          type="success"
          title="¡Campaña enviada correctamente!"
          message="Procesaremos tu solicitud y te contactaremos pronto."
          onClose={handleCloseNotification}
        />
      )}

      {showNotification && isError && (
        <Notification
          type="error"
          title="Error al enviar la campaña"
          message={error || 'Por favor, inténtalo de nuevo.'}
          onClose={handleCloseNotification}
        />
      )}
    </FormLayout>
  );
}
