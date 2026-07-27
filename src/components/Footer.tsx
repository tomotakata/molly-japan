import Link from "next/link";

const footerNav = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "代表プロフィール" },
  { href: "/service", label: "サポート" },
  { href: "/company", label: "会社概要" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "お問い合わせ" },
];

const socialLinks = [
  {
    href: "https://x.com/333hidekazu",
    label: "X (Twitter)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/profile.php?id=100013400046134",
    label: "Facebook",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://note.com/molly_hidekazu",
    label: "note",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM11 7v4H7v2h4v4h2v-4h4v-2h-4V7h-2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <h3 className="font-serif text-2xl text-white tracking-wider mb-2">
              Molly
            </h3>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-6">
              株式会社Molly
            </p>
            <p className="text-sm leading-relaxed text-white/50">
              孤独な経営者の味方として、
              <br />
              あなたの今と未来に伴走します。
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] text-white/40 mb-6">
              NAVIGATION
            </h4>
            <nav className="flex flex-col gap-3">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] text-white/40 mb-6">
              COMPANY INFO
            </h4>
            <div className="space-y-3 text-sm text-white/50">
              <p>〒633-0063</p>
              <p>奈良県桜井市川合253-15-103</p>
              <p>info@molly-japan.co.jp</p>
              <p>営業時間 10:00〜17:00</p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/25 tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Molly Co., Ltd. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
