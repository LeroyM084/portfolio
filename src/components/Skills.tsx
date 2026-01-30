import '../styles/Skills.css'
import skillsData from '../skills.json'

export default function Skills() {
    return (
        <section className="skills" id="skills">
            <div className="container">
                <h2 className="section-title">Compétences</h2>

                <div className="skills-wrapper">
                    <div className="skills-category">
                        <h3 className="subsection-title">Techniques</h3>
                        <div className="skills-grid">
                            {skillsData['technical skills'].map((skill, index) => (
                                <div key={index} className="skill-card technical">
                                    <span className="skill-badge">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="skills-category">
                        <h3 className="subsection-title">Humaines</h3>
                        <div className="skills-grid">
                            {skillsData['soft skills'].map((skill, index) => (
                                <div key={index} className="skill-card soft">
                                    <span className="skill-badge">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="skills-category">
                        <h3 className="subsection-title">En cours d'apprentissage</h3>
                        <div className="skills-grid">
                            {skillsData['working on'].map((skill, index) => (
                                <div key={index} className="skill-card soft">
                                    <span className="skill-badge">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
