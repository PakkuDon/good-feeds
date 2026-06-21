import Link from "next/link";
import MainContent from "@/app/MainContent";
import { getRestaurants, getOptions, getGuides } from "@/app/requests";
import { OptionsByType } from "@/app/page";

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
      <div className="px-4 py-2">
        <h2 className="mt-0">{guide.title}</h2>
        <p>{guide.description}</p>
        <div className="text-xs text-gray-300">
          Added at {new Date(guide.addedAt).toDateString()}
        </div>
        <div className="text-xs text-gray-300">
          Updated at {new Date(guide.updatedAt).toDateString()}
        </div>
        <Link href="/">View all restaurants</Link>
      </div>
      <MainContent restaurants={restaurantsInGuide} options={optionsByGroup} />
    </>
  );
}
