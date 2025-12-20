"use client";

// Leaflet CSS used by <Map /> component
// Import early to reduce bundle size for dynamic import
import "leaflet/dist/leaflet.css";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { OptionsByType, Restaurant } from "./page";
import ListView from "./ListView";
import Sidebar from "@/components/Sidebar";
import SearchBar from "../components/SearchBar";
import MapPlaceholder from "./MapPlaceholder";
import { restaurantStatuses } from "./constants";

const Map = dynamic(() => import("./Map"), {
  loading: () => <MapPlaceholder />,
  ssr: false,
});

interface MainContentProps {
  restaurants: Restaurant[];
  options: OptionsByType;
}

export default function MainContent({
  restaurants,
  options,
}: MainContentProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    restaurantStatuses[0],
  ]);
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

  return (
    <div className="grid sm:grid-cols-[210px_1fr] sm:grid-rows-1 grid-rows-[min-content_80vh]">
      <Sidebar
        activeTab={activeTab}
        includeVisited={includeVisited}
        includeUnvisited={includeUnvisited}
        numberOfResults={restaurantResults.length}
        selectedFilters={filters}
        selectedStatuses={selectedStatuses}
        options={options}
        onTabSelect={(tab: string) => setActiveTab(tab)}
        onFilterToggle={toggleFilter}
        onStatusToggle={toggleStatusFilter}
        onUnvisitedToggle={() => setIncludeUnvisited(!includeUnvisited)}
        onVisitedToggle={() => setIncludeVisited(!includeVisited)}
      />
      <main className="main-content ">
        <SearchBar onSubmit={(query) => setSearchQuery(query.toLowerCase())} />
        {activeTab === "map" && <Map locations={restaurantResults} />}
        {activeTab === "list" && <ListView locations={restaurantResults} />}
      </main>
    </div>
  );
}
