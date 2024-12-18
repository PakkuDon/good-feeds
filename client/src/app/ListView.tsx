"use client";
import { useState } from "react";
import { Restaurant } from "./page";

const ListView = ({ locations }: { locations: Restaurant[] }) => {
  const [orderBy, setOrderBy] = useState<string>("id");
  let sortedLocations = [...locations];

  switch (orderBy) {
    case "id":
      sortedLocations.sort((a, b) => b.id - a.id);
      break;
    case "name":
      sortedLocations.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      );
      break;
    case "lastUpdated":
      sortedLocations.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
      break;
  }

  return (
    <>
      <div className="px-4 pb-4">
        <label htmlFor="sortOrder">Order results by: </label>
        <select
          id="sortOrder"
          value={orderBy}
          onChange={(event) => setOrderBy(event.target.value)}
          className="bg-gray-800 p-2 rounded text-sm"
        >
          <option value="id">Date added</option>
          <option value="name">Name (A-Z)</option>
          <option value="lastUpdated">Last updated</option>
        </select>
      </div>
      {sortedLocations.length === 0 && (
        <div className="p-4">
          <p className="font-bold">No results found</p>
          <p>Please check your filters and try again.</p>
        </div>
      )}
      {sortedLocations.map((location) => (
        <div key={`location-${location.id}`} className="px-4 pb-4 border-b-2">
          <strong>{location.name}</strong>
          <div className="text-xs text-gray-300">
            Listing updated at {new Date(location.updatedAt).toDateString()}
          </div>
          {location.status !== "Operational" && (
            <div className="bg-red-800">
              <b>Status: </b> {location.status}
            </div>
          )}
          <p>
            <b>Address:</b> {location.address}
          </p>
          <p>{location.description}</p>
          <p>
            <b>Options:</b>{" "}
            {location.options.map((option) => option.label).join(", ") || "N/A"}
          </p>
          <ul>
            {location.links.map((link) => (
              <li key={`${location.id}-${link.label}`}>
                <a href={link.url} target="_blank">
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
