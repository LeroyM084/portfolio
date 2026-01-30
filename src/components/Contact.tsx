import '../styles/Contact.css'
import textData from '../text.json'

export default function Contact() {
    return (
        <section className="contact" id="contact">
            <div className="container">
                <h2 className="section-title">Me Joindre</h2>
                <div className="contact-card">
                    <p className="contact-text">{textData.contact}</p>
                    <div className="social-links">
                        <a href={textData.linkedin} target="_blank" className="social-btn linkedin">
                            LinkedIn
                        </a>
                        <a href={textData.github} target="_blank" className="social-btn github">
                            GitHub
                        </a>
                        <a href={`mailto:${textData.email}`} className="social-btn email">
                            Email
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
