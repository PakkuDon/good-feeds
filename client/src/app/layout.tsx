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
      <body className={inter.className}>
        <main className="main">
          <header className="main-header px-4 pt-4">
            <h1 className="text-2xl font-bold">Good Feeds</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
