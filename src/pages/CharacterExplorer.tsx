import { useState, ChangeEvent } from 'react'
import CharacterCard from '../components/CharacterCard'
import { useQuery } from '@apollo/client'
import { CharactersDocument } from '../graphql/generated/Characters.generated'
import { Container, Flex, Grid, Heading, TextField, Text, Button, Box, Card } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const CharacterExplorer = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery(CharactersDocument, {
    variables: { page, name: search || undefined },
  })

  const characters = data?.characters?.results || []
  const info = data?.characters?.info

  return (
    <Container size="3" p="6">
      <Flex direction="column" gap="4" align="center">
        <Heading size="6">Rick and Morty Characters</Heading>
        <Box width="100%">
          <TextField.Root 
            placeholder="Search characters..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); }}
            aria-label="Search characters"
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
          <Card size="2" style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
            <Text size="3">No characters found matching your search.</Text>
          </Card>
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            <Grid width="100%" columns={{ xs: '2', md: '2', lg: '3', xl: '4' }} gap="4">
              {characters.map((char) =>
                char && (
                  <CharacterCard
                    key={char.id!}
                    id={char.id!}
                    name={char.name!}
                    image={char.image!}
                    status={char.status as 'Alive' | 'Dead' | 'unknown'}
                    species={char.species!}
                  />
                )
              )}
            </Grid>

            {/* Paging Controls */}
            <Flex gap="4" align="center" mt="4">
              <Button
                variant="soft"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={!info?.prev}
                aria-label="Previous page"
              >
                Previous
              </Button>
              <Text>Page {page} of {info?.pages || 1}</Text>
              <Button
                variant="soft"
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