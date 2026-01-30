import '../styles/Projects.css'
import projectsData from '../projects.json'

export default function Projects() {
    return (
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
    )
}
