
import { useNavigate, useParams } from '@tanstack/react-router'
import { useQuery } from '@apollo/client'
import { 
  CharacterDetailDocument,
  CharacterInfoFragment,
  EpisodeInfoFragment
} from '../graphql/generated/Characters.generated'
import { CharacterInfo } from '../components/CharacterInfo'
import { EpisodeList } from '../components/EpisodeList'
import { Button, Container, Flex } from '@radix-ui/themes'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

export default function CharacterDetail() {
  const navigate = useNavigate()
  const { id } = useParams({ from: '/character/$id' })
  
  const { data, loading, error } = useQuery(CharacterDetailDocument, {
    variables: { id },
  })
  
  const character = data?.character as CharacterInfoFragment

  
  return (
    <Container p="6" className="bg-gray-50 min-h-screen">
      <Flex direction="column" gap="4">
        <Button
          variant="solid"
          color="indigo"
          className="w-fit rounded-lg shadow mb-2"
          onClick={() => navigate({ to: '/' })}
          aria-label="Back to character list"
        >
          Back to Characters
        </Button>
 
        {loading && <Loading message="Loading character..." />}
        {error && <ErrorMessage message="Error loading character. Please try again later." />}

        {!loading && !error && character && (
          <>
            <CharacterInfo character={character} />
            <EpisodeList episodes={(character.episode ?? []) as EpisodeInfoFragment[]}
            />
          </>
        )}
      </Flex>
    </Container>
  )
} 