import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Notification } from '../Notification'

describe('Notification', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders notification with title', () => {
    render(
      <Notification
        type="success"
        title="Success Message"
      />
    )

    expect(screen.getByText('Success Message')).toBeInTheDocument()
  })

  it('renders notification with message', () => {
    render(
      <Notification
        type="info"
        title="Title"
        message="This is a detailed message"
      />
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('This is a detailed message')).toBeInTheDocument()
  })

  it('renders children when provided', () => {
    render(
      <Notification
        type="warning"
        title="Warning"
      >
        <div>Custom content</div>
      </Notification>
    )

    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('applies correct styling for success type', () => {
    const { container } = render(
      <Notification
        type="success"
        title="Success"
      />
    )

    const notification = container.firstChild as HTMLElement
    expect(notification).toHaveClass('bg-green-50', 'border-green-200', 'text-green-800')
  })

  it('applies correct styling for error type', () => {
    const { container } = render(
      <Notification
        type="error"
        title="Error"
      />
    )

    const notification = container.firstChild as HTMLElement
    expect(notification).toHaveClass('bg-red-50', 'border-red-200', 'text-red-800')
  })

  it('applies correct styling for warning type', () => {
    const { container } = render(
      <Notification
        type="warning"
        title="Warning"
      />
    )

    const notification = container.firstChild as HTMLElement
    expect(notification).toHaveClass('bg-yellow-50', 'border-yellow-200', 'text-yellow-800')
  })

  it('applies correct styling for info type', () => {
    const { container } = render(
      <Notification
        type="info"
        title="Info"
      />
    )

    const notification = container.firstChild as HTMLElement
    expect(notification).toHaveClass('bg-blue-50', 'border-blue-200', 'text-blue-800')
  })

  it('shows close button when onClose is provided', () => {
    const handleClose = vi.fn()
    render(
      <Notification
        type="success"
        title="Success"
        onClose={handleClose}
      />
    )

    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()
    expect(closeButton).toHaveAttribute('aria-label', undefined) // Should have sr-only text
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()
    render(
      <Notification
        type="success"
        title="Success"
        onClose={handleClose}
      />
    )

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not show close button when onClose is not provided', () => {
    render(
      <Notification
        type="success"
        title="Success"
      />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('auto-closes after default duration', () => {
    const handleClose = vi.fn()
    render(
      <Notification
        type="success"
        title="Success"
        onClose={handleClose}
        autoClose={true}
      />
    )

    // Fast-forward time by default duration (5000ms)
    vi.advanceTimersByTime(5000)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('auto-closes after custom duration', () => {
    const handleClose = vi.fn()
    render(
      <Notification
        type="success"
        title="Success"
        onClose={handleClose}
        autoClose={true}
        duration={3000}
      />
    )

    // Fast-forward time by custom duration (3000ms)
    vi.advanceTimersByTime(3000)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not auto-close when autoClose is false', () => {
    const handleClose = vi.fn()
    render(
      <Notification
        type="success"
        title="Success"
        onClose={handleClose}
        autoClose={false}
      />
    )

    // Fast-forward time
    vi.advanceTimersByTime(10000)

    expect(handleClose).not.toHaveBeenCalled()
  })

  it('renders correct icon for success type', () => {
    const { container } = render(
      <Notification
        type="success"
        title="Success"
      />
    )

    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('text-green-400')
  })

  it('renders correct icon for error type', () => {
    const { container } = render(
      <Notification
        type="error"
        title="Error"
      />
    )

    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('text-red-400')
  })

  it('has proper accessibility attributes', () => {
    render(
      <Notification
        type="success"
        title="Success"
        onClose={vi.fn()}
      />
    )

    const closeButton = screen.getByRole('button')
    expect(screen.getByText('Cerrar')).toHaveClass('sr-only')
  })

  it('applies fade-in animation class', () => {
    const { container } = render(
      <Notification
        type="success"
        title="Success"
      />
    )

    const notification = container.firstChild as HTMLElement
    expect(notification).toHaveClass('animate-fade-in')
  })
})
