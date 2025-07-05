import React, { useState } from "react"
import { FormButtonGrid, FormNumberInput, FormRadioGroup, FormTextarea } from "./components/FormFields"
import type { BrandFormData, VideogameFormData } from "./schemas"
import { brandSchema, stepSchemas, videogameSchema } from "./schemas"

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

const flowOptions = [
  {
    value: "videogame",
    title: "Un Videojuego",
    description: "Promociona tu juego indie o estudio con streamers afines.",
    icon: (
      <svg className='w-8 h-8 mb-2 text-brand-pink' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
        <path d='M9 17v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-6 0h6m-6 0a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2m-6 0v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2' />
      </svg>
    ),
  },
  {
    value: "brand",
    title: "Una Marca",
    description: "Lanza campañas de awareness, producto o eventos con creadores.",
    icon: (
      <svg className='w-8 h-8 mb-2 text-brand-purple' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
        <circle cx='12' cy='12' r='10' />
        <path d='M8 12l2 2 4-4' />
      </svg>
    ),
  },
] as const

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
      const response = await fetch("/enviar_formulario.php", {
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

  // Render step fields
  const renderStep = () => {
    if (!flow) return null
    if (flow === "videogame") {
      switch (step) {
        case 0:
          return (
            <FormTextarea
              label='1. Describamos brevemente tu videojuego'
              name='videogame_description'
              value={data.videogame_description || ""}
              onChange={(e) => handleChange("videogame_description", e.target.value)}
              error={errors.videogame_description}
              placeholder='Ej: Es un juego de rol de mundo abierto con estética retro...'
            />
          )
        case 1:
          return (
            <FormRadioGroup
              label='2. ¿Te gustaría una transmisión simultánea con varios streamers?'
              name='simulcast'
              options={[
                { value: "yes", label: "Sí" },
                { value: "no", label: "No" },
              ]}
              value={data.simulcast as string}
              onChange={(v) => handleChange("simulcast", v)}
              error={errors.simulcast}
            />
          )
        case 2:
          return (
            <FormNumberInput
              label='3. ¿Con cuántos streamers te gustaría contar?'
              name='videogame_streamers'
              value={data.videogame_streamers || ""}
              onChange={(e) => handleChange("videogame_streamers", Number(e.target.value))}
              error={errors.videogame_streamers}
              min={1}
              max={50}
              placeholder='Cantidad'
            />
          )
        case 3:
          return (
            <FormButtonGrid
              label='4. ¿Cuánto tiempo deseas que tu campaña se muestre?'
              options={videogameDurationOptions}
              value={data.videogame_duration as string}
              onChange={(v) => handleChange("videogame_duration", v)}
              error={errors.videogame_duration}
            />
          )
        default:
          return null
      }
    } else {
      switch (step) {
        case 0:
          return (
            <FormTextarea
              label='1. Descríbenos brevemente tu Marca'
              name='brand_description'
              value={data.brand_description || ""}
              onChange={(e) => handleChange("brand_description", e.target.value)}
              error={errors.brand_description}
              placeholder='Ej: Somos una marca de periféricos para gaming...'
            />
          )
        case 1:
          return (
            <FormButtonGrid
              label='2. ¿Qué tipo de promoción buscas?'
              options={promotionTypeOptions}
              value={data.brand_promotion_type as string}
              onChange={(v) => handleChange("brand_promotion_type", v)}
              error={errors.brand_promotion_type}
            />
          )
        case 2:
          return (
            <FormNumberInput
              label='3. ¿Con cuántos streamers te gustaría contar?'
              name='brand_streamers'
              value={data.brand_streamers || ""}
              onChange={(e) => handleChange("brand_streamers", Number(e.target.value))}
              error={errors.brand_streamers}
              min={1}
              max={50}
              placeholder='Cantidad'
            />
          )
        case 3:
          return (
            <FormButtonGrid
              label='4. ¿Cuánto tiempo deseas que tu campaña se muestre?'
              options={videogameDurationOptions}
              value={data.brand_duration as string}
              onChange={(v) => handleChange("brand_duration", v)}
              error={errors.brand_duration}
            />
          )
        default:
          return null
      }
    }
  }

  if (!flow) {
    return (
      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl'>
          {flowOptions.map((opt) => (
            <button
              key={opt.value}
              className='group bg-brand-card/80 hover:bg-brand-card/100 border-2 border-transparent hover:border-brand-pink rounded-2xl p-6 flex flex-col items-center transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-pink cursor-pointer'
              onClick={() => setFlow(opt.value)}
              type='button'>
              {opt.icon}
              <span className='text-lg font-bold mb-1 group-hover:text-brand-pink transition-colors'>{opt.title}</span>
              <span className='text-sm text-text-muted text-center'>{opt.description}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <form className='space-y-8' onSubmit={handleSubmit}>
      {renderStep()}
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
