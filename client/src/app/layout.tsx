import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Good Feeds",
  description:
    "Recommended restaurants in Melbourne, Victoria, Australia and surrounding suburbs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/good-feeds/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} h-screen text-white bg-black`}>
        <div className="min-h-full grid grid-rows-[min-content_1fr]">
          <header className="main-header px-4 pt-4 flex justify-between flex-row">
            <h1>Good Feeds</h1>
            <div className="flex gap-4">
              <Link href="/about">About</Link>
              <Link
                target="_blank"
                href="https://github.com/PakkuDon/good-feeds/blob/main/CHANGELOG.md"
              >
                Changelog
              </Link>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
