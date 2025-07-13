# Stream Boosters - Fluent Design System

Este directorio contiene los componentes compartidos que implementan los principios del **Microsoft Fluent Design System** para crear interfaces modernas, elegantes y accesibles.

## 🎨 Principios del Fluent Design Implementados

### 1. **Light (Illuminación)**
- Gradientes y sombras para crear jerarquía visual
- Efectos de brillo y luminosidad en elementos importantes
- Paleta de colores cálidos y fríos estratégicamente aplicados

### 2. **Depth (Profundidad)**
- Sistema de elevación usando sombras y efectos de desenfoque
- Capas visuales con diferentes niveles de opacidad
- Efectos de `backdrop-blur` para elementos flotantes

### 3. **Motion (Movimiento)**
- Transiciones fluidas de 200-300ms
- Animaciones con `cubic-bezier(0.4,0,0.2,1)` para naturalidad
- Estados hover con escalado y transformaciones suaves

### 4. **Material (Superficie)**
- Efectos de cristal (Glass Morphism) con transparencias
- Múltiples niveles de transparencia para crear profundidad
- Texturas visuales mediante gradientes y fondos

### 5. **Scale (Escala)**
- Diseño responsive y mobile-first
- Jerarquía tipográfica proporcional
- Sistema de espaciado basado en grid de 4px

## 📦 Componentes Disponibles

### `<FluentSection>`
Contenedor principal para secciones con fondos configurables y iconos decorativos.

```astro
<FluentSection
  id="hero"
  backgroundVariant="abstract"
  depth="deep"
  animation="fade-in"
  padding="xl"
  align="center"
  backgroundImage="/src/assets/background.svg"
  backgroundIcons={[
    {
      name: "material-symbols:gamepad-outline-rounded",
      position: "top-left",
      size: "md",
      color: "purple",
      rotation: 12,
      blur: true
    }
  ]}
>
  <!-- Contenido aquí -->
</FluentSection>
```

**Props:**
- `backgroundVariant`: `'default' | 'gradient' | 'glass' | 'abstract' | 'geometric'`
- `depth`: `'shallow' | 'medium' | 'deep'`
- `animation`: `'fade-in' | 'slide-up' | 'scale-in' | 'none'`
- `padding`: `'sm' | 'md' | 'lg' | 'xl'`
- `backgroundIcons`: Array de configuración de iconos de fondo

### `<FluentBadge>`
Etiquetas/badges con indicadores de estado animados.

```astro
<FluentBadge
  variant="glass"
  size="md"
  showPulse={true}
  pulseColor="cyan"
  text="Conectando marcas con audiencias en vivo"
/>
```

**Props:**
- `variant`: `'default' | 'success' | 'warning' | 'info' | 'glass'`
- `size`: `'sm' | 'md' | 'lg'`
- `showPulse`: `boolean`
- `pulseColor`: `'pink' | 'purple' | 'cyan' | 'green' | 'yellow'`

### `<FluentButton>`
Botones siguiendo los principios del Fluent Design con gradientes y estados hover.

```astro
<FluentButton
  href="#packages"
  variant="primary"
  size="lg"
  icon="material-symbols:rocket-launch-outline-rounded"
  iconPosition="left"
  text="Ver Paquetes"
  fullWidth={false}
/>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'ghost' | 'glass' | 'outline'`
- `size`: `'sm' | 'md' | 'lg' | 'xl'`
- `icon`: Nombre del icono (opcional)
- `iconPosition`: `'left' | 'right'`
- `loading`: Estado de carga con spinner

### `<FluentHeading>`
Títulos con soporte para gradientes y diferentes tamaños.

```astro
<FluentHeading
  level={1}
  size="4xl"
  gradient="primary"
  align="center"
>
  Tu proyecto frente a una <span class="text-brand-pink">audiencia real</span>
</FluentHeading>
```

**Props:**
- `level`: `1 | 2 | 3 | 4 | 5 | 6`
- `size`: `'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'`
- `gradient`: `'primary' | 'secondary' | 'accent' | 'none'`

### `<FluentText>`
Párrafos con diferentes variantes de estilo y tamaño.

```astro
<FluentText
  size="base"
  variant="muted"
  align="center"
  maxWidth="3xl"
  margin="lg"
>
  Texto descriptivo aquí...
</FluentText>
```

**Props:**
- `size`: `'xs' | 'sm' | 'base' | 'lg' | 'xl'`
- `variant`: `'light' | 'muted' | 'accent' | 'gradient'`
- `maxWidth`: `'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none'`

### `<FluentStep>`
Componente especializado para mostrar pasos en procesos.

```astro
<FluentStep
  icon="material-symbols:upload-file-outline-rounded"
  number={1}
  title="Paso 1: Selecciona tu paquete"
  description="Descripción del paso..."
  delay={150}
  variant="elevated"
/>
```

**Props:**
- `variant`: `'default' | 'glass' | 'elevated'`
- `delay`: Retraso de animación en milisegundos
- `number`: Número del paso (se muestra como overlay)

## 🎨 Sistema de Colores

### Colores de Marca
- **`brand-pink`**: `#FF2D92` - Energía, acción, CTAs primarios
- **`brand-purple`**: `#8B5CF6` - Creatividad, tecnología, elementos secundarios  
- **`brand-cyan`**: `#06B6D4` - Confianza, modernidad, elementos informativos

### Colores de Fondo
- **`brand-dark`**: `#0F0F23` - Fondos principales
- **`brand-darker`**: `#0A0A1A` - Fondos más oscuros
- **`brand-card`**: `#1A1A2E` - Tarjetas y separadores

### Colores de Texto
- **`text-light`**: `#f1f5f9` - Texto principal
- **`text-muted`**: `#94a3b8` - Texto secundario

## 🔧 Uso y Mejores Prácticas

### 1. Importación
```astro
---
import FluentSection from "../shared/astro/FluentSection.astro";
import FluentHeading from "../shared/astro/FluentHeading.astro";
// ... otros componentes
---
```

### 2. Composición de Secciones
Cada sección debe usar `FluentSection` como contenedor base y componer los demás elementos dentro.

### 3. Consistencia Visual
- Usar siempre los mismos colores de marca
- Mantener el espaciado consistente usando las props de `padding` y `margin`
- Seguir la jerarquía tipográfica establecida

### 4. Accesibilidad
- Todos los componentes incluyen `focus:ring` para navegación por teclado
- Contraste WCAG AA cumplido en todos los colores
- Texto alternativo y ARIA labels donde sea necesario

### 5. Responsive Design
- Todos los componentes son mobile-first
- Breakpoints consistentes usando las clases de Tailwind
- Textos y espaciados que se adaptan automáticamente

## 🚀 Ejemplos de Uso

Consulta las secciones refactorizadas como `Hero.astro` y `HowItWorks.astro` para ver ejemplos completos de implementación.

## 📚 Referencias

- [Microsoft Fluent Design System](https://www.microsoft.com/design/fluent/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Astro Documentation](https://docs.astro.build/)
