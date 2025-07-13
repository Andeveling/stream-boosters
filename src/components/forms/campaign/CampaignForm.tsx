import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormButton } from '../shared/FormButton';
import { FormField } from '../shared/FormField';
import { FormLayout } from '../shared/FormLayout';
import { Notification } from '../shared/Notification';
import { useFormSubmission } from '../shared/useFormSubmission';
import {
  type CampaignFormValues,
  campaignSchema,
} from './schemas/campaignSchema';

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

  const { isLoading, isSuccess, isError, error, submitForm, resetState } =
    useFormSubmission({
      endpoint: '/campaign_submit.php',
      onSuccess: (data) => {
        console.log('Formulario de campaña enviado exitosamente:', data);
        setShowNotification(true);
        reset();
      },
      onError: (error) => {
        console.error('Error al enviar formulario de campaña:', error);
        setShowNotification(true);
      },
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
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField
          error={errors.campaignName}
          label="Nombre de la campaña"
          name="campaignName"
          onChange={register('campaignName').onChange}
          placeholder="Nombre descriptivo de tu campaña"
          value={watch('campaignName') || ''}
        />
        <FormField
          as="textarea"
          error={errors.objectives}
          label="Objetivos de la campaña"
          name="objectives"
          onChange={register('objectives').onChange}
          placeholder="Describe los objetivos principales de la campaña"
          value={watch('objectives') || ''}
        />
        <FormField
          error={errors.targetAudience}
          label="Público objetivo"
          name="targetAudience"
          onChange={register('targetAudience').onChange}
          placeholder="Ejemplo: gamers, jóvenes de 18-25 años, etc."
          value={watch('targetAudience') || ''}
        />
        <FormField
          error={errors.duration}
          label="Duración de la campaña"
          name="duration"
          onChange={register('duration').onChange}
          placeholder="Ejemplo: 2 semanas, 1 mes, etc."
          value={watch('duration') || ''}
        />
        <FormField
          error={errors.budget}
          label="Presupuesto"
          name="budget"
          onChange={register('budget').onChange}
          placeholder="Opcional - Presupuesto estimado"
          value={watch('budget') || ''}
        />
        <FormField
          as="textarea"
          error={errors.specialRequirements}
          label="Requisitos especiales"
          name="specialRequirements"
          onChange={register('specialRequirements').onChange}
          placeholder="Opcional - Cualquier requisito específico"
          value={watch('specialRequirements') || ''}
        />
        <FormButton disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </FormButton>
      </form>

      {/* Notificaciones */}
      {showNotification && isSuccess && (
        <Notification
          message="Procesaremos tu solicitud y te contactaremos pronto."
          onClose={handleCloseNotification}
          title="¡Campaña enviada correctamente!"
          type="success"
        />
      )}

      {showNotification && isError && (
        <Notification
          message={error || 'Por favor, inténtalo de nuevo.'}
          onClose={handleCloseNotification}
          title="Error al enviar la campaña"
          type="error"
        />
      )}
    </FormLayout>
  );
};
