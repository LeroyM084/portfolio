import '../styles/Header.css'
export default function Header() {
    return (
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
    )
}
