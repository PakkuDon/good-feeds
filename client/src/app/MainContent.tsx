"use client";

// Leaflet CSS used by <Map /> component
// Import early to reduce bundle size for dynamic import
import "leaflet/dist/leaflet.css";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { OptionsByType, Restaurant } from "./page";
import ListView from "./ListView";
import CollapsibleSection from "@/components/CollapsibleSection";
import SearchBar from "../components/SearchBar";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

interface MainContentProps {
  restaurants: Restaurant[];
  options: OptionsByType;
}

// List taken from api/db/migrations/11_add_restaurant_status.up.sql
// We could retrieve this from the backend but these values are not expected
// to change often so it's hard-coded here for convenience
const statuses = ["Operational", "Temporarily closed", "Permanently closed"];

export default function MainContent({
  restaurants,
  options,
}: MainContentProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    statuses[0],
  ]);
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [filters, setFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("map");
  const [includeVisited, setIncludeVisited] = useState<boolean>(true);
  const [includeUnvisited, setIncludeUnvisited] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (label: string) => {
    if (filters.includes(label)) {
      setFilters([...filters.filter((value) => value !== label)]);
    } else {
      setFilters([...filters, label]);
    }
  };

  const toggleStatusFilter = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses([
        ...selectedStatuses.filter((value) => value !== status),
      ]);
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const restaurantResults = restaurants.filter(
    (restaurant) =>
      ((includeVisited && restaurant.visited) ||
        (includeUnvisited && !restaurant.visited)) &&
      filters.every((option) => restaurant.options.includes(option)) &&
      selectedStatuses.includes(restaurant.status) &&
      (restaurant.name.toLowerCase().includes(searchQuery) ||
        restaurant.address.toLowerCase().includes(searchQuery) ||
        restaurant.description.toLowerCase().includes(searchQuery)),
  );

  const selectableButtonClasses =
    "rounded bg-gray-800 hover:bg-gray-600 p-2 font-semibold text-sm";
  const activeButtonClasses = "rounded bg-blue-500 p-2 font-semibold text-sm";

  return (
    <div className="grid sm:grid-cols-[210px_1fr] sm:grid-rows-1 grid-rows-[min-content_80vh]">
      <aside className="max-h-full px-4">
        <div>
          <button
            className={
              activeTab === "map"
                ? activeButtonClasses
                : selectableButtonClasses
            }
            disabled={activeTab === "map"}
            onClick={() => setActiveTab("map")}
          >
            Show Map
          </button>
          <button
            className={
              activeTab === "list"
                ? activeButtonClasses
                : selectableButtonClasses
            }
            disabled={activeTab === "list"}
            onClick={() => setActiveTab("list")}
          >
            Show List
          </button>
        </div>
        <div className="pb-4">
          <label>
            <input
              type="checkbox"
              checked={showFilters}
              onChange={() => setShowFilters(!showFilters)}
            />{" "}
            Show filters
          </label>
        </div>
        {showFilters && (
          <>
            <div>
              <span>
                {restaurantResults.length}{" "}
                {restaurantResults.length === 1 ? "result" : "results"}
              </span>
            </div>
            <div className="pb-4">
              <div>
                <div className="font-bold text">Filters</div>
                <label>
                  <input
                    type="checkbox"
                    checked={includeVisited}
                    onChange={() => setIncludeVisited(!includeVisited)}
                  />{" "}
                  Show visited
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={includeUnvisited}
                    onChange={() => setIncludeUnvisited(!includeUnvisited)}
                  />{" "}
                  Show unvisited
                </label>
              </div>
            </div>
            <CollapsibleSection
              key="group-statuses"
              heading="Restaurant status"
            >
              {statuses.map((status) => (
                <div key={`status-${status}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status)}
                      onChange={() => toggleStatusFilter(status)}
                    />{" "}
                    {status}
                  </label>
                </div>
              ))}
            </CollapsibleSection>
            {Object.entries(options).map(([type, options]) => (
              <CollapsibleSection
                key={`group-${type}`}
                heading={`${type} options`}
              >
                {options.map((option: string) => (
                  <div key={`option-${option}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.includes(option)}
                        onChange={() => toggleFilter(option)}
                      />{" "}
                      {option}
                    </label>
                  </div>
                ))}
              </CollapsibleSection>
            ))}
          </>
        )}
      </aside>
      <main className="main-content ">
        <SearchBar onSubmit={(query) => setSearchQuery(query.toLowerCase())} />
        {activeTab === "map" && <Map locations={restaurantResults} />}
        {activeTab === "list" && <ListView locations={restaurantResults} />}
      </main>
    </div>
  );
}
