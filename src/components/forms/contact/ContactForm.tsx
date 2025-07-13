import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormButton } from '../shared/FormButton';
import { FormField } from '../shared/FormField';
import { FormLayout } from '../shared/FormLayout';
import { FormSelect } from '../shared/FormSelect';
import { Notification } from '../shared/Notification';
import { useFormSubmission } from '../shared/useFormSubmission';
import { type ContactFormValues, contactSchema } from './schemas/contactSchema';

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

  const { isLoading, isSuccess, isError, error, submitForm, resetState } =
    useFormSubmission({
      endpoint: '/contact_submit.php',
      onSuccess: (data) => {
        console.log('Formulario de contacto enviado exitosamente:', data);
        setShowNotification(true);
        reset();
      },
      onError: (error) => {
        console.error('Error al enviar formulario de contacto:', error);
        setShowNotification(true);
      },
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
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField
          error={errors.name}
          label="Nombre"
          name="name"
          onChange={register('name').onChange}
          placeholder="Tu nombre completo"
          value={watch('name') || ''}
        />
        <FormField
          error={errors.email}
          label="Email"
          name="email"
          onChange={register('email').onChange}
          placeholder="ejemplo@email.com"
          type="email"
          value={watch('email') || ''}
        />
        <FormField
          error={errors.company}
          label="Empresa"
          name="company"
          onChange={register('company').onChange}
          placeholder="Opcional"
          value={watch('company') || ''}
        />
        <FormSelect
          error={errors.projectType}
          label="Tipo de proyecto"
          name="projectType"
          onChange={register('projectType').onChange}
          options={projectTypes}
          placeholder="Selecciona una opción"
          value={watch('projectType') || ''}
        />
        <FormField
          error={errors.budget}
          label="Presupuesto estimado"
          name="budget"
          onChange={register('budget').onChange}
          placeholder="Opcional"
          value={watch('budget') || ''}
        />
        <FormField
          as="textarea"
          error={errors.description}
          label="Descripción breve"
          name="description"
          onChange={register('description').onChange}
          placeholder="Describe tu proyecto"
          value={watch('description') || ''}
        />
        <FormButton disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </FormButton>
      </form>

      {/* Notificaciones */}
      {showNotification && isSuccess && (
        <Notification
          message="Nos pondremos en contacto contigo pronto."
          onClose={handleCloseNotification}
          title="¡Formulario enviado correctamente!"
          type="success"
        />
      )}

      {showNotification && isError && (
        <Notification
          message={error || 'Por favor, inténtalo de nuevo.'}
          onClose={handleCloseNotification}
          title="Error al enviar el formulario"
          type="error"
        />
      )}
    </FormLayout>
  );
};
