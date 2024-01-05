import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), {
  loading: () => <p>loading...</p>,
  ssr: false
})

export interface Restaurant {
  id: number
  name: string
  address: string
  description: string
  latitude: number
  longitude: number
  links: {
    label: string
    url: string
  }[]
  dietaryOptions: string[]
}

export interface DietaryOptions {
  id: number
  label: string
}

async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_HOST}/api/restaurants`)
  const json = await response.json()

  if (!response.ok) {
    throw new Error("Failed to fetch data from /api/restaurants")
  }
  return json.data
}

async function getDietaryOptions(): Promise<DietaryOptions[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_HOST}/api/dietaryOptions`)
  const json = await response.json()

  if (!response.ok) {
    throw new Error("Failed to fetch data from /api/dietaryOptions")
  }
  return json.data
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
