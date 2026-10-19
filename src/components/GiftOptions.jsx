import { useState } from "react";
import { ArrowRight, CircleCheck, Heart, LockKeyhole, Send } from "lucide-react";
import { track } from "../lib/track.js";

function FreeChoiceArt() {
  return (
    <svg className="free-art" viewBox="0 0 160 140" aria-hidden="true">
      <ellipse cx="80" cy="128" rx="50" ry="6" className="secret-art-shadow" />
      <g transform="rotate(-8 80 72)">
        <rect x="42" y="22" width="76" height="98" rx="8" className="free-art-card" />
        <rect x="50" y="30" width="60" height="82" rx="5" className="free-art-inner" />
        <text x="80" y="92" textAnchor="middle" className="free-art-mark">?</text>
      </g>
      <path d="M128 30 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" className="free-art-spark" />
      <path d="M30 56 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" className="free-art-spark" />
      <path d="M134 92 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" className="free-art-spark" />
    </svg>
  );
}

const gifts = [
  {
    id: "transfer",
    title: ["Tặng", "350K"],
    image: "/assets/gift-transfer.webp",
    imageAlt: "Phong bì hồng đặt trên xấp tiền, bên cạnh bó hoa hồng",
  },
  {
    id: "dining",
    title: ["Đi ăn", "tùy bạn pick"],
    image: "/assets/gift-dinner.webp",
    imageAlt: "Một bữa ăn ngon được bày trên bàn",
  },
  {
    id: "free",
    title: ["Tùy tâm"],
    art: <FreeChoiceArt />,
    custom: true,
  },
];

function SecretGiftArt() {
  return (
    <svg className="secret-art" viewBox="0 0 160 140" aria-hidden="true">
      <ellipse cx="80" cy="128" rx="58" ry="7" className="secret-art-shadow" />
      <rect x="34" y="58" width="92" height="68" rx="4" className="secret-art-box" />
      <rect x="28" y="44" width="104" height="20" rx="3" className="secret-art-lid" />
      <rect x="74" y="44" width="12" height="82" className="secret-art-ribbon" />
      <path d="M80 44 C 60 18, 36 26, 50 42 C 58 50, 72 46, 80 44 Z M80 44 C 100 18, 124 26, 110 42 C 102 50, 88 46, 80 44 Z" className="secret-art-ribbon" />
      <rect x="70" y="84" width="20" height="18" rx="3" className="secret-art-lock" />
      <path d="M74 84 v-5 a6 6 0 0 1 12 0 v5" className="secret-art-shackle" />
    </svg>
  );
}

const giftLabel = (gift) => gift.title.join(" ");

export default function GiftOptions({ onOpenSecret }) {
  const [selected, setSelected] = useState(null);
  const [sentId, setSentId] = useState(null);
  const [secretTried, setSecretTried] = useState(false);
  const [wish, setWish] = useState("");
  const selectedGift = gifts.find((gift) => gift.id === selected);
  const isSent = selectedGift && sentId === selected;
  const needsWish = selectedGift?.custom && !wish.trim();
  const sentLabel = selectedGift?.custom ? `${giftLabel(selectedGift)}: ${wish.trim()}` : selectedGift && giftLabel(selectedGift);

  function pickGift(gift) {
    const next = selected === gift.id ? null : gift.id;
    setSelected(next);
    if (next) track("gift_pick", giftLabel(gift));
  }

  function sendGift(event) {
    event.preventDefault();
    if (needsWish) return;
    track("gift_send", sentLabel);
    setSentId(selected);
  }

  function openSecret() {
    setSecretTried(true);
    track("secret_open");
    onOpenSecret();
  }

  return (
    <section className="gifts-section" id="gifts" aria-labelledby="gifts-title">
      <div className="divider" aria-hidden="true"><Heart size={12} fill="currentColor" strokeWidth={0} /></div>
      <h2 id="gifts-title" className="section-title">Chọn một món quà nhỏ<br />cho ngày của bạn</h2>

      <ul className="gift-grid" aria-label="Các lựa chọn quà tặng">
        {gifts.map((gift) => (
          <li key={gift.id}>
            <button
              className="gift-card"
              type="button"
              aria-pressed={selected === gift.id}
              onClick={() => pickGift(gift)}
            >
              <span className="gift-art">
                {gift.art ?? <img src={gift.image} alt={gift.imageAlt} loading="lazy" />}
              </span>
              <span className="gift-name">
                {gift.title.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}
              </span>
              <span className="gift-arrow" aria-hidden="true">
                {selected === gift.id ? <Heart size={15} fill="currentColor" strokeWidth={0} /> : <ArrowRight size={16} />}
              </span>
            </button>
          </li>
        ))}
        <li>
          <button className="gift-card gift-card--secret" type="button" onClick={openSecret} aria-haspopup="dialog">
            <span className="gift-art"><SecretGiftArt /></span>
            <span className="gift-name">Quà đặc biệt</span>
            <span className="gift-arrow" aria-hidden="true"><LockKeyhole size={15} /></span>
          </button>
        </li>
      </ul>

      <div className="gift-footer" aria-live="polite">
        {isSent ? (
          <div className="gift-sent" role="status">
            <CircleCheck className="gift-sent-icon" size={26} strokeWidth={1.6} aria-hidden="true" />
            <p className="gift-sent-title">Gửi thành công!</p>
            <p>
              Mình nhận được lựa chọn <strong>{giftLabel(selectedGift)}</strong>
              {selectedGift.custom && <> — “{wish.trim()}”</>} rồi nhé.
            </p>
            {!secretTried && (
              <p className="gift-sent-tease">
                Mà… bộ bạn không quan tâm quà đặc biệt là gì à? 👀{" "}
                <button className="link-button" type="button" onClick={openSecret} aria-haspopup="dialog">Xem thử</button>
              </p>
            )}
          </div>
        ) : selectedGift ? (
          <form className="gift-send-form" onSubmit={sendGift}>
            {selectedGift.custom ? (
              <>
                <label className="gift-status" htmlFor="gift-wish">Tùy tâm thì bạn muốn quà gì nè?</label>
                <input
                  id="gift-wish"
                  className="wish-input"
                  type="text"
                  value={wish}
                  onChange={(event) => setWish(event.target.value)}
                  placeholder="Ví dụ: một ly matcha latte full size…"
                  maxLength={150}
                  autoComplete="off"
                  autoFocus
                />
              </>
            ) : (
              <p className="gift-status">Bạn chọn <strong>{giftLabel(selectedGift)}</strong> — chốt luôn nhé?</p>
            )}
            <button className="send-gift" type="submit" disabled={needsWish}>
              <Send size={16} aria-hidden="true" />
              <span>Gửi lựa chọn</span>
            </button>
          </form>
        ) : (
          <p className="gift-status">Chạm vào món quà bạn thích nhất nhé.</p>
        )}
      </div>
    </section>
  );
}
