"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/service", label: "Support" },
  { href: "/company", label: "Company" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link href="/" className="flex flex-col">
              <span
                className={`font-serif text-xl lg:text-2xl font-semibold tracking-wider transition-colors duration-500 ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                Molly
              </span>
              <span
                className={`text-[10px] tracking-[0.3em] transition-colors duration-500 ${
                  isScrolled ? "text-black/50" : "text-white/60"
                }`}
              >
                株式会社Molly
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-[0.15em] hover-line transition-colors duration-500 ${
                    isScrolled ? "text-black/80" : "text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={`ml-4 px-6 py-2.5 text-sm tracking-[0.15em] transition-all duration-300 ${
                  isScrolled
                    ? "border border-black text-black hover:bg-black hover:text-white"
                    : "border border-white/50 text-white hover:bg-white hover:text-black"
                }`}
              >
                お問い合わせ
              </Link>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="メニュー"
            >
              <span
                className={`w-6 h-px transition-all duration-300 ${
                  isMenuOpen
                    ? "rotate-45 translate-y-[3.5px] bg-black"
                    : isScrolled
                    ? "bg-black"
                    : "bg-white"
                }`}
              />
              <span
                className={`w-6 h-px transition-all duration-300 ${
                  isMenuOpen
                    ? "-rotate-45 -translate-y-[3.5px] bg-black"
                    : isScrolled
                    ? "bg-black"
                    : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-2xl tracking-[0.2em] text-black hover:text-black/50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 px-8 py-3 border border-black text-black tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </>
  );
}
