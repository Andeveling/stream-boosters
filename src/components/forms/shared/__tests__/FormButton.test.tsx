import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FormButton } from '../FormButton'

describe('FormButton', () => {
  it('renders button with text', () => {
    render(<FormButton>Click me</FormButton>)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies disabled state correctly', () => {
    render(<FormButton disabled>Disabled Button</FormButton>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<FormButton onClick={handleClick}>Click me</FormButton>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('prevents click when disabled', () => {
    const handleClick = vi.fn()
    render(
      <FormButton disabled onClick={handleClick}>
        Disabled Button
      </FormButton>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<FormButton className="custom-class">Button</FormButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders with correct type attribute', () => {
    render(<FormButton type="submit">Submit</FormButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('applies loading state styles', () => {
    render(<FormButton disabled>Loading...</FormButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('opacity-50')
    expect(button).toBeDisabled()
  })
})
