"use client"

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { DietaryOptions, Restaurant } from "./page";

const Map = dynamic(() => import('./Map'), {
  loading: () => <p>loading...</p>,
  ssr: false
})

interface MainContentProps {
  restaurants: Restaurant[]
  dietaryOptions: DietaryOptions[]
}

export default function MainContent({ restaurants, dietaryOptions}: MainContentProps) {
  const [filters, setFilters] = useState<string[]>([])

  const toggleFilter = (label: string) => {
    if (filters.includes(label)) {
      setFilters([...filters.filter(value => value !== label)])
    } else {
      setFilters([...filters, label])
    }
  }

  const restaurantResults = restaurants.filter(restaurant => (
    filters.every(option => restaurant.dietaryOptions.includes(option))
  ))

  return (
    <>
      <aside className="main-sidebar">
        <h2>Filter options</h2>
        <ul>
        {dietaryOptions.map(({ label }) => (
          <div key={`option-${label}`}>
            <label>
              <input type="checkbox" checked={filters.includes(label)} onChange={() => toggleFilter(label)} />
              {" "}{label}
            </label>
          </div>
        ))}
        </ul>
      </aside>
      <main className="main-content">
        <Map locations={restaurantResults} />
      </main>
  </>
  )
}