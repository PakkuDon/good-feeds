"use client"

import React from 'react'
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
  return (
    <>
      <aside className="main-sidebar">
        <h2>Filter options</h2>
        <ul>
        {dietaryOptions.map(({ label }) => (
          <div key={`option-${label}`}>
            <label>
              <input type="checkbox" />
              {" "}{label}
            </label>
          </div>
        ))}
        </ul>
      </aside>
      <main className="main-content">
        <Map locations={restaurants} />
      </main>
  </>
  )
}