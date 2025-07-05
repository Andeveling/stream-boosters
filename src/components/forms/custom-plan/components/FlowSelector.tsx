import React from "react"
import { VideogameIcon, BrandIcon } from "./Icons"

const flowOptions = [
  {
    value: "videogame",
    title: "Un Videojuego",
    description: "Promociona tu juego indie o estudio con streamers afines.",
    icon: <VideogameIcon className="w-10 h-10 mb-2 text-brand-pink" />,
  },
  {
    value: "brand",
    title: "Una Marca",
    description: "Lanza campañas de awareness, producto o eventos con creadores.",
    icon: <BrandIcon className="w-10 h-10 mb-2 text-brand-purple" />,
  },
] as const

type Props = {
  onSelect: (flow: "videogame" | "brand") => void
}

export default function FlowSelector({ onSelect }: Props) {
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
            onClick={() => onSelect(opt.value)}
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
