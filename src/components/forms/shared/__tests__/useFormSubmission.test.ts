import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useFormSubmission } from '../useFormSubmission';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useFormSubmission', () => {
  const mockEndpoint = '/test-endpoint.php';
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  const defaultOptions = {
    endpoint: mockEndpoint,
    onSuccess: mockOnSuccess,
    onError: mockOnError,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useFormSubmission(defaultOptions));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it('handles successful form submission', async () => {
    const mockResponse = {
      status: 'success',
      data: { id: 1, name: 'Test' },
      message: 'Success',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() => useFormSubmission(defaultOptions));

    await act(async () => {
      await result.current.submitForm({ name: 'Test Data' });
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(mockResponse.data);
    expect(mockOnSuccess).toHaveBeenCalledWith(mockResponse.data);
  });

  it('handles HTTP error responses', async () => {
    const mockErrorResponse = {
      status: 'error',
      message: 'Validation failed',
    };

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve(mockErrorResponse),
    });

    const { result } = renderHook(() => useFormSubmission(defaultOptions));

    await act(async () => {
      try {
        await result.current.submitForm({ name: 'Invalid Data' });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('Validation failed');
    expect(result.current.data).toBe(null);
    expect(mockOnError).toHaveBeenCalledWith('Validation failed');
  });

  it('handles network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFormSubmission(defaultOptions));

    await act(async () => {
      try {
        await result.current.submitForm({ name: 'Test Data' });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('Network error');
    expect(mockOnError).toHaveBeenCalledWith('Network error');
  });

  it('sets loading state during submission', async () => {
    // Create a promise that we can control
    let resolvePromise: (value: any) => void;
    const controlledPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockFetch.mockReturnValueOnce(controlledPromise);

    const { result } = renderHook(() => useFormSubmission(defaultOptions));

    // Start submission
    act(() => {
      result.current.submitForm({ name: 'Test Data' });
    });

    // Check loading state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);

    // Resolve the promise
    await act(async () => {
      resolvePromise!({
        ok: true,
        json: () => Promise.resolve({ status: 'success', data: {} }),
      });
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('resets state correctly', () => {
    const { result } = renderHook(() => useFormSubmission(defaultOptions));

    // Set some state manually for testing
    act(() => {
      result.current.resetState();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it('sends correct request with proper headers', async () => {
    const mockResponse = {
      status: 'success',
      data: {},
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() => useFormSubmission(defaultOptions));
    const testData = { name: 'Test', email: 'test@example.com' };

    await act(async () => {
      await result.current.submitForm(testData);
    });

    expect(mockFetch).toHaveBeenCalledWith(mockEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
  });

  it('handles server response with error status', async () => {
    const mockResponse = {
      status: 'error',
      message: 'Server validation error',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() => useFormSubmission(defaultOptions));

    await act(async () => {
      try {
        await result.current.submitForm({ name: 'Test Data' });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('Server validation error');
  });
});
