import Link from "next/link";

interface Guide {
  title: string;
  description: string;
  restaurantIds: number[];
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

export default async function Guides() {
  const guides = await getGuides();

  return (
    <div className="px-4 pt-4">
      <div className="main-sidebar pt-4">
        <Link href="/">Back to index</Link>
      </div>
      <h2>Guides</h2>
      <ul>
        {Object.entries(guides).map(([slug, guide]) => (
          <div key={`guide-${slug}`} className="pb-4 border-b-2">
            <strong>{guide.title}</strong>
            <div>{guide.description}</div>
            <div>{guide.restaurantIds.length} restaurants listed</div>
          </div>
        ))}
      </ul>
    </div>
  );
}
