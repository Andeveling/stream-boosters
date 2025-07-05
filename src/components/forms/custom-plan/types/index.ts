// Tipos para el formulario de plan personalizado
export type FlowType = 'videogame' | 'brand';

export type DurationType = '1week' | '2weeks' | '1month' | 'custom';

export type PromotionType = 'product_showcase' | 'brand_awareness' | 'sponsorship' | 'event';

export type SimulcastType = 'yes' | 'no';

// Formulario de Videojuego
export interface VideogameFormData {
  videogame_description: string;
  simulcast: SimulcastType;
  videogame_streamers: number;
  videogame_duration: DurationType;
}

// Formulario de Marca
export interface BrandFormData {
  brand_description: string;
  brand_promotion_type: PromotionType;
  brand_streamers: number;
  brand_duration: DurationType;
}

// Unión de ambos tipos
export type FormData = VideogameFormData | BrandFormData;

// Estado del stepper
export interface StepperState {
  currentStep: number;
  totalSteps: number;
  flowType: FlowType | null;
  isValid: boolean;
  isSubmitting: boolean;
}

// Props de componentes
export interface StepProps {
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

// Estados de la API
export interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  data?: any;
}

// Configuración de pasos
export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  isOptional?: boolean;
}
