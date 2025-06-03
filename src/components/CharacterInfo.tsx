import { Card, Flex, Avatar, Heading, Text } from '@radix-ui/themes'
import { StatusDot, CharacterStatus } from './StatusDot'

interface CharacterInfoProps {
  name: string
  species: string
  status: CharacterStatus
  gender: string
  origin?: string | null
  location?: string | null
  image: string
}

export function CharacterInfo({
  name,
  species,
  status,
  gender,
  origin,
  location,
  image,
}: CharacterInfoProps) {
  return (
    <Card>
      <Flex gap="4">
        <Avatar
          size="5"
          src={image}
          alt={name}
          fallback={name[0]}
          className="w-48 h-48 object-cover"
        />
        <Flex direction="column" gap="2">
          <Text size="2" weight="bold" color="indigo">
            {species.toUpperCase()}
          </Text>
          <Heading size="6">{name}</Heading>
          <Flex align="center" gap="2">
            <StatusDot status={status} />
            <Text color="gray">{status}</Text>
          </Flex>
          <Text color="gray">Gender: {gender}</Text>
          <Text color="gray">Origin: {origin || 'Unknown'}</Text>
          <Text color="gray">Location: {location || 'Unknown'}</Text>
        </Flex>
      </Flex>
    </Card>
  )
} 