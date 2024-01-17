"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { OptionsByType, Restaurant, RestaurantOption } from "./page";
import ListView from "./ListView";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>loading...</p>,
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
    filters.every((option) =>
      restaurant.options.map((option) => option.label).includes(option),
    ),
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
        <ul>
          {Object.entries(options).map(([type, options]) => (
            <div key={`group-${type}`} className="pb-4">
              <h2 className="font-bold">
                <span className="capitalize">{type}</span> options
              </h2>
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