import { useQuery } from 'urql'
import { useParams, useNavigate } from '@tanstack/react-router'

const CHARACTER_QUERY = `
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      origin { name }
      location { name }
      image
      episode {
        id
        name
        episode
      }
    }
  }
`

const statusColor = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-400',
}

const CharacterDetail = () => {
  const { id } = useParams({ strict: false })
  const navigate = useNavigate()
  const [{ data, fetching, error }] = useQuery({
    query: CHARACTER_QUERY,
    variables: { id },
  })
  const char = data?.character

  if (fetching) return <div className="text-center py-8">Loading...</div>
  if (error || !char) return <div className="text-center text-red-500 py-8">Character not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate({ to: '/' })} className="mb-6 text-blue-600 hover:underline">&larr; Back to list</button>
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-white rounded-lg shadow p-6">
        <img src={char.image} alt={char.name} className="w-48 h-48 rounded-lg object-cover" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{char.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block w-3 h-3 rounded-full ${statusColor[char.status] || statusColor.unknown}`} />
            <span className="text-lg font-medium">{char.status}</span>
          </div>
          <div className="mb-1"><span className="font-semibold">Species:</span> {char.species}</div>
          <div className="mb-1"><span className="font-semibold">Gender:</span> {char.gender}</div>
          <div className="mb-1"><span className="font-semibold">Origin:</span> {char.origin?.name}</div>
          <div className="mb-1"><span className="font-semibold">Location:</span> {char.location?.name}</div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {char.episode.map((ep: any) => (
            <div key={ep.id} className="bg-gray-100 rounded p-3">
              <div className="font-semibold">{ep.name}</div>
              <div className="text-xs text-gray-500">{ep.episode}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail 