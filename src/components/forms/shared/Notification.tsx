import type { ReactNode } from 'react';

export interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  children?: ReactNode;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function Notification({
  type,
  title,
  message,
  children,
  onClose,
  autoClose = true,
  duration = 5000,
}: NotificationProps) {
  // Auto close effect
  if (autoClose && onClose) {
    setTimeout(() => {
      onClose();
    }, duration);
  }

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
      default:
        return 'text-blue-400';
    }
  };

  const getIcon = () => {
    const iconColorClass = getIconColor();

    switch (type) {
      case 'success':
        return (
          <svg
            className={`h-5 w-5 ${iconColorClass}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              fillRule="evenodd"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className={`h-5 w-5 ${iconColorClass}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              fillRule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className={`h-5 w-5 ${iconColorClass}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              fillRule="evenodd"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg
            className={`h-5 w-5 ${iconColorClass}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              fillRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`rounded-lg border p-4 shadow-sm transition-all duration-300 ${getTypeStyles()}animate-fade-in `}
    >
      <div className="flex">
        <div className={`flex-shrink-0 ${getIconColor()}`}>{getIcon()}</div>
        <div className="ml-3 flex-1">
          <h3 className="font-semibold text-sm">{title}</h3>
          {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
          {children && <div className="mt-2">{children}</div>}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                aria-label="Cerrar notificación"
                className={`inline-flex rounded-md p-1.5 transition-opacity duration-200 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 ${type === 'success' ? 'text-green-500 focus:ring-green-600' : ''} ${type === 'error' ? 'text-red-500 focus:ring-red-600' : ''} ${type === 'warning' ? 'text-yellow-500 focus:ring-yellow-600' : ''} ${type === 'info' ? 'text-blue-500 focus:ring-blue-600' : ''} `}
                onClick={onClose}
                type="button"
              >
                <span className="sr-only">Cerrar</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
