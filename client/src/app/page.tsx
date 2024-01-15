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
  options: RestaurantOption[];
  addedAt: string;
  updatedAt: string;
}

export interface RestaurantOption {
  id: number;
  label: string;
  type: string;
}

export interface OptionsByType {
  [index: string]: string[];
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

async function getOptions(): Promise<RestaurantOption[]> {
  const response = await fetch(`${process.env.NEXT_BACKEND_HOST}/api/options`, {
    next: { revalidate: 10 },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data from /api/options");
  }
  return json;
}

export default async function Home() {
  const restaurants = await getRestaurants();
  const options = await getOptions();
  const optionsByGroup: OptionsByType = {};
  options.forEach((option) => {
    if (!optionsByGroup[option.type]) {
      optionsByGroup[option.type] = [];
    }
    optionsByGroup[option.type].push(option.label);
  });

  return <MainContent restaurants={restaurants} options={optionsByGroup} />;
}
