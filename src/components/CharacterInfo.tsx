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
    <Card className="rounded-2xl shadow-lg p-8 bg-gradient-to-br from-indigo-50 to-white">
      <Flex gap="6" align="center">
        <div className="flex justify-center items-center w-48 h-48">
          <Avatar
            size="9"
            src={image}
            alt={name}
            fallback={name[0]}
            className="w-44 h-44 border-4 border-white shadow-xl text-3xl"
          />
        </div>
        <Flex direction="column" gap="3" className="flex-1">
          <Heading size="6" weight="bold" className="mb-2">{name}</Heading>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <Text as="span" weight="bold">Status:</Text>{' '}
              <StatusDot status={status} />{' '}
            </div>
            <div>
              <Text as="span" weight="bold">Origin:</Text>{' '}
              <Text as="span" color="gray">{origin || 'Unknown'}</Text>
            </div>
            <div>
              <Text as="span" weight="bold">Species:</Text>{' '}
              <Text as="span" color="gray">{species}</Text>
            </div>
            <div>
              <Text as="span" weight="bold">Location:</Text>{' '}
              <Text as="span" color="gray">{location || 'Unknown'}</Text>
            </div>
            <div>
              <Text as="span" weight="bold">Gender:</Text>{' '}
              <Text as="span" color="gray">{gender}</Text>
            </div>
          </div>
        </Flex>
      </Flex>
    </Card>
  )
} 