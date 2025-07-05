import type { FlowType, DurationType, PromotionType } from '../types';

// Configuraciones de opciones para selects
export const DURATION_OPTIONS = [
  { value: '1week' as DurationType, label: '1 Semana' },
  { value: '2weeks' as DurationType, label: '2 Semanas' },
  { value: '1month' as DurationType, label: '1 Mes' },
  { value: 'custom' as DurationType, label: 'Personalizado' }
];

export const PROMOTION_TYPE_OPTIONS = [
  { value: 'product_showcase' as PromotionType, label: 'Mostrar Producto' },
  { value: 'brand_awareness' as PromotionType, label: 'Awareness' },
  { value: 'sponsorship' as PromotionType, label: 'Sponsorship' },
  { value: 'event' as PromotionType, label: 'Evento' }
];

export const SIMULCAST_OPTIONS = [
  { value: 'yes', label: 'Sí' },
  { value: 'no', label: 'No' }
];

// Configuración de pasos por flow
export const FLOW_STEPS = {
  videogame: [
    { id: 'description', title: 'Describamos brevemente tu videojuego' },
    { id: 'simulcast', title: '¿Te gustaría una transmisión simultánea con varios streamers?' },
    { id: 'streamers', title: '¿Con cuántos streamers te gustaría contar?' },
    { id: 'duration', title: '¿Cuánto tiempo deseas que tu campaña se muestre?' }
  ],
  brand: [
    { id: 'description', title: 'Descríbenos brevemente tu Marca' },
    { id: 'promotion', title: '¿Qué tipo de promoción buscas?' },
    { id: 'streamers', title: '¿Con cuántos streamers te gustaría contar?' },
    { id: 'duration', title: '¿Cuánto tiempo deseas que tu campaña se muestre?' }
  ]
};

// Utilidad para obtener el número total de pasos
export const getTotalSteps = (flowType: FlowType): number => {
  return FLOW_STEPS[flowType].length;
};

// Utilidad para obtener información del paso actual
export const getStepInfo = (flowType: FlowType, stepIndex: number) => {
  const steps = FLOW_STEPS[flowType];
  return steps[stepIndex] || null;
};

// Utilidad para formatear datos para envío
export const formatFormDataForSubmission = (formData: any, flowType: FlowType) => {
  return {
    flow_type: flowType,
    timestamp: new Date().toISOString(),
    ...formData
  };
};

// Utilidad para manejo de errores de API
export const handleApiError = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
};

// Utilidad para validar si un paso está completo
export const isStepComplete = (formData: any, flowType: FlowType, stepIndex: number): boolean => {
  const stepId = FLOW_STEPS[flowType][stepIndex]?.id;
  
  switch (stepId) {
    case 'description':
      return flowType === 'videogame' 
        ? !!formData.videogame_description?.trim()
        : !!formData.brand_description?.trim();
    
    case 'simulcast':
      return !!formData.simulcast;
    
    case 'promotion':
      return !!formData.brand_promotion_type;
    
    case 'streamers':
      return flowType === 'videogame'
        ? !!formData.videogame_streamers && formData.videogame_streamers > 0
        : !!formData.brand_streamers && formData.brand_streamers > 0;
    
    case 'duration':
      return flowType === 'videogame'
        ? !!formData.videogame_duration
        : !!formData.brand_duration;
    
    default:
      return false;
  }
};

// Utilidad para generar el endpoint correcto para Hostinger
export const getSubmissionEndpoint = (): string => {
  // Para Hostinger, usaremos un archivo PHP en el directorio público
  return '/api/submit-custom-plan.php';
};

// Utilidad para preparar headers para Hostinger
export const getSubmissionHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
};
