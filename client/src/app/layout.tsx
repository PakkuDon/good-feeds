import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Good Feeds",
  description: "A place to find and recommend places to eat or drink.",
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
            <h1 className="text-2xl font-bold">Good Feeds</h1>
            <div className="flex gap-4">
              <Link
                href="/about"
                className="text-blue-300 hover:text-blue-500 focus:text-blue-500"
              >
                About
              </Link>
              <Link
                target="_blank"
                href="https://github.com/PakkuDon/good-feeds/blob/main/CHANGELOG.md"
                className="text-blue-300 hover:text-blue-500 focus:text-blue-500"
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
