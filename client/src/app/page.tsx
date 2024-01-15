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
  dietaryOptions: RestaurantOption[];
  addedAt: string;
  updatedAt: string;
}

export interface RestaurantOption {
  id: number;
  label: string;
  type: string;
}

export interface DietaryOptions {
  id: number;
  label: string;
}

async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(
    `${process.env.NEXT_BACKEND_HOST}/api/restaurants`,
    { next: { revalidate: 10 } },
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
    { next: { revalidate: 10 } },
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
    <MainContent restaurants={restaurants} dietaryOptions={dietaryOptions} />
  );
}
