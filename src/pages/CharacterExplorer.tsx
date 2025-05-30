import { useState } from 'react'
import { useQuery } from 'urql'
import CharacterCard from '@components/CharacterCard'
import { Provider } from 'urql'
import { urqlClient } from '@lib/urqlClient'

type Character = {
  id: string
  name: string
  image: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
}

const CHARACTERS_QUERY = `
  query ($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info { count pages next prev }
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`

const CharacterExplorer = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [{ data, fetching, error }] = useQuery({
    query: CHARACTERS_QUERY,
    variables: { page, name: search || undefined },
  })

  const characters = data?.characters?.results as Character[] || []
  const info = data?.characters?.info

  return (
    <Provider value={urqlClient}>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Rick and Morty Characters</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Name"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border rounded px-4 py-2 w-full max-w-md shadow-sm"
        />
      </div>
      {fetching && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">Error loading characters.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((char: Character) => (
          <CharacterCard key={char.id} {...char} />
        ))}
      </div>
      {/* Paging Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={!info?.prev}
        >
          Previous
        </button>
        <span className="px-2 py-2">Page {page} of {info?.pages || 1}</span>
        <button
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setPage(p => (info?.next ? p + 1 : p))}
          disabled={!info?.next}
        >
          Next
        </button>
      </div>
    </div></Provider>
  )
}

export default CharacterExplorer 