async function getRestaurants() {
  const response = await fetch("http://localhost:8080/api/restaurants")

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  return response.json()
}

export default async function Home() {
  const data = await getRestaurants()

  return (
    <main>
      <header>
        <h1>
          Good Feeds
        </h1>
      </header>
      <main>
        <ul>
          {data.map((restaurant: any) => (
            <li key={restaurant.id}>{restaurant.title}</li>
          ))}
        </ul>
      </main>
    </main>
  )
}
