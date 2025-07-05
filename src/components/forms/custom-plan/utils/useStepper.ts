import { useState, useCallback } from 'react';
import type { FlowType, StepperState } from '../types';
import { getTotalSteps, isStepComplete } from './index';

interface UseStepperOptions {
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFlowTypeChange?: (flowType: FlowType) => void;
}

export const useStepper = (options: UseStepperOptions = {}) => {
  const { initialStep = 0, onStepChange, onFlowTypeChange } = options;

  const [state, setState] = useState<StepperState>({
    currentStep: initialStep,
    totalSteps: 0,
    flowType: null,
    isValid: false,
    isSubmitting: false
  });

  // Establecer el tipo de flujo y reiniciar el stepper
  const setFlowType = useCallback((flowType: FlowType) => {
    const totalSteps = getTotalSteps(flowType);
    setState(prev => ({
      ...prev,
      flowType,
      totalSteps,
      currentStep: 0,
      isValid: false
    }));
    onFlowTypeChange?.(flowType);
    onStepChange?.(0);
  }, [onFlowTypeChange, onStepChange]);

  // Ir al siguiente paso
  const goToNext = useCallback(() => {
    setState(prev => {
      if (prev.currentStep < prev.totalSteps - 1) {
        const nextStep = prev.currentStep + 1;
        onStepChange?.(nextStep);
        return {
          ...prev,
          currentStep: nextStep
        };
      }
      return prev;
    });
  }, [onStepChange]);

  // Ir al paso anterior
  const goToPrevious = useCallback(() => {
    setState(prev => {
      if (prev.currentStep > 0) {
        const prevStep = prev.currentStep - 1;
        onStepChange?.(prevStep);
        return {
          ...prev,
          currentStep: prevStep
        };
      }
      return prev;
    });
  }, [onStepChange]);

  // Ir a un paso específico
  const goToStep = useCallback((step: number) => {
    setState(prev => {
      if (step >= 0 && step < prev.totalSteps) {
        onStepChange?.(step);
        return {
          ...prev,
          currentStep: step
        };
      }
      return prev;
    });
  }, [onStepChange]);

  // Validar el paso actual
  const validateCurrentStep = useCallback((formData: any) => {
    if (!state.flowType) return false;
    
    const isComplete = isStepComplete(formData, state.flowType, state.currentStep);
    setState(prev => ({
      ...prev,
      isValid: isComplete
    }));
    
    return isComplete;
  }, [state.flowType, state.currentStep]);

  // Establecer estado de submitting
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setState(prev => ({
      ...prev,
      isSubmitting
    }));
  }, []);

  // Reset del stepper
  const reset = useCallback(() => {
    setState({
      currentStep: initialStep,
      totalSteps: 0,
      flowType: null,
      isValid: false,
      isSubmitting: false
    });
  }, [initialStep]);

  // Getters computados
  const isFirstStep = state.currentStep === 0;
  const isLastStep = state.currentStep === state.totalSteps - 1;
  const progress = state.totalSteps > 0 ? ((state.currentStep + 1) / state.totalSteps) * 100 : 0;

  return {
    // Estado
    ...state,
    
    // Getters computados
    isFirstStep,
    isLastStep,
    progress,
    
    // Acciones
    setFlowType,
    goToNext,
    goToPrevious,
    goToStep,
    validateCurrentStep,
    setSubmitting,
    reset
  };
};
