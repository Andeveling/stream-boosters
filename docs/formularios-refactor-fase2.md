# Fase 2: Estructura Base y Componentes Reutilizables

## Estructura de Carpetas Modular

Se crearon las carpetas:
- `src/components/forms/shared/` (componentes reutilizables)
- `src/components/forms/contact/schemas/` (schema de contacto)
- `src/components/forms/campaign/schemas/` (schema de campaña)

## Componentes Base Implementados
- `FormField.tsx`: Campo de texto y textarea reutilizable con validación y estilos.
- `FormSelect.tsx`: Selector reutilizable para opciones, con validación.
- `FormButton.tsx`: Botón estilizado para formularios.
- `FormLayout.tsx`: Layout base para formularios, con título y estilos.

## Siguientes pasos
- Implementar los formularios completos usando estos componentes.
- Configurar React Hook Form y Zod en cada formulario.
- Documentar tipos y hooks personalizados.

---

**Nota:** Todos los componentes siguen buenas prácticas de accesibilidad y modularidad para facilitar el mantenimiento y la extensión futura.
