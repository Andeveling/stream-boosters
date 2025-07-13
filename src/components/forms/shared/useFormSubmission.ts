import { useState } from 'react';

export interface SubmissionState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: any | null;
}

export interface UseFormSubmissionOptions {
  endpoint: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useFormSubmission(options: UseFormSubmissionOptions) {
  const [state, setState] = useState<SubmissionState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    data: null,
  });

  const resetState = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
    });
  };

  const submitForm = async (formData: any) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      isError: false,
      error: null,
    }));

    try {
      const response = await fetch(options.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Error HTTP: ${response.status}`);
      }

      if (result.status !== 'success') {
        throw new Error(
          result.message || 'Error en el procesamiento del formulario'
        );
      }

      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        data: result.data,
      });

      options.onSuccess?.(result.data);

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      setState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: errorMessage,
        data: null,
      });

      options.onError?.(errorMessage);

      throw error;
    }
  };

  return {
    ...state,
    submitForm,
    resetState,
  };
}
