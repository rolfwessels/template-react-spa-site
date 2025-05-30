import { FC } from 'react'
import { useNavigate } from '@tanstack/react-router'

export interface CharacterCardProps {
  id: string
  name: string
  image: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
}

const statusColor = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-400',
}

export const CharacterCard: FC<CharacterCardProps> = ({ id, name, image, status, species }) => {
  const navigate = useNavigate()
  return (
    <div
      className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate({ to: `/character/${id}` })}
      tabIndex={0}
      role="button"
      aria-pressed="false"
    >
      <img src={image} alt={name} className="w-24 h-24 rounded-full mb-2 object-cover" />
      <div className="text-lg font-semibold text-center">{name}</div>
      <div className="flex items-center gap-2 mt-1">
        <span className={`inline-block w-2 h-2 rounded-full ${statusColor[status]}`} />
        <span className="text-sm">{status}</span>
      </div>
      <div className="text-xs text-gray-500 mt-1">{species}</div>
    </div>
  )
}

export default CharacterCard; 