# Fase 1: Preparación y Análisis

## Auditoría del formulario actual
- El formulario actual utiliza un stepper y lógica distribuida.
- Se identifican campos redundantes y navegación poco clara.

## Datos requeridos vs. opcionales
- **Formulario de Contacto:**
  - nombre (requerido)
  - email (requerido)
  - empresa (opcional)
  - tipoProyecto (requerido)
  - presupuesto (opcional)
  - descripcion (requerido)
- **Formulario de Campaña:**
  - objetivos (requerido)
  - target (requerido)
  - preferenciasStreamers (opcional)
  - cronograma (opcional)
  - requisitos (opcional)

## Schemas de validación
- Se han creado los archivos:
  - `src/components/forms/contact/schemas/contactSchema.ts`
  - `src/components/forms/campaign/schemas/campaignSchema.ts`
- Ambos usan Zod para validación robusta y tipado TypeScript.

## Wireframes y estructura de datos
- Wireframes pendientes de diseño (siguiente fase)
- Estructura modular propuesta en el plan principal

## Documentación
- Esta fase documenta los campos y validaciones base para ambos formularios.
- Siguiente paso: crear componentes base y estructura de carpetas modular.
