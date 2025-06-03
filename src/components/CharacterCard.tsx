import { FC } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Card, Flex, Avatar, Heading, Text } from '@radix-ui/themes'
import { StatusDot, CharacterStatus } from './StatusDot'

export interface CharacterCardProps {
  id: string
  name: string
  image: string
  status: CharacterStatus
  species: string
}

export const CharacterCard: FC<CharacterCardProps> = ({ id, name, image, status, species }) => {
  const navigate = useNavigate()
  return (
    <Card 
      
      onClick={() => navigate({ to: `/character/${id}` })}
      style={{ cursor: 'pointer' }}
    >
      <Flex direction="column" align="center" gap="3">
        <Avatar src={image} size="7" radius="full" fallback={name.slice(0, 2)} />
        <Heading size="4" weight="bold">{name}</Heading>
        <StatusDot status={status} />
        <Text size="2" color="gray">{species}</Text>
      </Flex>
    </Card>
  )
}

export default CharacterCard 