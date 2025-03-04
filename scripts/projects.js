export const projects = [
	{
		title: "Portfolio Personnel",
		description: "Première version d'un portfolio personnel.",
		date: "2023-03",
		displayDate: "Mars 2023",
		technologies: ["HTML", "CSS", "JavaScript"],
		position: "top",
	},
	{
		title: "Gestionnaire Theatre",
		description: "Gestionnaire pour un théatre imaginaire",
		date: "2024-06",
		displayDate: "Juin 2024",
		technologies: ["HTML", "CSS", "JavaScript", "PHP"],
		position: "bottom",
	},
	{
		title: "Rentrée à Sup de Vinci",
		description: "Début d'un Bachelor informatique en 3 ans",
		date: "2023-09",
		displayDate: "Septembre 2023",
		technologies: [],
		position: "bottom",
	},
	{
		title: "Escape From antartica",
		description: "Web 2D die and retry platformer game",
		date: "2025-02",
		displayDate: "Février 2025",
		technologies: ["JavaScript", "Node.js", "MySQL"],
		githubUrl: "https://github.com/LeroyM084/Escape-From-Antartica",
		position: "top",
	},
	{
		title: "Mushroom Password",
		description: "WIP - Password manager with a crhome extension",
		date: "2024-12",
		displayDate: "December 2024",
		technologies: ["JavaScript", "Python", "Flask"],
		githubUrl: "https://github.com/LeroyM084/Mushroom_Password",
		position: "bottom",
	},
	{
		title: "Lampadaires",
		description: "Placement des lampadaires dans une ville matriciel",
		date: "2024-09",
		displayDate: "September 2024",
		technologies: ["Python"],
		githubUrl: "https://github.com/LeroyM084/lamps",
		position: "top",
	},
	{
		title: "Site vitrine film",
		description: "Projet scolaire de site vitrine pour un film",
		date: "2023-12",
		displayDate: "Décembre 2023",
		technologies: ["HTML/CSS", "JavaScript"],
		position: "top",
	},
];

export function createEventElement(project) {
	return `
        <div class="event" data-date="${project.date}" data-position="${
		project.position
	}">
            <div class="event-content">
                <div class="event-header">
                    <h3>${project.title}</h3>
                </div>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies
						.map((tech) => `<span class="tech-tag">${tech}</span>`)
						.join("")}
                </div>
                <div class="event-footer">
                    <span class="event-date">${project.displayDate}</span>
                    ${
						project.githubUrl
							? `<a href="${project.githubUrl}" class="github-link" target="_blank">
                            <i class="fab fa-github"></i>
                          </a>`
							: ""
					}
                </div>
            </div>
        </div>
    `;
}

function getEventPosition(eventDate, startDate, endDate, timelineWidth) {
	const timelineStart = startDate.getTime();
	const timelineEnd = endDate.getTime();
	const eventTime = eventDate.getTime();

	const percentage =
		(eventTime - timelineStart) / (timelineEnd - timelineStart);
	return percentage * timelineWidth;
}

function positionEvents() {
	const timeline = document.querySelector(".timeline");
	const timelineWidth = timeline.offsetWidth;
	const events = document.querySelectorAll(".event");

	const projectDates = projects.map((project) => new Date(project.date));
	const startDate = new Date(Math.min(...projectDates));
	const endDate = new Date(Math.max(...projectDates));

	// Ajouter un peu de marge avant et après
	startDate.setMonth(startDate.getMonth() - 4);
	endDate.setMonth(endDate.getMonth() + 4);

	events.forEach((event) => {
		const eventDate = new Date(event.dataset.date);
		const position = getEventPosition(
			eventDate,
			startDate,
			endDate,
			timelineWidth
		);
		event.style.left = `${position}px`;
	});
}

// Ajout d'une nouvelle fonction pour gérer les chevauchements
export function handleOverlappingEvents() {
	const events = document.querySelectorAll(".event.active");
	events.forEach((event) => {
		const rect1 = event.getBoundingClientRect();
		const overlapping = Array.from(events).filter((otherEvent) => {
			if (otherEvent === event) return false;
			const rect2 = otherEvent.getBoundingClientRect();
			return Math.abs(rect1.left - rect2.left) < rect1.width;
		});

		const indicator = event.querySelector(".stack-indicator");
		if (overlapping.length > 0) {
			indicator.style.display = "flex";
			indicator.querySelector(".stack-count").textContent =
				overlapping.length + 1;
			event.classList.add("has-stack");
		} else {
			indicator.style.display = "none";
			event.classList.remove("has-stack");
		}
	});
}

export function initializeProjects() {
	const timelineEvents = document.querySelector(".timeline-events");
	timelineEvents.innerHTML = projects
		.map((project) => createEventElement(project))
		.join("");

	// Activer tous les événements
	const events = document.querySelectorAll(".event");
	events.forEach((event) => {
		event.classList.add("active");
	});

	// Positionner les événements
	positionEvents();

	// Ajouter un écouteur pour le redimensionnement
	window.addEventListener("resize", positionEvents);
}
