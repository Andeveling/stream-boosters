import React from "react"
import { FormTextarea, FormRadioGroup, FormNumberInput, FormButtonGrid } from "./FormFields"
import type { ZodTypeAny } from "zod"

// Opciones para los campos
const simulcastOptions = [
  { value: "yes", label: "Sí, simultáneo" },
  { value: "no", label: "No, por turnos" },
]
const durationOptions = [
  { value: "1week", label: "1 semana" },
  { value: "2weeks", label: "2 semanas" },
  { value: "1month", label: "1 mes" },
  { value: "custom", label: "Personalizado" },
]
const promotionTypeOptions = [
  { value: "product_showcase", label: "Presentación de producto" },
  { value: "brand_awareness", label: "Reconocimiento de marca" },
  { value: "sponsorship", label: "Patrocinio" },
  { value: "event", label: "Evento" },
]

// Props: current step, form values, errors, onChange, schema, etc.
type Props = {
  step: number
  values: Record<string, any>
  errors: Record<string, string | undefined>
  onChange: (field: string, value: any) => void
  schema: ZodTypeAny
  flow: "videogame" | "brand"
}

// Puedes expandir este componente según los campos de cada paso
export default function StepFields({ step, values, errors, onChange, schema, flow }: Props) {
  if (flow === "videogame") {
    if (step === 0) {
      return (
        <FormTextarea
          label="Describe tu videojuego y objetivo de la campaña"
          value={values.videogame_description || ''}
          onChange={e => onChange('videogame_description', e.target.value)}
          error={errors.videogame_description}
        />
      )
    }
    if (step === 1) {
      return (
        <FormRadioGroup
          label="¿La campaña será transmitida simultáneamente por todos los streamers?"
          options={simulcastOptions}
          value={values.simulcast || ''}
          onChange={val => onChange('simulcast', val)}
          name="simulcast"
          error={errors.simulcast}
        />
      )
    }
    if (step === 2) {
      return (
        <FormNumberInput
          label="¿Cuántos streamers quieres en la campaña?"
          value={values.videogame_streamers || ''}
          onChange={e => onChange('videogame_streamers', Number(e.target.value))}
          error={errors.videogame_streamers}
        />
      )
    }
    if (step === 3) {
      return (
        <FormButtonGrid
          label="Duración de la campaña"
          options={durationOptions}
          value={values.videogame_duration || ''}
          onChange={val => onChange('videogame_duration', val)}
          error={errors.videogame_duration}
        />
      )
    }
  }
  if (flow === "brand") {
    if (step === 0) {
      return (
        <FormTextarea
          label="Describe tu marca y objetivo de la campaña"
          value={values.brand_description || ''}
          onChange={e => onChange('brand_description', e.target.value)}
          error={errors.brand_description}
        />
      )
    }
    if (step === 1) {
      return (
        <FormRadioGroup
          label="Tipo de promoción"
          options={promotionTypeOptions}
          value={values.brand_promotion_type || ''}
          onChange={val => onChange('brand_promotion_type', val)}
          name="brand_promotion_type"
          error={errors.brand_promotion_type}
        />
      )
    }
    if (step === 2) {
      return (
        <FormNumberInput
          label="¿Cuántos streamers quieres en la campaña?"
          value={values.brand_streamers || ''}
          onChange={e => onChange('brand_streamers', Number(e.target.value))}
          error={errors.brand_streamers}
        />
      )
    }
    if (step === 3) {
      return (
        <FormButtonGrid
          label="Duración de la campaña"
          options={durationOptions}
          value={values.brand_duration || ''}
          onChange={val => onChange('brand_duration', val)}
          error={errors.brand_duration}
        />
      )
    }
  }
  return <div>¡Error: Paso o flujo no reconocido!</div>
}
