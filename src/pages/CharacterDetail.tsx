import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { graphqlApi } from '../graphql/api'
import type { CharacterDetailQuery } from '../graphql/generated/CharacterDetail.generated'

interface ValidCharacter {
  id: string
  name: string
  status: string
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
  const [character, setCharacter] = useState<CharacterDetailQuery['character']>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true)
        const data = await graphqlApi.getCharacterDetail(id)
        setCharacter(data.character)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [id])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error || !character) {
    return <div className="text-center py-8 text-red-500">{error || 'Character not found'}</div>
  }

  // Type guard to ensure all required fields are present
  const isValidCharacter = (character: NonNullable<CharacterDetailQuery['character']>): character is ValidCharacter => {
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

  if (!isValidCharacter(character)) {
    return <div className="text-center text-red-500 py-8">Invalid character data.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate({ to: '/' })}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Back to List
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={character.image}
              alt={character.name}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {character.species}
            </div>
            <h1 className="mt-2 text-2xl font-bold">{character.name}</h1>
            <div className="mt-4 flex items-center">
              <div
                className={`h-3 w-3 rounded-full mr-2 ${
                  character.status === 'Alive'
                    ? 'bg-green-500'
                    : character.status === 'Dead'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
                }`}
              />
              <span className="text-gray-600">{character.status}</span>
            </div>
            <p className="mt-2 text-gray-600">Gender: {character.gender}</p>
            <p className="mt-2 text-gray-600">Origin: {character.origin?.name}</p>
            <p className="mt-2 text-gray-600">Location: {character.location?.name}</p>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {character.episode?.map((episode) => (
              <div
                key={episode.id}
                className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold">{episode.name}</h3>
                <p className="text-gray-600">{episode.episode}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 