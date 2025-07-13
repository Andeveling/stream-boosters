import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { FieldError } from 'react-hook-form'
import { FormField } from '../FormField'

describe('FormField', () => {
  const mockError: FieldError = {
    type: 'required',
    message: 'This field is required'
  }

  it('renders input field with label', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
      />
    )
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays error message when provided', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
        error={mockError}
      />
    )
    
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-brand-red')
  })

  it('renders as textarea when specified', () => {
    render(
      <FormField
        label="Description"
        name="description"
        value=""
        onChange={vi.fn()}
        as="textarea"
      />
    )
    
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox').tagName.toLowerCase()).toBe('textarea')
  })

  it('handles input changes', () => {
    const handleChange = vi.fn()
    render(
      <FormField
        label="Name"
        name="name"
        value=""
        onChange={handleChange}
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'John Doe' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('applies placeholder correctly', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
        placeholder="Enter your email"
      />
    )
    
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  it('sets input type correctly', () => {
    render(
      <FormField
        label="Password"
        name="password"
        type="password"
        value=""
        onChange={vi.fn()}
      />
    )
    
    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('applies correct styling for error state', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
        error={mockError}
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-brand-red')
    expect(input).toHaveClass('focus:ring-brand-red/50')
  })

  it('applies correct styling for normal state', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-brand-card')
    expect(input).toHaveClass('focus:border-brand-pink')
  })
})
