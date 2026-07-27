import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理画面 | 株式会社Molly",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">{children}</div>
  );
}
