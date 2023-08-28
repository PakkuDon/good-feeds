interface Restaurant {
  id: number
  name: string
  latitude: number
  longitude: number
}

const Map = ({ locations }: { locations: Restaurant[] }) => (
  <ul>
    {locations.map((location: Restaurant) => (
      <li key={location.id}>{location.name}</li>
    ))}
  </ul>
)

async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch("http://localhost:8080/api/restaurants")

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  return response.json()
}

export default async function Home() {
  const data = await getRestaurants()

  return (
    <main className="main">
      <header className="main-header">
        <h1>
          Good Feeds
        </h1>
      </header>
      <aside className="main-sidebar">
        Sidebar
      </aside>
      <main className="main-content">
        <Map locations={data} />
      </main>
    </main>
  )
}
