import { useState } from 'react'
import './App.css'
import textData from './text.json'
import projectsData from './projects.json'
import skillsData from './skills.json'

function App() {
  const [activeSkillCategory, setActiveSkillCategory] = useState<'technical' | 'soft'>('technical')

  return (
    <div className="portfolio">
      {/* HEADER NAVIGATION */}
      <header className="header">
        <nav className="nav">
          <span className="logo-text">Matéo</span>
          <ul className="nav-links">
            <li><a href="#about">À propos</a></li>
            <li><a href="#skills">Compétences</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="about">
        <div className="hero-content">
          <h1 className="hero-title">Développeur <span className="gradient-text">Full Stack</span></h1>
          <p className="hero-subtitle">{textData.about_me}</p>
          <p className="hero-description">{textData.contact}</p>
          <div className="hero-cta">
            <a href={`mailto:${textData.email}`} className="btn btn-primary">Me contacter</a>
            <a href={textData.github} target="_blank" className="btn btn-secondary">GitHub</a>
          </div>
        </div>
        <div className="hero-accent"></div>
      </section>

      {/* SKILLS SECTION */}
      <section className="skills" id="skills">
        <div className="container">
          <h2 className="section-title">Compétences</h2>
          <div className="skills-container">
            <div className="skills-tabs">
              <button 
                className={`tab ${activeSkillCategory === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveSkillCategory('technical')}
              >
                Techniques
              </button>
              <button 
                className={`tab ${activeSkillCategory === 'soft' ? 'active' : ''}`}
                onClick={() => setActiveSkillCategory('soft')}
              >
                Humaines
              </button>
            </div>
            <div className="skills-grid">
              {skillsData[activeSkillCategory === 'technical' ? 'technical skills' : 'soft skills'].map((skill, index) => (
                <div key={index} className="skill-card">
                  <span className="skill-badge">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects" id="projects">
        <div className="container">
          <h2 className="section-title">Mes Projets</h2>
          <div className="projects-grid">
            {projectsData.projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <span className={`project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {project.status}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-footer">
                  <button className="btn btn-small">En savoir plus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title">Me Joindre</h2>
          <div className="contact-content">
            <p>{textData.contact}</p>
            <div className="social-links">
              <a href={textData.linkedin} target="_blank" className="social-btn">
                LinkedIn
              </a>
              <a href={textData.github} target="_blank" className="social-btn">
                GitHub
              </a>
              <a href={`mailto:${textData.email}`} className="social-btn">
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 Matéo Leroy. Tous droits réservés.</p>
      </footer>
    </div>
  )
}

export default App
