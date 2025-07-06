import "./Header.css";

function Header() {
  return (
    <section>
      <div className="hi">
        <h1>Hi,</h1>
        <h1>I'm qokori</h1>
      </div>
      <div className="desc">
        <p>Alabuga Polytech student, web developer</p>
      </div>
      <section className="socials-buttons">
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
