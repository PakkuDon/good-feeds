import type { Restaurant, RestaurantOption } from "./page";
import type { Guide } from "./guides/page";

export async function getRestaurants(): Promise<Restaurant[]> {
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

export async function getOptions(): Promise<RestaurantOption[]> {
  const response = await fetch(`${process.env.NEXT_BACKEND_HOST}/api/options`, {
    next: { revalidate: 10 },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data from /api/options");
  }
  return json;
}

export async function getGuides(): Promise<{ [slug: string]: Guide }> {
  const response = await fetch(
    `${process.env.NEXT_BACKEND_HOST}/static/guides.json`,
    {
      next: { revalidate: 10 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from /guides.json");
  }

  const json = await response.json();
  return json;
}
