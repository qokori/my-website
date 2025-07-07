import "./Projects.css";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";

function Projects() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const projectsData = t.projects;
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    if (projectsRef.current) {
      gsap.set(projectsRef.current, { opacity: 0, y: 30 });
      gsap.to(projectsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.9,
      });
    }
  }, []);

  const openModal = (projectKey) => {
    setSelectedProject(projectsData[projectKey]);

    requestAnimationFrame(() => {
      if (modalRef.current && overlayRef.current) {
        gsap.set([modalRef.current, overlayRef.current], { display: "flex" });
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
        gsap.fromTo(
          modalRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power3" }
        );
      }
    });
  };

  const closeModal = () => {
    if (modalRef.current && overlayRef.current) {
      gsap.to(modalRef.current, { scale: 0.8, opacity: 0, duration: 0.3 });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setSelectedProject(null);
          if (modalRef.current && overlayRef.current) {
            gsap.set([modalRef.current, overlayRef.current], {
              display: "none",
            });
          }
        },
      });
    }
  };

  return (
    <>
      <section ref={projectsRef} className="projects">
        <p>{t.myProjects}</p>
        <div className="pro-links">
          {Object.keys(projectsData).map((projectKey) => (
            <button key={projectKey} onClick={() => openModal(projectKey)}>
              {projectsData[projectKey].title}
            </button>
          ))}
        </div>
      </section>

      {selectedProject && (
        <div ref={overlayRef} className="modal-overlay" onClick={closeModal}>
          <div
            ref={modalRef}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <a
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {t.openText}
            </a>

            <div className="technologies">
              {selectedProject.technologies.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Projects;
