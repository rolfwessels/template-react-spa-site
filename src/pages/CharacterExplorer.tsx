import { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';

interface Character {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
}

const CharacterExplorer = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                characters(page: 1) {
                  results {
                    id
                    name
                    image
                    status
                    species
                  }
                }
              }
            `,
          }),
        });
        const json = await res.json();
        setCharacters(json.data.characters.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        Rick and Morty Characters
      </h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full max-w-md"
        />
      </div>
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} {...char} />
          ))}
        </div>
      ) : (
        <div className="text-center">No characters found.</div>
      )}
    </div>
  );
};

export default CharacterExplorer;