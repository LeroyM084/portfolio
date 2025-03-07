import {
	projects,
	initializeProjects,
	handleOverlappingEvents,
} from "./projects.js";

document.addEventListener("DOMContentLoaded", function () {
	const nameElement = document.getElementById("name");
	const text = nameElement.textContent;
	nameElement.textContent = ""; // Vider le contenu initial du texte

	let i = 0;
	let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Liste de caractères "aléatoires"

	// Crée un tableau de "lettres" qui simule l'effet Matrix
	function getRandomLetter() {
		return letters[Math.floor(Math.random() * letters.length)];
	}

	function typeWriter() {
		if (i < text.length) {
			let displayText = "";

			// Ajouter des lettres aléatoires avant le bon caractère
			for (let j = 0; j < i; j++) {
				displayText += text.charAt(j);
			}

			// Ajouter une lettre aléatoire (l'effet Matrix)
			displayText += getRandomLetter();
			nameElement.textContent = displayText;

			// Continuer à afficher des lettres aléatoires
			setTimeout(function () {
				if (nameElement.textContent.charAt(i) !== text.charAt(i)) {
					i++; // Se déplace vers la lettre correcte à l'index i
				}
				typeWriter(); // Appel récursif pour continuer l'animation
			}, 75); // Vitesse du défilement des caractères (50ms pour l'effet Matrix)
		} else {
			nameElement.textContent = text; // Remplacer tout par le texte final
		}
	}

	typeWriter(); // Lancer l'animation

	const timeline = document.querySelector(".timeline");
	const timelineMarkers = document.querySelector(".timeline-markers");
	const prevButton = document.querySelector(".prev-button");
	const nextButton = document.querySelector(".next-button");

	// Initialiser les projets d'abord
	initializeProjects();

	// Créer les marqueurs basés sur les dates des projets
	const projectDates = projects.map((project) => new Date(project.date));
	let startDate = new Date(Math.min(...projectDates));
	let endDate = new Date(Math.max(...projectDates));

	// Ajout de 5 mois avant
	startDate.setMonth(startDate.getMonth() - 4);

	// Ajout de 5 mois après
	endDate.setMonth(endDate.getMonth() + 4);

	// Générer tous les mois entre startDate et endDate
	const months = [];
	let currentDate = new Date(startDate);
	while (currentDate <= endDate) {
		months.push(new Date(currentDate));
		currentDate.setMonth(currentDate.getMonth() + 1);
	}

	// Création des marqueurs pour chaque mois
	months.forEach((date, index) => {
		const marker = document.createElement("div");
		marker.classList.add("timeline-marker");

		// Ajouter une classe spéciale si c'est un mois avec un projet
		if (
			projectDates.some(
				(projectDate) =>
					projectDate.getMonth() === date.getMonth() &&
					projectDate.getFullYear() === date.getFullYear()
			)
		) {
			marker.classList.add("has-event");
		}

		marker.title = date.toLocaleDateString("fr-FR", {
			month: "long",
			year: "numeric",
		});

		timelineMarkers.appendChild(marker);
	});

	// Position initiale
	let currentPosition = 0;
	const scrollAmount = window.innerWidth <= 768 ? 60 : 100; // Ajuster le défilement sur mobile

	// Gestionnaire des boutons
	prevButton.addEventListener("click", () => {
		const maxScroll = 0;
		currentPosition = Math.min(currentPosition + scrollAmount, maxScroll);
		updateTimelinePosition();
	});

	nextButton.addEventListener("click", () => {
		const maxScroll = -(timelineMarkers.scrollWidth - timeline.offsetWidth);
		currentPosition = Math.max(currentPosition - scrollAmount, maxScroll);
		updateTimelinePosition();
	});

	// Mise à jour de la position de la timeline
	function updateTimelinePosition() {
		timelineMarkers.style.transform = `translateX(${currentPosition}px)`;
		requestAnimationFrame(() => {
			checkEvents();
		});
	}

	// Vérification et affichage des événements
	function checkEvents() {
		const events = document.querySelectorAll(".event");
		events.forEach((event) => {
			const eventDate = new Date(event.dataset.date);
			const eventPosition = getEventPosition(eventDate);

			// Position relative à la vue actuelle
			const relativePosition = eventPosition + currentPosition;

			// Si l'événement est visible dans la vue actuelle
			if (
				relativePosition >= 0 &&
				relativePosition <= timeline.offsetWidth
			) {
				event.classList.add("active");
				event.style.left = `${relativePosition}px`;
			} else {
				event.classList.remove("active");
			}
		});

		// Ajouter à la fin de la fonction
		requestAnimationFrame(checkEventOverlap);
		handleOverlappingEvents();
	}

	// Calcul de la position d'un événement basé sur sa date
	function getEventPosition(eventDate) {
		const timelineStart = startDate.getTime();
		const timelineEnd = endDate.getTime();
		const eventTime = eventDate.getTime();

		const percentage =
			(eventTime - timelineStart) / (timelineEnd - timelineStart);
		return percentage * timelineMarkers.offsetWidth;
	}

	// Initialisation
	updateTimelinePosition();

	// Mettre à jour la timeline pour inclure les nouveaux événements
	const events = document.querySelectorAll(".event");
	events.forEach((event) => {
		const date = new Date(event.dataset.date);
		const position = getEventPosition(date);
		event.style.left = `${position}px`;
	});

	distributeEvents();
	// Ajoutez également un listener pour le redimensionnement
	window.addEventListener("resize", distributeEvents);
});

function checkEventOverlap() {
	const events = document.querySelectorAll(".event.active");
	const eventArray = Array.from(events);
	const THREE_MONTHS = 15778800000 / 2; // 6 mois en millisecondes

	// Réinitialiser les états
	eventArray.forEach((event) => {
		event.classList.remove("has-overlap");
		event.classList.remove("collapsed");
		const indicators = event.querySelectorAll(".event-nav-indicator");
		indicators.forEach((indicator) => indicator.remove());
	});

	// Vérifier les chevauchements
	for (let i = 0; i < eventArray.length; i++) {
		const event1 = eventArray[i];
		const date1 = new Date(event1.dataset.date);

		for (let j = i + 1; j < eventArray.length; j++) {
			const event2 = eventArray[j];
			const date2 = new Date(event2.dataset.date);

			const timeDiff = Math.abs(date1.getTime() - date2.getTime());

			if (timeDiff < THREE_MONTHS) {
				const recentEvent = date1 > date2 ? event1 : event2;
				const olderEvent = date1 > date2 ? event2 : event1;

				recentEvent.classList.add("collapsed");

				// Ajouter les indicateurs de navigation
				const nextIndicator = createNavIndicator("next", ">");
				const prevIndicator = createNavIndicator("prev", "<");

				olderEvent
					.querySelector(".event-content")
					.appendChild(nextIndicator);
				recentEvent
					.querySelector(".event-content")
					.appendChild(prevIndicator);

				// Ajouter les event listeners
				nextIndicator.addEventListener("click", (e) => {
					e.stopPropagation();
					toggleEventPair(olderEvent, recentEvent);
				});

				prevIndicator.addEventListener("click", (e) => {
					e.stopPropagation();
					toggleEventPair(recentEvent, olderEvent);
				});
			}
		}
	}
}

function createNavIndicator(type, arrow) {
	const indicator = document.createElement("div");
	indicator.className = `event-nav-indicator ${type}-indicator`;

	const img = document.createElement("img");
	img.src = type === "prev" ? "../assets/prev.webp" : "../assets/next.svg";
	img.alt = type === "prev" ? "Previous" : "Next";
	img.style.width = "16px"; // Ajustez la taille selon vos besoins
	img.style.height = "16px";

	// indicator.appendChild(img);
	return indicator;
}

function toggleEventPair(visibleEvent, hiddenEvent) {
	visibleEvent.classList.add("collapsed");
	hiddenEvent.classList.remove("collapsed");
}

document.addEventListener("click", function (e) {
	if (e.target.closest(".stack-indicator")) {
		const event = e.target.closest(".event");
		const overlappingEvents = document.querySelectorAll(
			".event.has-stack.active"
		);

		overlappingEvents.forEach((evt) => {
			if (evt !== event) {
				evt.classList.toggle("collapsed");
			}
		});
	}
});

function distributeEvents() {
	const events = document.querySelectorAll(".event");
	const timelineWidth = document.querySelector(".timeline").offsetWidth;
	const spacingMultiplier = 8; // Augmenté significativement
	const spacing = (timelineWidth * spacingMultiplier) / (events.length + 1);

	events.forEach((event, index) => {
		const position = spacing * (index + 1);
		event.style.left = `${position}px`;
	});
}
