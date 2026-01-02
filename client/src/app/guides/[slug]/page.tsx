import Link from "next/link";
import MainContent from "@/app/MainContent";
import type { Guide } from "../page";
import { OptionsByType, Restaurant, RestaurantOption } from "@/app/page";

export async function generateStaticParams() {
  const guides = await getGuides();
  return Object.keys(guides).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guides = await getGuides();
  const guide = guides[slug];

  const titlePrefix =
    process.env.NODE_ENV === "development" ? "[Development] " : "";

  return {
    title: `${titlePrefix} ${guide.title} | Good Feeds`,
    description: guide.description,
  };
}

async function getGuides(): Promise<{ [slug: string]: Guide }> {
  const response = await fetch(`${process.env.NEXT_CLIENT_URL}/guides.json`, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from /guides.json");
  }

  const json = await response.json();
  return json;
}

// TODO: Reduce duplication with @/app/page
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

export default async function GuideDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurants = await getRestaurants();
  const options = await getOptions();
  const guides = await getGuides();
  const optionsByGroup: OptionsByType = {};
  options.forEach((option) => {
    if (!optionsByGroup[option.type]) {
      optionsByGroup[option.type] = [];
    }
    optionsByGroup[option.type].push(option.label);
  });

  const guide = guides[slug];
  const restaurantsInGuide = restaurants.filter(({ id }) =>
    guide.restaurantIds.includes(id),
  );

  return (
    <>
      <div className="main-sidebar px-4 py-2">
        <h2 className="mt-0">{guide.title}</h2>
        <p>{guide.description}</p>
        <Link href="/">View all restaurants</Link>
      </div>
      <MainContent restaurants={restaurantsInGuide} options={optionsByGroup} />
    </>
  );
}
