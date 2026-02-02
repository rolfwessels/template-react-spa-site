import { useState, ChangeEvent } from 'react'
import CharacterCard from '../components/CharacterCard'
import { useQuery } from '@apollo/client/react'
import { 
  CharactersDocument, 
  CharacterBasicFragment 
} from '../graphql/generated/Characters.generated'
import { Container, Flex, Grid, Heading, TextField, Text, Button, Box, Card } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import CharacterDashboard from '../components/CharacterDashboard'

const CharacterExplorer = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery(CharactersDocument, {
    variables: { page, name: search || undefined },
  })

  const characters = (data?.characters?.results || []).map((x: unknown) => x as CharacterBasicFragment)
  const info = data?.characters?.info

  return (
    <Container size="3" p="6" style={{ minHeight: '100vh', backgroundColor: 'var(--gray-2)' }}>
      <Flex direction="column" gap="2" align="center">
        <Heading size="6" mb="1">Rick and Morty Characters</Heading>
        <Text color="gray" size="3" mb="4">Browse and search your favorite characters from the show.</Text>
        <Box width="100%" mb="4">
          <TextField.Root 
            placeholder="Search characters..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); }}
            aria-label="Search characters"
            size="2"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        {loading && (
          <Loading message="Loading characters..." />
        )}

        {error && (
          <ErrorMessage message="Error loading characters. Please try again later." />
        )}

        {!loading && !error && characters.length === 0 && (
          <Box width="100%">
            <Card size="2" style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
              <Text size="3">No characters found matching your search.</Text>
            </Card>
          </Box>
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            <CharacterDashboard characters={characters} />
            
            <Grid width="100%" columns={{ xs: '1', sm: '2', md: '3', lg: '4' }} gap="6" py="4">
              {characters.map((char: CharacterBasicFragment) =>
                char && (
                  <CharacterCard
                    key={char.id!}
                    character={char}
                  />
                )
              )}
            </Grid>

            <Flex gap="4" align="center" mt="4">
              <Button
                variant="solid"
                color="indigo"
                size="2"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={!info?.prev}
                aria-label="Previous page"
              >
                Previous
              </Button>
              <Text>Page {page} of {info?.pages || 1}</Text>
              <Button
                variant="solid"
                color="indigo"
                size="2"
                onClick={() => setPage(p => (info?.next ? p + 1 : p))}
                disabled={!info?.next}
                aria-label="Next page"
              >
                Next
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Container>
  )
}

export default CharacterExplorer 