import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from './schemas/contactSchema';
import { FormField } from '../shared/FormField';
import { FormSelect } from '../shared/FormSelect';
import { FormButton } from '../shared/FormButton';
import { FormLayout } from '../shared/FormLayout';

const projectTypes = [
  { value: 'marca', label: 'Marca' },
  { value: 'videojuego', label: 'Videojuego' },
  { value: 'producto', label: 'Producto' },
];

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Aquí iría la lógica de envío al backend
    alert('Datos enviados: ' + JSON.stringify(data, null, 2));
    reset();
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
        <FormButton disabled={isSubmitting}>Enviar</FormButton>
      </form>
    </FormLayout>
  );
}
