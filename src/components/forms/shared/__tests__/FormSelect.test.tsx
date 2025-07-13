import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { FormSelect } from '../FormSelect';

describe('FormSelect', () => {
  const options = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' }
  ];

  it('renders options and label correctly', () => {
    const { getByText, getByLabelText } = render(
      <FormSelect
        label="Selecciona una opción"
        name="test-select"
        value="opcion1"
        onChange={() => {}}
        options={options}
      />
    );
    expect(getByLabelText('Selecciona una opción')).toBeInTheDocument();
    expect(getByText('Opción 1')).toBeInTheDocument();
    expect(getByText('Opción 2')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <FormSelect
        label="Selecciona una opción"
        name="test-select"
        value="opcion1"
        onChange={handleChange}
        options={options}
      />
    );
    fireEvent.change(getByRole('combobox'), { target: { value: 'opcion2' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
