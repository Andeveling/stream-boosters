import React from "react"
import type { ZodTypeAny } from "zod"

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
  // Ejemplo: renderizar campos según el paso y el flujo
  // Aquí solo un placeholder, deberás adaptar los campos reales
  if (step === 0) {
    return (
      <div>
        <label className="block mb-2 font-semibold">Nombre</label>
        <input
          className="input input-bordered w-full mb-1"
          value={values.name || ''}
          onChange={e => onChange('name', e.target.value)}
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
      </div>
    )
  }
  // ...otros pasos
  return <div>Campos del paso {step + 1} para flujo {flow}</div>
}
