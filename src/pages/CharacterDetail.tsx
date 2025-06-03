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

export default function CharacterDetail() {
  const navigate = useNavigate()
  const { id } = useParams({ from: '/character/$id' })
  const [character, setCharacter] = useState<CharacterDetailQuery['character']>()
  const [loading, setLoading] = useState(true)
  
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true)
        const data = await graphqlApi.getCharacterDetail(id)
        if (data.character) {
          setCharacter(data.character)
        } else {
          setError('Character not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [id])

  
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
            name={character.name ?? 'Unknown'}
            species={character.species ?? 'Unknown'}
            status={(character.status ?? 'unknown') as CharacterStatus}
            gender={character.gender ?? 'Unknown'}
            origin={character.origin?.name ?? 'Unknown'}
            location={character.location?.name ?? 'Unknown'}
            image={character.image ?? ''}
          />
            <EpisodeList
              episodes={
                (character.episode ?? [])
                  .filter(
                    (ep): ep is { id: string; name: string; episode: string } =>
                      !!ep && !!ep.id && !!ep.name && !!ep.episode
                  )
                  .map(ep => ({
                    ...ep,
                    id: ep.id!,
                    name: ep.name!,
                    episode: ep.episode!,
                  }))
              }
            /></>)}
      </Flex>
    </Container>
  )
} 