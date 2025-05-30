import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { print } from 'graphql';
import {
  CharacterDetailDocument,
  type CharacterDetailQuery,
  type CharacterDetailQueryVariables,
} from '../graphql/generated/CharacterDetail.generated';

const statusColorMap: Record<string, string> = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
};

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<
    CharacterDetailQuery['character']
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: print(CharacterDetailDocument),
            variables: { id } as CharacterDetailQueryVariables,
          }),
        });
        const json = await res.json();
        const data = json.data as CharacterDetailQuery;
        if (json.errors) {
          setError(json.errors[0].message || 'Error fetching character.');
        } else {
          setCharacter(data.character);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error.');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  if (!character) {
    return <div className="text-center mt-8">Character not found.</div>
  }

  const colorClass = statusColorMap[character.status] ?? 'bg-gray-500'

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to list
      </Link>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start">
          <img
            src={character.image}
            alt={character.name}
            className="w-full md:w-1/4 rounded-lg mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{character.name}</h1>
            <div className="flex items-center mb-4">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${colorClass}`} />
              <span className="text-lg capitalize font-medium">{character.status}</span>
            </div>
            <p className="mb-1">
              <span className="font-semibold">Species:</span> {character.species}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Gender:</span> {character.gender}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Origin:</span> {character.origin?.name}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Location:</span> {character.location?.name}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        {character.episode.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {character.episode.map((ep) =>
              ep ? (
                <div key={ep.id} className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold">{ep.name}</h3>
                  <p className="text-gray-600 text-sm">{ep.episode}</p>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p>No episodes available.</p>
        )}
      </div>
    </div>
  )
};

export default CharacterDetail;