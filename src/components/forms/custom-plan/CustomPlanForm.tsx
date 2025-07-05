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
      <svg className='w-10 h-10 mb-2 text-brand-pink' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g>
          <path
            d='M21.2206 8C20.5311 5.81603 19.4281 4.63486 18.0908 4.16059C17.7099 4.02549 17.3016 4 16.8974 4H16.2849C15.4074 4 14.5514 4.27225 13.8351 4.77922L13.3332 5.13441C12.9434 5.41029 12.4776 5.55844 12 5.55844C11.5225 5.55844 11.0567 5.41029 10.6669 5.13443L10.165 4.77922C9.44862 4.27225 8.59264 4 7.71504 4H7.10257C6.69838 4 6.29009 4.02549 5.90915 4.16059C3.52645 5.00566 1.88749 8.09504 2.00604 15.1026C2.02992 16.5145 2.3603 18.075 3.63423 18.6842C4.03121 18.8741 4.49667 19 5.02671 19C5.66273 19 6.1678 18.8187 6.55763 18.5632C7.47153 17.9642 8.14122 16.9639 9.11125 16.4609C9.69519 16.1581 10.3434 16 11.0011 16H12.9989C13.6566 16 14.3048 16.1581 14.8888 16.4609C15.8588 16.9639 16.5285 17.9642 17.4424 18.5632C17.8322 18.8187 18.3373 19 18.9733 19C19.5033 19 19.9688 18.8741 20.3658 18.6842C21.6397 18.075 21.9701 16.5145 21.994 15.1026C22.0132 13.9681 21.9863 12.9362 21.9176 12'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path d='M7.5 9V12M6 10.5L9 10.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
          <path
            d='M19 10.25C19 10.6642 18.6642 11 18.25 11C17.8358 11 17.5 10.6642 17.5 10.25C17.5 9.83579 17.8358 9.5 18.25 9.5C18.6642 9.5 19 9.83579 19 10.25Z'
            fill='currentColor'
          />
          <path
            d='M16 10.25C16 10.6642 15.6642 11 15.25 11C14.8358 11 14.5 10.6642 14.5 10.25C14.5 9.83579 14.8358 9.5 15.25 9.5C15.6642 9.5 16 9.83579 16 10.25Z'
            fill='currentColor'
          />
          <path d='M16.75 8C17.1642 8 17.5 8.33579 17.5 8.75C17.5 9.16421 17.1642 9.5 16.75 9.5C16.3358 9.5 16 9.16421 16 8.75C16 8.33579 16.3358 8 16.75 8Z' fill='currentColor' />
          <path
            d='M16.75 11C17.1642 11 17.5 11.3358 17.5 11.75C17.5 12.1642 17.1642 12.5 16.75 12.5C16.3358 12.5 16 12.1642 16 11.75C16 11.3358 16.3358 11 16.75 11Z'
            fill='currentColor'
          />
        </g>
      </svg>
    ),
  },
  {
    value: "brand",
    title: "Una Marca",
    description: "Lanza campañas de awareness, producto o eventos con creadores.",
    icon: (
      <svg
        className="w-10 h-10 mb-2 text-brand-purple"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.6628 3.25L13.3962 3.25C14.4775 3.24999 15.3438 3.24998 16.0539 3.32024C16.7893 3.393 17.4138 3.54511 18.0018 3.88204C18.5885 4.21826 19.0412 4.68264 19.4875 5.28464C19.9201 5.86804 20.3781 6.62574 20.9521 7.57545L21.6722 8.7667C22.1517 9.55986 22.5408 10.2035 22.8055 10.7633C23.0815 11.3467 23.25 11.8935 23.25 12.5C23.25 13.1065 23.0815 13.6533 22.8055 14.2367C22.5408 14.7965 22.1517 15.4401 21.6722 16.2333L20.9521 17.4246C20.3781 18.3743 19.9201 19.132 19.4875 19.7154C19.0412 20.3174 18.5885 20.7817 18.0018 21.118C17.4138 21.4549 16.7893 21.607 16.0539 21.6798C15.3438 21.75 14.4775 21.75 13.3962 21.75H10.6628C8.77448 21.75 7.27837 21.75 6.10742 21.5873C4.90024 21.4194 3.92827 21.0659 3.16484 20.2766C2.4048 19.4908 2.06748 18.4962 1.90675 17.2601C1.74998 16.0544 1.74999 14.5118 1.75 12.555V12.445C1.74999 10.4882 1.74998 8.94556 1.90675 7.73988C2.06748 6.50385 2.4048 5.50922 3.16484 4.72339C3.92827 3.93405 4.90024 3.58055 6.10742 3.41274C7.27838 3.24997 8.7745 3.24998 10.6628 3.25ZM6.31395 4.89846C5.28243 5.04185 4.68356 5.31074 4.24305 5.76621C3.79914 6.22517 3.53449 6.85468 3.39423 7.93331C3.25149 9.03102 3.25 10.476 3.25 12.5C3.25 14.524 3.25149 15.969 3.39423 17.0667C3.53449 18.1453 3.79914 18.7748 4.24305 19.2338C4.68356 19.6893 5.28243 19.9582 6.31395 20.1015C7.36968 20.2483 8.76142 20.25 10.721 20.25H13.358C14.4863 20.25 15.2785 20.2492 15.9062 20.187C16.517 20.1266 16.9142 20.0123 17.256 19.8165C17.599 19.6199 17.9062 19.3297 18.2826 18.822C18.668 18.3022 19.09 17.6055 19.6875 16.617L20.3683 15.4908C20.8728 14.6562 21.2214 14.0778 21.4495 13.5954C21.6702 13.1287 21.75 12.8077 21.75 12.5C21.75 12.1923 21.6702 11.8713 21.4495 11.4046C21.2214 10.9222 20.8728 10.3438 20.3683 9.50924L19.6875 8.383C19.09 7.39452 18.668 6.69782 18.2826 6.17798C17.9062 5.6703 17.599 5.38005 17.256 5.1835C16.9142 4.98766 16.517 4.87339 15.9062 4.81295C15.2785 4.75084 14.4863 4.75 13.358 4.75H10.721C8.76142 4.75 7.36968 4.7517 6.31395 4.89846ZM7.5 7.24512C7.91421 7.24512 8.25 7.5809 8.25 7.99512V17C8.25 17.4142 7.91421 17.75 7.5 17.75C7.08579 17.75 6.75 17.4142 6.75 17V7.99512C6.75 7.5809 7.08579 7.24512 7.5 7.24512Z"
            fill="currentColor"
          />
        </g>
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
              className={`group bg-brand-card/80 hover:bg-brand-card/100 border-2 border-transparent rounded-2xl p-6 flex flex-col items-center transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 cursor-pointer ${
                opt.value === 'videogame'
                  ? 'focus:ring-brand-pink hover:border-brand-pink'
                  : 'focus:ring-brand-purple hover:border-brand-purple'
              }`}
              onClick={() => setFlow(opt.value)}
              type='button'>
              {React.cloneElement(opt.icon, {
                className: `w-10 h-10 mb-2 transition-colors duration-200 ${
                  opt.value === 'videogame'
                    ? 'text-brand-pink group-hover:text-brand-purple'
                    : 'text-brand-purple group-hover:text-brand-pink'
                }`,
              })}
              <span className={`text-lg font-bold mb-1 transition-colors ${
                opt.value === 'videogame'
                  ? 'group-hover:text-brand-purple text-brand-pink'
                  : 'group-hover:text-brand-pink text-brand-purple'
              }`}>
                {opt.title}
              </span>
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
