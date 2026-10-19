import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { track } from "./lib/track.js";
import SiteHeader from "./components/SiteHeader.jsx";
import HeroSection from "./components/HeroSection.jsx";
import GiftOptions from "./components/GiftOptions.jsx";
import SecretGiftDialog from "./components/SecretGiftDialog.jsx";
import FallingPetals from "./components/FallingPetals.jsx";

export default function App() {
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  useEffect(() => {
    // StrictMode runs effects twice in dev; log the visit only once per page load.
    if (window.__visitTracked) return;
    window.__visitTracked = true;
    track("visit");
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">Bỏ qua phần đầu trang</a>
      <FallingPetals />
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <GiftOptions onOpenSecret={() => setIsSecretOpen(true)} />
      </main>
      <footer className="site-footer" id="message">
        <p className="footer-note">Chúc bạn một ngày 20/10 thật vui — và cả những ngày sau nữa.</p>
      </footer>
      <SecretGiftDialog open={isSecretOpen} onClose={() => setIsSecretOpen(false)} />
    </MotionConfig>
  );
}
