import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from './schemas/contactSchema';
import { FormField } from '../shared/FormField';
import { FormSelect } from '../shared/FormSelect';
import { FormButton } from '../shared/FormButton';
import { FormLayout } from '../shared/FormLayout';
import { useFormSubmission } from '../shared/useFormSubmission';
import { Notification } from '../shared/Notification';

const projectTypes = [
  { value: 'marca', label: 'Marca' },
  { value: 'videojuego', label: 'Videojuego' },
  { value: 'producto', label: 'Producto' },
];

export const ContactForm: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const { isLoading, isSuccess, isError, error, submitForm, resetState } = useFormSubmission({
    endpoint: '/contact_submit.php',
    onSuccess: (data) => {
      console.log('Formulario de contacto enviado exitosamente:', data);
      setShowNotification(true);
      reset();
    },
    onError: (error) => {
      console.error('Error al enviar formulario de contacto:', error);
      setShowNotification(true);
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
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
    <FormLayout title="Contacto inicial">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Nombre"
          name="name"
          value={watch('name') || ''}
          onChange={register('name').onChange}
          error={errors.name}
          placeholder="Tu nombre completo"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={watch('email') || ''}
          onChange={register('email').onChange}
          error={errors.email}
          placeholder="ejemplo@email.com"
        />
        <FormField
          label="Empresa"
          name="company"
          value={watch('company') || ''}
          onChange={register('company').onChange}
          error={errors.company}
          placeholder="Opcional"
        />
        <FormSelect
          label="Tipo de proyecto"
          name="projectType"
          value={watch('projectType') || ''}
          onChange={register('projectType').onChange}
          options={projectTypes}
          error={errors.projectType}
          placeholder="Selecciona una opción"
        />
        <FormField
          label="Presupuesto estimado"
          name="budget"
          value={watch('budget') || ''}
          onChange={register('budget').onChange}
          error={errors.budget}
          placeholder="Opcional"
        />
        <FormField
          label="Descripción breve"
          name="description"
          as="textarea"
          value={watch('description') || ''}
          onChange={register('description').onChange}
          error={errors.description}
          placeholder="Describe tu proyecto"
        />
        <FormButton disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </FormButton>
      </form>

      {/* Notificaciones */}
      {showNotification && isSuccess && (
        <Notification
          type="success"
          title="¡Formulario enviado correctamente!"
          message="Nos pondremos en contacto contigo pronto."
          onClose={handleCloseNotification}
        />
      )}

      {showNotification && isError && (
        <Notification
          type="error"
          title="Error al enviar el formulario"
          message={error || 'Por favor, inténtalo de nuevo.'}
          onClose={handleCloseNotification}
        />
      )}
    </FormLayout>
  );
}
