import { describe, it, expect } from 'vitest';
import { FormLayout } from '../FormLayout';
import { render } from '@testing-library/react';

describe('FormLayout', () => {
  it('renders children and title correctly', () => {
    const { getByText } = render(
      <FormLayout title="Título de prueba">
        <div>Contenido de prueba</div>
      </FormLayout>
    );
    expect(getByText('Título de prueba')).toBeInTheDocument();
    expect(getByText('Contenido de prueba')).toBeInTheDocument();
  });
});
