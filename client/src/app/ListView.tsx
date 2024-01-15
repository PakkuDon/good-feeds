"use client";
import { useEffect, useState } from "react";
import { Restaurant } from "./page";

const ListView = ({ locations }: { locations: Restaurant[] }) => {
  const [orderBy, setOrderBy] = useState<string>("name");
  const [sortedLocations, setSortedLocations] = useState<Restaurant[]>([]);

  useEffect(() => {
    let result = [...locations];
    switch (orderBy) {
      case "id":
        result.sort((a, b) => b.id - a.id);
        break;
      case "name":
        result.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );
        break;
      case "lastUpdated":
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        break;
    }
    setSortedLocations(result);
  }, [locations, orderBy]);

  return (
    <>
      <div className="pb-4">
        <label htmlFor="sortOrder">Order results by: </label>
        <select
          id="sortOrder"
          value={orderBy}
          onChange={(event) => setOrderBy(event.target.value)}
          className="bg-gray-800"
        >
          <option value="name">Name (A-Z)</option>
          <option value="id">Date added</option>
          <option value="lastUpdated">Last updated</option>
        </select>
      </div>
      {sortedLocations.map((location) => (
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
            <b>Dietary options:</b>{" "}
            {location.dietaryOptions.map((option) => option.label).join(", ") ||
              "N/A"}
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
};

export default ListView;
