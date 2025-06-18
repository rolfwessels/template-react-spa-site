import { FC } from 'react'
import { Badge } from '@radix-ui/themes'

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

const statusColor = {
  Alive: 'green',
  Dead: 'red',
  unknown: 'gray',
} as const

export interface StatusDotProps {
  status: CharacterStatus
}

export const StatusDot: FC<StatusDotProps> = ({ status }) => {
  const color = statusColor[status] || 'gray'
  return <Badge color={color} size="1" role="status">{status}</Badge>
}

export default StatusDot 