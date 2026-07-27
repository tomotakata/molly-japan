import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "株式会社Molly | 孤独な経営者の味方",
    template: "%s | 株式会社Molly",
  },
  description:
    "経営者の「内なる意志」と「外の経営構造」を同期させ、再現性ある成長へ導く参謀。株式会社Molly 代表取締役 森行秀和",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://molly-japan.co.jp",
    siteName: "株式会社Molly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
