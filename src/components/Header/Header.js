import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Header() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const hiRef = useRef(null);
  const nameRef = useRef(null);
  const avatarRef = useRef(null);
  const descRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    fetch("https://api.github.com/users/qokori")
      .then((response) => response.json())
      .then((data) => setAvatarUrl(data.avatar_url));
  }, []);

  useEffect(() => {
    if (avatarUrl) {
      const tl = gsap.timeline();

      // Скрываем все элементы
      gsap.set(
        [
          hiRef.current,
          nameRef.current,
          avatarRef.current,
          descRef.current,
          socialsRef.current,
        ],
        { opacity: 0, y: 20 }
      );

      // Анимация появления
      tl.to(hiRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(avatarRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
    }
  }, [avatarUrl]);

  return (
    <section>
      <div className="header-content">
        {avatarUrl && (
          <img
            ref={avatarRef}
            src={avatarUrl}
            alt="Avatar"
            className="avatar"
          />
        )}
        <div className="hi">
          <h1 ref={hiRef}>Hi,</h1>
          <h1 ref={nameRef}>I'm qokori</h1>
        </div>
      </div>
      <div ref={descRef} className="desc">
        <p>Alabuga Polytech student, web developer</p>
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
