document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupProjects();
    setupSkills();
    setupContactForm();
    setupAnimations();
});




function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function setupProjects() {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        project.addEventListener('mouseover', function() {
            this.querySelector('.description').style.display = 'flex';
        });

        project.addEventListener('mouseout', function() {
            this.querySelector('.description').style.display = 'none';
        });

        project.addEventListener('click', function() {
            const description = this.querySelector('.description');
            description.style.display = description.style.display === 'none' ? 'flex' : 'none';
        });
    });
}

function setupSkills() {
    const skillImages = document.querySelectorAll('.skills img');
    
    skillImages.forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });

        img.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function setupContactForm() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
    }
}

function validateForm() {
    let valid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    resetErrors();

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Veuillez entrer votre nom.');
        valid = false;
    }

    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Veuillez entrer votre email.');
        valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Veuillez entrer un email valide.');
        valid = false;
    }

    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Veuillez entrer votre message.');
        valid = false;
    }

    return valid;
}

function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
}

function resetErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => element.remove());
}

function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function setupAnimations() {
    const sections = document.querySelectorAll('.page');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
        }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Fonction pour gérer le défilement fluide
function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Fonction pour gérer le menu hamburger sur mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Fonction pour créer un effet de parallaxe simple
function setupParallax() {
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            let speed = element.dataset.speed;
            element.style.transform = `translateY(${window.scrollY * speed}px)`;
        });
    });
}

// Appeler toutes les fonctions de configuration
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupProjects();
    setupSkills();
    setupContactForm();
    setupAnimations();
    setupMobileMenu();
    setupThemeToggle();
    setupParallax();
});


document.addEventListener('DOMContentLoaded', function() {
    const interets = document.getElementById('interets');
    
    function checkVisibility() {
        const rect = interets.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.75) {
            interets.classList.add('visible');
            window.removeEventListener('scroll', checkVisibility);
        }
    }
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
});



document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('meteor-container');

    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        
        // Taille aléatoire entre 2 et 6 pixels
        const size = Math.random() * 4 + 2;
        meteor.style.width = `${size}px`;
        meteor.style.height = `${size}px`;
        meteor.style.boxShadow = `0 0 ${size * 5}px ${size}px white`;
        
        const startX = Math.random() * window.innerWidth;
        const endX = startX - 300; // Trajet plus long
        
        meteor.style.left = startX + 'px';
        meteor.style.top = '-10px';
        
        container.appendChild(meteor);
        
        meteor.animate([
            { transform: 'translateY(0) translateX(0)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) translateX(${endX - startX}px)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 1000, // Durée entre 1500ms et 2500ms
            easing: 'linear'
        }).onfinish = () => meteor.remove();
    }

    // Fonction pour créer plusieurs météores
    function createMeteors(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(createMeteor, Math.random() * 1000);
        }
    }

    // Créer des météores périodiquement
    setInterval(() => createMeteors(3), 500); // Crée 3 météores toutes les 500ms

    // Créer quelques météores au chargement de la page
    createMeteors(10);
});


document.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressBall = document.getElementById('progress-ball');
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${(totalScroll / windowHeight) * 100}%`;
    
    progressBar.style.height = scroll;
    progressBall.style.top = scroll;
});


document.addEventListener('DOMContentLoaded', (event) => {
    const elements = [
        { selector: 'h2', delay: 0 },
        { selector: 'h3', delay: 6000 },
        { selector: 'p', delay: 6000 }
    ];

    function startTyping() {
        elements.forEach((el) => {
            const textElement = document.querySelector(`.profile ${el.selector}`);
            const textContent = textElement.textContent;
            textElement.textContent = '';
            let i = 0;

            function typeWriter() {
                if (i < textContent.length) {
                    textElement.textContent += textContent.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50); // Ajuste la vitesse en millisecondes
                }
            }

            setTimeout(typeWriter, el.delay);
        });
    }

    setInterval(startTyping, 12000); // Redémarre l'effet toutes les 9 secondes
    startTyping(); // Démarre immédiatement l'effet au chargement de la page
});
