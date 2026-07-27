import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社Mollyへのお問い合わせ ─ 経営に関するご相談はお気軽にどうぞ",
};

export default function ContactPage() {
  return <ContactForm />;
}
