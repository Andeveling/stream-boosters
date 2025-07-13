# Plan de Refactor: Formularios Stream Boosters

## Análisis del Estado Actual

El proyecto actualmente tiene un formulario con stepper en `src/components/forms/custom-plan/` que presenta algunos desafíos:
- Navegación compleja con múltiples pasos
- Lógica de estado distribuida entre componentes
- Experiencia de usuario potencialmente confusa
- Mantenimiento más complejo debido a la fragmentación

## Objetivo

Crear **dos formularios modulares y simples** que recojan información del cliente de manera más directa y mantenible, siguiendo las mejores prácticas de React Hook Form + Zod.

## Propuesta de Formularios

### 1. Formulario de Contacto Inicial
**Propósito:** Capturar información básica del cliente y su proyecto
- Datos del cliente (nombre, email, empresa)
- Tipo de proyecto (marca, videojuego, producto)
- Presupuesto estimado
- Descripción breve del proyecto

### 2. Formulario de Campaña Personalizada
**Propósito:** Detalles específicos de la campaña de marketing
- Objetivos de la campaña
- Target demográfico
- Preferencias de streamers
- Cronograma y duración
- Requisitos especiales

## Plan por Fases

### Fase 1: Preparación y Análisis (Día 1)
- [ ] Auditoría del formulario actual
- [ ] Identificar datos requeridos vs. opcionales
- [ ] Definir esquemas de validación con Zod
- [ ] Crear wireframes de los nuevos formularios
- [ ] Documentar estructura de datos

### Fase 2: Estructura Base (Día 2-3)
- [ ] Crear estructura de carpetas modular
- [ ] Implementar schemas de validación Zod
- [ ] Crear componentes base reutilizables
- [ ] Configurar React Hook Form para ambos formularios
- [ ] Implementar tipos TypeScript

### Fase 3: Formulario de Contacto (Día 4-5)
- [ ] Implementar campos básicos del cliente
- [ ] Agregar validaciones en tiempo real
- [ ] Crear componentes de campo reutilizables
- [ ] Implementar manejo de errores
- [ ] Agregar feedback visual

### Fase 4: Formulario de Campaña (Día 6-7)
- [ ] Implementar campos específicos de campaña
- [ ] Agregar lógica condicional para campos
- [ ] Crear selectors y dropdowns personalizados
- [ ] Implementar validaciones cruzadas
- [ ] Agregar preview de datos

### Fase 5: Integración Backend (Día 8-9)
- [ ] Actualizar scripts PHP para nuevos formularios
- [ ] Implementar endpoints de envío
- [ ] Agregar manejo de errores del servidor
- [ ] Implementar estados de loading y success
- [ ] Configurar notificaciones por email

### Fase 6: Testing y Optimización (Día 10-11)
- [ ] Escribir tests unitarios para componentes
- [ ] Crear tests de integración para formularios
- [ ] Realizar testing de accesibilidad
- [ ] Optimizar performance y bundle size
- [ ] Testing en diferentes dispositivos

### Fase 7: Documentación y Deploy (Día 12)
- [ ] Documentar componentes y APIs
- [ ] Crear guía de mantenimiento
- [ ] Actualizar README con nuevos formularios
- [ ] Deploy a staging para testing
- [ ] Deploy a producción

## Estructura Propuesta

```
src/components/forms/
├── shared/                    # Componentes reutilizables
│   ├── FormField.tsx
│   ├── FormSelect.tsx
│   ├── FormTextarea.tsx
│   ├── FormButton.tsx
│   └── FormLayout.tsx
├── contact/                   # Formulario de contacto
│   ├── ContactForm.tsx
│   ├── schemas/
│   │   └── contactSchema.ts
│   ├── types/
│   │   └── index.ts
│   └── hooks/
│       └── useContactForm.ts
├── campaign/                  # Formulario de campaña
│   ├── CampaignForm.tsx
│   ├── schemas/
│   │   └── campaignSchema.ts
│   ├── types/
│   │   └── index.ts
│   └── hooks/
│       └── useCampaignForm.ts
└── utils/                     # Utilidades compartidas
    ├── formValidation.ts
    └── formHelpers.ts
```

## Principios de Diseño

### 1. Simplicidad
- Un formulario por página/propósito
- Campos visibles todos a la vez
- Navegación lineal y clara

### 2. Modularidad
- Componentes reutilizables
- Hooks personalizados para lógica
- Schemas de validación independientes

### 3. Accesibilidad
- Labels apropiados para screen readers
- Navegación por teclado
- Contraste y tamaños adecuados

### 4. Performance
- Validación optimizada
- Lazy loading cuando sea apropiado
- Bundle splitting para formularios

### 5. Mantenibilidad
- Código bien documentado
- Tests comprensivos
- Estructura clara y consistente

## Tecnologías y Herramientas

- **React Hook Form**: Manejo eficiente de formularios
- **Zod**: Validación de schemas y tipos
- **Tailwind CSS**: Styling consistente
- **Vitest + Testing Library**: Testing
- **TypeScript**: Type safety
- **PHP**: Backend para procesamiento

## Métricas de Éxito

- [ ] Reducción del tiempo de completado de formularios en 40%
- [ ] Disminución de errores de validación en 60%
- [ ] Mejora en la tasa de conversión de formularios
- [ ] Código más mantenible (menos líneas, mejor organización)
- [ ] Tests con coverage >90%

## Consideraciones Especiales

### Compatibilidad con Hostinger
- Mantener compatibilidad con PHP backend
- Optimizar para hosting estático + PHP
- Considerar límites de archivo de Hostinger

### UX/UI
- Diseño mobile-first
- Feedback inmediato de validación
- Estados de loading claros
- Mensajes de error útiles

### SEO y Performance
- Lazy loading de formularios no críticos
- Optimización de bundle size
- Meta tags apropiados

---

**Próximos pasos:** Comenzar con la Fase 1 y crear los esquemas de validación base.
