import React, { useState } from "react"
import { FormButtonGrid, FormNumberInput, FormRadioGroup, FormTextarea } from "./components/FormFields"
import type { BrandFormData, VideogameFormData } from "./schemas"
import { brandSchema, stepSchemas, videogameSchema } from "./schemas"
import FlowSelector from "./components/FlowSelector"
import StepFields from "./components/StepFields"

const videogameDurationOptions = [
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

export default function CustomPlanForm() {
  const [flow, setFlow] = useState<"videogame" | "brand" | null>(null)
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Partial<VideogameFormData & BrandFormData>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)

  const handleNext = () => {
    if (!flow) return
    const schema = stepSchemas[flow][step]
    const result = schema.safeParse(data)
    if (!result.success) {
      const err = result.error.issues[0]
      setErrors({ [err.path[0] as string]: err.message })
      return
    }
    setErrors({})
    setStep(step + 1)
  }

  const handlePrev = () => setStep((s) => Math.max(0, s - 1))

  const handleChange = (field: string, value: any) => {
    setData((d) => ({ ...d, [field]: value }))
    setErrors((e) => {
      const { [field]: _removed, ...rest } = e
      return rest
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!flow) return
    const schema = flow === "videogame" ? videogameSchema : brandSchema
    const result = schema.safeParse(data)
    if (!result.success) {
      const err = result.error.issues[0]
      setErrors({ [err.path[0] as string]: err.message })
      return
    }
    setErrors({})
    setSubmitting(true)
    setStatus("Enviando...")
    try {
      const response = await fetch("/custom_plan_submit.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      })
      const res = await response.json()
      if (response.ok && res.status === "success") {
        setStatus("¡Propuesta enviada con éxito!")
        setData({})
        setStep(0)
        setFlow(null)
      } else {
        setStatus(res.message || "Error en el servidor.")
      }
    } catch (err) {
      setStatus("Error al enviar.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!flow) {
    return <FlowSelector onSelect={setFlow} />
  }

  return (
    <form className='space-y-8' onSubmit={handleSubmit}>
      <StepFields
        step={step}
        values={data}
        errors={errors}
        onChange={handleChange}
        schema={stepSchemas[flow][step]}
        flow={flow}
      />
      <div className='flex justify-between mt-8'>
        <button type='button' className='bg-brand-card text-text-muted py-2 px-6 rounded-lg font-semibold' onClick={handlePrev} disabled={step === 0}>
          Anterior
        </button>
        {step < 3 ? (
          <button type='button' className='bg-brand-pink text-white py-2 px-6 rounded-lg font-semibold' onClick={handleNext}>
            Siguiente
          </button>
        ) : (
          <button type='submit' className='bg-brand-purple text-white font-bold py-3 px-8 rounded-lg' disabled={submitting}>
            Enviar Propuesta
          </button>
        )}
      </div>
      {status && <div className='mt-4 text-center'>{status}</div>}
    </form>
  )
}
