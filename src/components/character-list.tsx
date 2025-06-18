import { useEffect, useState } from "react";
import { Character } from "../types/character";

interface CharacterListProps {
  status: string;
  page: number;
  incrementRequestCount: () => void;
  onLoadTime: (time: number) => void;
}

export const CharacterList = ({
  status,
  page,
  incrementRequestCount,
  onLoadTime,
}: CharacterListProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const start = performance.now();
        setLoading(true);
        incrementRequestCount();

        console.log(`Fetching: status=${status}, page=${page}`);

        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?status=${status}&page=${page}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Fetch failed");
        }

        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await res.json();

        setCharacters((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );

        const end = performance.now();
        onLoadTime(end - start);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [status, page]);

  return (
    <>
      {loading && <p className="mb-4">Loading...</p>}

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {characters.map((character) => (
          <li key={character.id} className="p-4 border rounded shadow">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{character.name}</h2>
            <p className="text-gray-600">
              {character.status} - {character.species}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};
