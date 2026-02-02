import { useNavigate } from '@tanstack/react-router'
import { Card, Flex, Avatar, Heading, Badge, Box } from '@radix-ui/themes'
import { StatusDot, CharacterStatus } from './StatusDot'
import { CharacterBasicFragment } from '@/graphql/generated/Characters.generated'

export interface CharacterCardProps {
  character : CharacterBasicFragment
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { id, name, image, status, species } = character
  const navigate = useNavigate()
  return (
    <Card
      size="2"
      variant="surface"
      style={{ cursor: 'pointer' }}
      className="character-card"
      onClick={() => navigate({ to: `/character/${id}` })}
    >
      <Box p="6">
        <Flex direction="column" align="center">
          <Flex justify="center" width="100%">
            <Avatar
              src={image ?? ''}
              size="7"
              radius="full"
              fallback={name?.slice(0, 2) ?? ''}
              mb="3"
              style={{ border: '4px solid white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            />
          </Flex>
          
          <Heading size="4" weight="bold" mb="1" align="center">{name}</Heading>
          <Flex direction="column" align="center" gap="1" mb="2">
            <Flex align="center" gap="2">
              <Badge color="indigo" variant="soft" size="1">{species}</Badge>
              <StatusDot status={status as CharacterStatus} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Card>
  )
}

export default CharacterCard 