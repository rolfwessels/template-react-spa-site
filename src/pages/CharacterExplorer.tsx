import { useEffect, useState } from 'react';
import { print } from 'graphql';
import {
  CharactersDocument,
  type CharactersQuery,
  type CharactersQueryVariables,
} from '../graphql/generated/Characters.generated';
import CharacterCard from '../components/CharacterCard';

const CharacterExplorer = () => {
  const [characters, setCharacters] = useState<
    NonNullable<CharactersQuery['characters']>['results']
  >([]);
  const [info, setInfo] = useState<
    NonNullable<CharactersQuery['characters']>['info']
  >({ count: null, pages: 1, next: null, prev: null });
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: print(CharactersDocument),
            variables: { page, name: searchTerm } as CharactersQueryVariables,
          }),
        });
        const json = await res.json();
        const data = json.data as CharactersQuery;
        const pageInfo = data.characters?.info;
        const results = data.characters?.results;
        if (pageInfo) setInfo(pageInfo);
        setCharacters(results ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, searchTerm]);

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
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="border rounded p-2 w-full max-w-md"
        />
      </div>

      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : characters.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((char) => (
              <CharacterCard key={char.id} {...char} />
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={!info.prev}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {info.pages}
            </span>
            <button
              onClick={() => setPage((p) => (info.next ? p + 1 : p))}
              disabled={!info.next}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">No characters found.</div>
      )}
    </div>
  );
};

export default CharacterExplorer;