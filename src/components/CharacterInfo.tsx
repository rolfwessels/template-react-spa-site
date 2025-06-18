import { Card, Flex, Avatar, Heading, Text } from '@radix-ui/themes'
import { StatusDot, CharacterStatus } from './StatusDot'
import { CharacterInfoFragment } from '../graphql/generated/Characters.generated'

interface CharacterInfoProps {
  character: CharacterInfoFragment
}

export function CharacterInfo(props: CharacterInfoProps) {
  return (
    <Card className="rounded-2xl shadow-lg p-8 bg-gradient-to-br from-indigo-50 to-white">
      <Flex gap="6" align="center">
        <div className="flex justify-center items-center w-48 h-48">
          <Avatar
            size="9"
            src={props.character.image ?? ''}
            alt={props.character.name ?? ''}
            fallback={props.character.name?.[0] ?? ''}
            className="w-44 h-44 border-4 border-white shadow-xl text-3xl"
          />
        </div>
        <Flex direction="column" gap="3" className="flex-1">
          <Heading size="6" weight="bold" className="mb-2">{props.character.name}</Heading>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <Text as="span" weight="bold">Status:</Text>{' '}
              <StatusDot status={props.character.status as CharacterStatus} />{' '}
            </div>
            <div>
              <Text as="span" weight="bold">Origin:</Text>{' '}
              <Text as="span" color="gray">{props.character.origin?.name || 'Unknown'}</Text>
            </div>
            <div>
              <Text as="span" weight="bold">Species:</Text>{' '}
              <Text as="span" color="gray">{props.character.species}</Text>
            </div>
            <div>
              <Text as="span" weight="bold">Location:</Text>{' '}
              <Text as="span" color="gray">{props.character.location?.name || 'Unknown'}</Text>
            </div>
            <div>
              <Text as="span" weight="bold">Gender:</Text>{' '}
              <Text as="span" color="gray">{props.character.gender ?? 'Unknown'}</Text>
            </div>
          </div>
        </Flex>
      </Flex>
    </Card>
  )
} 