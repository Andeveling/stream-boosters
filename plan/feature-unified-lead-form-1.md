---
goal: Simplificar y unificar la captación de leads según el flujo de selección de paquetes y personalización
version: 1.0
date_created: 2025-07-13
owner: Stream Boosters Team
tags: [feature, ux, forms, refactor, architecture]
---

# Introduction

Este plan implementa una experiencia de usuario optimizada para la captación de leads en la landing de Stream Boosters. Si el usuario selecciona un paquete estándar, solo se le solicitarán datos de contacto mínimos (nombre, email, paquete). Si elige "campaña personalizada", se mostrará un formulario dinámico con campos adicionales según el tipo de cliente (videojuego o marca) y sus necesidades.

## 1. Requirements & Constraints

- **REQ-001**: El formulario debe ser dinámico y mostrar solo los campos necesarios según la selección del usuario.
- **REQ-002**: Al seleccionar un paquete estándar, solo se piden nombre, email y paquete.
- **REQ-003**: Al seleccionar "campaña personalizada", se muestran campos adicionales según el tipo de cliente (videojuego/marca).
- **REQ-004**: El backend debe distinguir el origen del lead (paquete estándar o personalizado) y almacenar todos los datos relevantes.
- **REQ-005**: El flujo debe ser accesible y usable en dispositivos móviles.
- **CON-001**: Debe funcionar en Hostinger (Astro SSG + React + PHP + MySQL).
- **SEC-001**: Validar y sanitizar todos los datos en frontend y backend.
- **PAT-001**: Reutilizar componentes y lógica existente donde sea posible.

## 2. Implementation Steps

### Implementation Phase 1

- GOAL-001: Unificar y simplificar el flujo de formularios en la UI

| Task     | Description                                                                                          | Completed | Date |
| -------- | ---------------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-001 | Crear un único componente de formulario React que reciba el tipo de lead (paquete/personalizado)     |           |      |
| TASK-002 | Implementar lógica condicional para mostrar solo los campos requeridos según la selección            |           |      |
| TASK-003 | Actualizar la sección de paquetes para que al hacer click pase el paquete seleccionado al formulario |           |      |
| TASK-004 | Añadir validación y accesibilidad a todos los campos                                                 |           |      |

### Implementation Phase 2

- GOAL-002: Adaptar el backend y la base de datos para soportar ambos flujos

| Task     | Description                                                                             | Completed | Date |
| -------- | --------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-005 | Modificar el endpoint PHP para distinguir y almacenar correctamente ambos tipos de lead |           |      |
| TASK-006 | Ajustar la tabla `leads` si es necesario para nuevos campos                             |           |      |
| TASK-007 | Probar el flujo completo en Hostinger y validar almacenamiento y notificaciones         |           |      |

### Implementation Phase 3

- GOAL-003: Mejorar la experiencia y el análisis de leads

| Task     | Description                                                      | Completed | Date |
| -------- | ---------------------------------------------------------------- | --------- | ---- |
| TASK-008 | Añadir campo de consentimiento legal y validación antispam       |           |      |
| TASK-009 | Documentar el flujo y actualizar instrucciones para AI y humanos |           |      |

## 3. Alternatives

- **ALT-001**: Mantener dos formularios separados (más código, peor UX)
- **ALT-002**: Usar solo campos básicos para todos (pierde personalización y calidad de lead)

## 4. Dependencies

- **DEP-001**: React, Astro, PHP, MySQL
- **DEP-002**: react-hook-form, zod

## 5. Files

- **FILE-001**: src/components/forms/UnifiedLeadForm.tsx (nuevo)
- **FILE-002**: src/components/sections/Packages.astro
- **FILE-003**: src/components/php/lead_submit.php
- **FILE-004**: src/components/php/config.php
- **FILE-005**: src/components/forms/schemas/leadSchema.ts (nuevo)

## 6. Testing

- **TEST-001**: Pruebas unitarias e integración para el formulario React (Vitest)
- **TEST-002**: Pruebas de validación y UX en dispositivos móviles
- **TEST-003**: Pruebas de integración de backend (almacenamiento y notificación)

## 7. Risks & Assumptions

- **RISK-001**: Usuarios pueden abandonar si el formulario es muy largo o complejo
- **ASSUMPTION-001**: El backend y la base de datos pueden adaptarse a los nuevos campos

## 8. Related Specifications / Further Reading

- [Fluent UI Design System](https://github.com/microsoft/fluentui)
- [react-hook-form docs](https://react-hook-form.com/)
- [Astro + React integration](https://docs.astro.build/en/guides/integrations-guide/react/)
