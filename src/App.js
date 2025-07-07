import "./App.css";
import Header from "./components/Header/Header.js";
import ParticleBackground from "./utils/Particles/ParticleBackground.js";
import Socials from "./components/Socials/Socials.js";
import Projects from "./components/Projects/Projects.js";
import Authority from "./components/Authority/Authority.js";
import About from "./components/About/About.js";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <ParticleBackground />
        <div className="content">
          <Header />
          <div className="about-projects">
            <About />
            <Projects />
          </div>
          <Authority />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
