import Link from "next/link";

export default function About() {
  return (
    <div>
      <div className="main-sidebar px-4 pt-4">
        <Link href="/">Back to index</Link>
      </div>
      <div className="px-4 pt-4">
        <div className="pb-4">
          <h2>About Good Feeds</h2>
          <h3>What is this?</h3>
          <p>
            This is a site to find restaurants, cafes and other eateries based
            around Melbourne, Victoria, Australia. I built this to try and make
            it easier to pick a place to go to given a set of dietary
            requirements or other constraints.
          </p>
        </div>
        <div className="pb-4">
          <h3>Where does the data come from?</h3>
          <p>
            {`The restaurants shown here are restaurants that I've been to and
            would recommend. I may add other restaurants that I haven't been to
            but have heard good things about at a later point in time.`}
          </p>
          <p>
            {`The data shown here has been copy-pasted from other sources like the
            Google and each restaurant's social media pages. This is an ad-hoc
            process so the details shown here may not be up to date. I recommend
            checking the websites listed for a given restaurant to confirm any
            specifics.`}
          </p>
          <p>
            Coordinates were a rough guess based on the URL shown in Google Maps
            and may be inaccurate.
          </p>
        </div>
        <div className="pb-4">
          <h3>
            {`I didn't find anything that I liked. Where can I find more
            recommendations?`}
          </h3>
          <div>
            If you are looking for locations based in Victoria, Australia the
            following links may help:
            <ul className="list-disc list-inside">
              <li>
                <a
                  href="https://whatson.melbourne.vic.gov.au/eat-and-drink"
                  target="_blank"
                >
                  {`Eat and drink | What's On Melbourne`}
                </a>
              </li>
              <li>
                <a
                  href="https://www.broadsheet.com.au/melbourne/food-and-drink"
                  target="_blank"
                >
                  Melbourne Food and drink | Broadsheet
                </a>
              </li>
              <li>
                <a href="https://www.opentable.com.au/" target="_blank">
                  OpenTable
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
