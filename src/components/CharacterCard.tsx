import { Link } from 'react-router-dom';

interface CharacterCardProps {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
}

const statusColorMap: Record<string, string> = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
};

const CharacterCard = ({ id, name, image, status, species }: CharacterCardProps) => {
  const colorClass = statusColorMap[status] ?? 'bg-gray-500';

  return (
    <Link to={`/character/${id}`}>  
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
        <div className="flex items-center justify-center mb-1">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${colorClass}`} />
          <span className="capitalize">{status}</span>
        </div>
        <p className="text-center text-sm text-gray-600">{species}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;