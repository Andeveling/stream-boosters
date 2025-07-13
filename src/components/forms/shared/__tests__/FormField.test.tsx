import { fireEvent, render, screen } from '@testing-library/react';
import type { FieldError } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { FormField } from '../FormField';

describe('FormField', () => {
  const mockError: FieldError = {
    type: 'required',
    message: 'This field is required',
  };

  it('renders input field with label', () => {
    render(
      <FormField label="Email" name="email" onChange={vi.fn()} value="" />
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(
      <FormField
        error={mockError}
        label="Email"
        name="email"
        onChange={vi.fn()}
        value=""
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-brand-red');
  });

  it('renders as textarea when specified', () => {
    render(
      <FormField
        as="textarea"
        label="Description"
        name="description"
        onChange={vi.fn()}
        value=""
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox').tagName.toLowerCase()).toBe('textarea');
  });

  it('handles input changes', () => {
    const handleChange = vi.fn();
    render(
      <FormField label="Name" name="name" onChange={handleChange} value="" />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John Doe' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies placeholder correctly', () => {
    render(
      <FormField
        label="Email"
        name="email"
        onChange={vi.fn()}
        placeholder="Enter your email"
        value=""
      />
    );

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('sets input type correctly', () => {
    render(
      <FormField
        label="Password"
        name="password"
        onChange={vi.fn()}
        type="password"
        value=""
      />
    );

    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies correct styling for error state', () => {
    render(
      <FormField
        error={mockError}
        label="Email"
        name="email"
        onChange={vi.fn()}
        value=""
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-brand-red');
    expect(input).toHaveClass('focus:ring-brand-red/50');
  });

  it('applies correct styling for normal state', () => {
    render(
      <FormField label="Email" name="email" onChange={vi.fn()} value="" />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-brand-card');
    expect(input).toHaveClass('focus:border-brand-pink');
  });
});
