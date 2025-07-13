import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormLayout } from '../FormLayout';

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
