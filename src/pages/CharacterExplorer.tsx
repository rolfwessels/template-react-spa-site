import { useState, ChangeEvent } from 'react'
import CharacterCard from '@components/CharacterCard'
import { CharactersQuery } from '../graphql/generated/Characters.generated'
import { useQuery } from '@apollo/client'
import { CharactersDocument } from '../graphql/generated/Characters.generated'
import { Container, Flex, Grid, Heading, TextField, Text, Button, Box } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

type Character = NonNullable<NonNullable<CharactersQuery['characters']>['results']>[number]

interface ValidCharacter {
  id: string
  name: string
  image: string
  status: string
  species: string
}

const CharacterExplorer = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery(CharactersDocument, {
    variables: { page, name: search || undefined },
  })

  const characters = data?.characters?.results?.filter((char: Character | null): char is ValidCharacter =>
    char !== null &&
    typeof char.id === 'string' &&
    typeof char.name === 'string' &&
    typeof char.image === 'string' &&
    typeof char.status === 'string' &&
    typeof char.species === 'string'
  ) || []
  const info = data?.characters?.info

  return (
    <Container size="3" p="6"  >
      <Flex direction="column" gap="4" align="center">
        <Heading size="6">Rick and Morty Characters</Heading>
        <Box width="100%">

        <TextField.Root 
          placeholder="Search characters..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); }}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        </Box>

        {loading && <Text align="center">Loading...</Text>}
        {error && <Text align="center" color="red">Error loading characters.</Text>}

        <Grid width="100%" columns={{ xs: '2', md: '2', lg: '3', xl: '4' }} gap="4">
          {characters.map((char: ValidCharacter) => (
            <CharacterCard
              key={char.id}
              id={char.id}
              name={char.name}
              image={char.image}
              status={char.status as 'Alive' | 'Dead' | 'unknown'}
              species={char.species}
            />
          ))}
        </Grid>

        {/* Paging Controls */}
        <Flex gap="4" align="center" mt="4">
          <Button
            variant="soft"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={!info?.prev}
          >
            Previous
          </Button>
          <Text>Page {page} of {info?.pages || 1}</Text>
          <Button
            variant="soft"
            onClick={() => setPage(p => (info?.next ? p + 1 : p))}
            disabled={!info?.next}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default CharacterExplorer 