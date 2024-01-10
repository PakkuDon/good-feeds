import { Restaurant } from "./page";

const ListView = ({ locations }: { locations: Restaurant[] }) => (
  <>
    {locations.map((location) => (
      <div key={`location-${location.id}`} className="pb-4 border-b-2">
        <strong>{location.name}</strong>
        <div className="text-xs text-gray-300">
          Listing updated at {new Date(location.updatedAt).toDateString()}
        </div>
        <p>
          <b>Address:</b> {location.address}
        </p>
        <p>{location.description}</p>
        <p>
          <b>Dietary options:</b> {location.dietaryOptions.join(", ") || "N/A"}
        </p>
        <ul className="list-disc list-inside">
          {location.links.map((link) => (
            <li key={`${location.id}-${link.label}`}>
              <a
                href={link.url}
                target="_blank"
                className="text-blue-300 hover:text-blue-500 focus:text-blue-500"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);
export default ListView;
