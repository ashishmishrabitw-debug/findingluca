import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WHPC | Search and Research Laboratory",
  description:
    "A research laboratory dedicated to pioneering the next generation of medicine through science, technology, and human curiosity.",
  openGraph: {
    title: "WHPC | Search and Research Laboratory",
    description:
      "A research laboratory dedicated to pioneering the next generation of medicine through science, technology, and human curiosity.",
    siteName: "WHPC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <Navbar posts={posts} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
