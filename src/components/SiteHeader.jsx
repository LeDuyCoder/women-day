import { Heart } from "lucide-react";

const links = [
  { href: "#top", label: "Trang chủ" },
  { href: "#letter", label: "Lá thư" },
  { href: "#gifts", label: "Chọn quà" },
  { href: "#message", label: "Lời nhắn" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Gửi một người bạn đặc biệt, về đầu trang">
        <Heart className="wordmark-mark" strokeWidth={1.6} aria-hidden="true" />
        <span>Gửi một người<br />bạn đặc biệt</span>
      </a>
      <nav className="site-nav" aria-label="Điều hướng chính">
        {links.map((link, index) => (
          <a key={link.href} href={link.href} aria-current={index === 0 ? "page" : undefined}>{link.label}</a>
        ))}
      </nav>
      <a className="header-cta" href="#letter">
        <span>Dành riêng cho bạn</span>
        <Heart size={13} strokeWidth={2} aria-hidden="true" />
      </a>
    </header>
  );
}
