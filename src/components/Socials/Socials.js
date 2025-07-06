import "./Socials.css";

function Socials() {
  return (
    <section className="socials">
      <p>My socials</p>
      <div className="links">
        <a
          href="https://github.com/qokori"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a href="https://t.me/qokori" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
        <a
          href="https://ko-fi.com/qokori"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ko-Fi
        </a>
        <a
          href="https://boosty.to/qokori"
          target="_blank"
          rel="noopener noreferrer"
        >
          Boosty
        </a>
      </div>
    </section>
  );
}
export default Socials;
