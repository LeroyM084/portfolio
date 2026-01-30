import '../styles/Hero.css'
import textData from '../text.json'

export default function Hero() {
    return (
        <section className="hero" id="about">
            <div className="hero-content">
                <h1 className="hero-title">Matéo Leroy</h1>
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
    )
}
