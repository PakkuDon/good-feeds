"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { DietaryOptions, Restaurant } from "./page";
import ListView from "./ListView";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

interface MainContentProps {
  restaurants: Restaurant[];
  dietaryOptions: DietaryOptions[];
}

export default function MainContent({
  restaurants,
  dietaryOptions,
}: MainContentProps) {
  const [filters, setFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("map");

  const toggleFilter = (label: string) => {
    if (filters.includes(label)) {
      setFilters([...filters.filter((value) => value !== label)]);
    } else {
      setFilters([...filters, label]);
    }
  };

  const restaurantResults = restaurants.filter((restaurant) =>
    filters.every((option) => restaurant.dietaryOptions.includes(option)),
  );

  return (
    <>
      <aside className="main-sidebar px-4">
        <div>
          <button
            className="rounded bg-gray-800 hover:bg-gray-600 p-2 font-semibold text-sm"
            disabled={activeTab === "map"}
            onClick={() => setActiveTab("map")}
          >
            Show Map
          </button>
          <button
            className="rounded bg-gray-800 hover:bg-gray-600 p-2 font-semibold text-sm"
            disabled={activeTab === "list"}
            onClick={() => setActiveTab("list")}
          >
            Show List
          </button>
        </div>
        <div>
          <span>
            {restaurantResults.length}{" "}
            {restaurantResults.length === 1 ? "result" : "results"}
          </span>
        </div>
        <h2 className="font-bold">Filter options</h2>
        <ul>
          {dietaryOptions.map(({ label }) => (
            <div key={`option-${label}`}>
              <label>
                <input
                  type="checkbox"
                  checked={filters.includes(label)}
                  onChange={() => toggleFilter(label)}
                />{" "}
                {label}
              </label>
            </div>
          ))}
        </ul>
      </aside>
      <main className="main-content">
        {activeTab === "map" && <Map locations={restaurantResults} />}
        {activeTab === "list" && <ListView locations={restaurantResults} />}
      </main>
    </>
  );
}
