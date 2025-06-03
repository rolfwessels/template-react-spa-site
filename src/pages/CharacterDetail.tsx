import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { graphqlApi } from '../graphql/api'
import type { CharacterDetailQuery } from '../graphql/generated/CharacterDetail.generated'
import { CharacterInfo } from '../components/CharacterInfo'
import { EpisodeList } from '../components/EpisodeList'
import { Button, Container, Flex } from '@radix-ui/themes'
import { CharacterStatus } from '@/components/StatusDot'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

interface ValidCharacter {
  id: string
  name: string
  status: CharacterStatus
  species: string
  gender: string
  image: string
  origin: { name: string } | null
  location: { name: string } | null
  episode: Array<{
    id: string
    name: string
    episode: string
  }>
}

export default function CharacterDetail() {
  const navigate = useNavigate()
  const { id } = useParams({ from: '/character/$id' })
  const [character, setCharacter] = useState<ValidCharacter>()
  const [loading, setLoading] = useState(true)
  
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true)
        const data = await graphqlApi.getCharacterDetail(id)
        if (data.character && ValidateCharacter(data.character)) {
          setCharacter(data.character)
        } else {
          setError('Invalid character data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [id])


  // Type guard to ensure all required fields are present
  const ValidateCharacter = (character: NonNullable<CharacterDetailQuery['character']>): character is ValidCharacter => {
    return (
      typeof character.id === 'string' &&
      typeof character.name === 'string' &&
      typeof character.status === 'string' &&
      typeof character.species === 'string' &&
      typeof character.gender === 'string' &&
      typeof character.image === 'string' &&
      Array.isArray(character.episode) &&
      character.episode.every((ep): ep is NonNullable<typeof ep> =>
        ep !== null &&
        typeof ep.id === 'string' &&
        typeof ep.name === 'string' &&
        typeof ep.episode === 'string'
      )
    )
  }

  
  return (
    <Container p="6">
      <Flex direction="column" gap="4">
        <Button
          variant="soft"
          onClick={() => navigate({ to: '/' })}
          aria-label="Back to character list"
        >
          Back to List
        </Button>
 
        {loading && <Loading message="Loading character..." />}
        {error && <ErrorMessage message={typeof error === 'string' ? error : 'Character not found'} />}

        {!loading && !error && character && (
          <><CharacterInfo
            name={character.name}
            species={character.species}
            status={character.status}
            gender={character.gender}
            origin={character.origin?.name}
            location={character.location?.name}
            image={character.image}
          />
            <EpisodeList episodes={character.episode} /></>)}
      </Flex>
    </Container>
  )
} 