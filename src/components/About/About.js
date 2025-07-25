import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./About.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";

function About() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const AboutRef = useRef();

  useEffect(() => {
    if (AboutRef.current) {
      gsap.set(AboutRef.current, { opacity: 0, y: 30 });
      gsap.to(AboutRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.8,
      });
    }
  }, []);
  return (
    <section ref={AboutRef} className="about">
      <div>
        <p className="about-name">{t.aboutMe}</p>
      </div>
      <div className="about-description">
        <p>{t.aboutText}</p>
      </div>
    </section>
  );
}

export default About;
