import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), {
  loading: () => <p>loading...</p>,
  ssr: false
})

export interface Restaurant {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
}

export interface DietaryOptions {
  id: number
  label: string
}

async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch("http://localhost:8080/api/restaurants")

  if (!response.ok) {
    throw new Error("Failed to fetch data from /api/restaurants")
  }
  return response.json()
}

async function getDietaryOptions(): Promise<DietaryOptions[]> {
  const response = await fetch("http://localhost:8080/api/dietaryOptions")

  if (!response.ok) {
    throw new Error("Failed to fetch data from /api/dietaryOptions")
  }
  return response.json()
}

export default async function Home() {
  const restaurants = await getRestaurants()
  const dietaryOptions = await getDietaryOptions()

  return (
    <main className="main">
      <header className="main-header">
        <h1>
          Good Feeds
        </h1>
      </header>
      <aside className="main-sidebar">
        <h2>Filter options</h2>
        <ul>
        {dietaryOptions.map(({ label }) => (
          <li key={`option-${label}`}>{label}</li>
        ))}
        </ul>
      </aside>
      <main className="main-content">
        <Map locations={restaurants} />
      </main>
    </main>
  )
}
