import { useNavigate } from '@tanstack/react-router'
import { Card, Flex, Avatar, Heading, Badge } from '@radix-ui/themes'
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
      className="bg-white 
      rounded-2xl shadow-md p-6 transition-transform duration-200 hover:shadow-xl hover:scale-105 cursor-pointer
       flex flex-col items-center"
      onClick={() => navigate({ to: `/character/${id}` })}
    >
      <div className="flex justify-center w-full">
        <Avatar
          src={image ?? ''}
          size="7"
          radius="full"
          fallback={name?.slice(0, 2) ?? ''}
          className="mb-3 border-4 border-white shadow-lg"
        />
      </div>
      
      <Heading size="4" weight="bold" className="mb-1 text-center">{name}</Heading>
      <Flex direction="column" align="center" gap="1" className="mb-2">
        <Flex align="center" gap="2">
          <Badge color="indigo" variant="soft" className="text-sm">{species}</Badge>
          <StatusDot status={status as CharacterStatus} />
          
        </Flex>
        
      </Flex>
    </Card>
  )
}

export default CharacterCard 