import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormSelect } from '../FormSelect';

describe('FormSelect', () => {
  const options = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
  ];

  it('renders options and label correctly', () => {
    const { getByText, getByLabelText } = render(
      <FormSelect
        label="Selecciona una opción"
        name="test-select"
        onChange={() => {}}
        options={options}
        value="opcion1"
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
        onChange={handleChange}
        options={options}
        value="opcion1"
      />
    );
    fireEvent.change(getByRole('combobox'), { target: { value: 'opcion2' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
