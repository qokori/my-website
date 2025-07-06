import "./App.css";
import Header from "./components/Header/Header.js";
import ParticleBackground from "./utils/Particles/ParticleBackground.js";
import Socials from "./components/Socials/Socials.js";
import Projects from "./components/Projects/Projects.js";
import Authority from "./components/Authority/Authority.js";

function App() {
  return (
    <div className="App">
      <ParticleBackground />
      <div className="content">
        <Header />
        <Projects />
        <Authority />
      </div>
    </div>
  );
}

export default App;
