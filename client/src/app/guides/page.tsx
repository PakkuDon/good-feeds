import Link from "next/link";

export interface Guide {
  title: string;
  description: string;
  restaurantIds: number[];
  addedAt: string;
  updatedAt: string;
}

const titlePrefix =
  process.env.NODE_ENV === "development" ? "[Development] " : "";

export const metadata = {
  title: `${titlePrefix} Guides | Good Feeds`,
  description:
    "Recommended restaurants in Melbourne, Victoria, Australia and surrounding suburbs.",
};

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

export default async function Guides() {
  const guides = await getGuides();

  return (
    <div className="px-4 pt-4">
      <h2>Guides</h2>
      <ul>
        {Object.entries(guides).map(([slug, guide]) => (
          <div key={`guide-${slug}`} className="pb-4 border-b-2">
            <Link href={`/guides/${slug}`}>
              <strong>{guide.title}</strong>
            </Link>
            <div>{guide.description}</div>
            <div>{guide.restaurantIds.length} restaurants listed</div>
            <div className="text-xs text-gray-300">
              Added at {new Date(guide.addedAt).toDateString()}
            </div>
            <div className="text-xs text-gray-300">
              Updated at {new Date(guide.updatedAt).toDateString()}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
