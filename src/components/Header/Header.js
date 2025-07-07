import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";

function Header() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [avatarUrl, setAvatarUrl] = useState("");
  const hiRef = useRef(null);
  const nameRef = useRef(null);
  const avatarRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    fetch("https://api.github.com/users/qokori")
      .then((response) => response.json())
      .then((data) => setAvatarUrl(data.avatar_url))
      .catch(() => setAvatarUrl("https://github.com/qokori.png"));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = [
        hiRef.current,
        nameRef.current,
        avatarRef.current,
        socialsRef.current,
      ].filter(Boolean);

      gsap.set(elements, { opacity: 0, y: 20 });

      const tl = gsap.timeline();
      tl.to(hiRef.current, { opacity: 1, y: 0, duration: 0.6 }).to(
        [nameRef.current, avatarRef.current, socialsRef.current],
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        "+=0.5"
      );
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <a onClick={toggleLanguage} className="lang-toggle">
        {language === "ru" ? "RU" : "EN"}
      </a>
      <div className="header-content">
        <img
          ref={avatarRef}
          src={avatarUrl || "https://github.com/qokori.png"}
          alt="Avatar"
          className="avatar"
        />
        <div className="hi">
          <h1 ref={hiRef}>{t.hi}</h1>
          <h1 ref={nameRef}>{t.name}</h1>
        </div>
      </div>
      <section ref={socialsRef} className="socials-buttons">
        <button
          className="telega"
          onClick={() => window.open("https://t.me/qokori")}
        >
          <img src="/icons/telegram.svg" alt="Telegram" />
          @qokori
        </button>
        <button
          className="kofi"
          onClick={() => window.open("https://ko-fi.com/qokori")}
        >
          <img src="/icons/ko-fi.svg" alt="Ko-Fi" />
          Ko-Fi
        </button>
        <button
          className="gith"
          onClick={() => window.open("https://github.com/qokori")}
        >
          <img src="/icons/github.svg" alt="Github" />
          Github
        </button>
      </section>
    </section>
  );
}
export default Header;
