import MainContent from "./MainContent";

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  links: {
    label: string;
    url: string;
  }[];
  dietaryOptions: string[];
  addedAt: string;
  updatedAt: string;
}

export interface DietaryOptions {
  id: number;
  label: string;
}

async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(
    `${process.env.NEXT_BACKEND_HOST}/api/restaurants`,
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data from /api/restaurants");
  }
  return json;
}

async function getDietaryOptions(): Promise<DietaryOptions[]> {
  const response = await fetch(
    `${process.env.NEXT_BACKEND_HOST}/api/dietaryOptions`,
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data from /api/dietaryOptions");
  }
  return json;
}

export default async function Home() {
  const restaurants = await getRestaurants();
  const dietaryOptions = await getDietaryOptions();

  return (
    <main className="main">
      <header className="main-header">
        <h1>Good Feeds</h1>
      </header>
      <MainContent restaurants={restaurants} dietaryOptions={dietaryOptions} />
    </main>
  );
}
