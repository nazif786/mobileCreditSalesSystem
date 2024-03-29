import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Credit Sales",
  description: "Mobile Credit Card Sales Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div
            style={{ minWidth: "320px" }}
            className="flex h-screen overflow-hidden bg-zinc-200 "
          >
            <aside className="flex h-screen overflow-hidden">
              <Sidebar />
            </aside>
            <main className=" flex-1 overflow-x-hidden overflow-y-auto py-7 ">
              <header className="mb-7">
                <Navbar />
              </header>
              <div className="">{children}</div>
            </main>
          </div>
          <footer>{/* Add your footer content here */}</footer>
        </Providers>
      </body>
    </html>
  );
}
