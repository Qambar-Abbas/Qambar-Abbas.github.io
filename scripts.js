document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav ul li a');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            header.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            header.classList.remove('active');
        });
    });

    // Header Scroll Effect - Show profile photo in logo when scrolling
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.classList.add('scrolled');
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            header.classList.remove('scrolled');
        }
    });

    // Initialize framework cards for horizontal scrolling
    const FRAMEWORKS = [
        { name: 'React', description: 'JavaScript library for building user interfaces.', icon: 'logos:react' },
        { name: 'Flutter', description: 'UI toolkit for natively compiled apps.', icon: 'logos:flutter' },
        { name: 'Django', description: 'Python-based web framework.', icon: 'logos:django' },
        { name: 'Node.js', description: 'JavaScript runtime for server-side scripting.', icon: 'logos:nodejs' },
        { name: 'React Native', description: 'Framework for building native apps with React.', icon: 'logos:react' }
    ];

    const frameworksContainer = document.querySelector('.frameworks-container');

    // Create cards for each framework
    FRAMEWORKS.forEach(framework => {
        const card = document.createElement('div');
        card.classList.add('framework-card');

        const icon = document.createElement('span');
        icon.classList.add('iconify');
        icon.setAttribute('data-icon', framework.icon);

        const title = document.createElement('h3');
        title.textContent = framework.name;

        const desc = document.createElement('p');
        desc.textContent = framework.description;

        const btn = document.createElement('button');
        btn.textContent = 'View Projects';
        btn.classList.add('view-projects-button');
        btn.addEventListener('click', () => {
            const targetId = `#projects-${framework.name.toLowerCase().replace(/\s+/g, '-')}`;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
            }
        });

        [icon, title, desc, btn].forEach(el => card.appendChild(el));
        frameworksContainer.appendChild(card);
    });

    // Clone framework cards to create seamless infinite scrolling
    function cloneFrameworks() {
        const originals = Array.from(frameworksContainer.children);
        originals.forEach(card => {
            frameworksContainer.appendChild(card.cloneNode(true));
        });
    }
    cloneFrameworks();

    // Pause/resume scrolling on hover
    frameworksContainer.addEventListener('mouseenter', () => {
        frameworksContainer.style.animationPlayState = 'paused';
    });
    frameworksContainer.addEventListener('mouseleave', () => {
        frameworksContainer.style.animationPlayState = 'running';
    });

    // Projects setup - Grouped by framework
    const PROJECT_GROUPS = [
        {
            title: 'React',
            projects: [
                {
                    name: 'Task Manager App',
                    description: 'A responsive task management application with drag-and-drop features.',
                    link: '#',
                    gradient: 'linear-gradient(135deg, #61DAFB, #2B6CB0)'
                },
                {
                    name: 'E-commerce Dashboard',
                    description: 'Dashboard for managing e-commerce products and orders.',
                    link: '#',
                    gradient: 'linear-gradient(135deg, #4A5568, #2D3748)'
                }
            ]
        },
        {
            title: 'Flutter',
            projects: [
                {
                    name: 'Nuevadesk',
                    description: 'Cross-platform CRM mobile software.',
                    link: 'https://play.google.com/store/apps/details?id=app.instaview365.nuevadesk',
                    gradient: 'linear-gradient(135deg, #662D8C, #ED1E79)'
                },
                {
                    name: 'Eat-it',
                    description: 'Family weekly menu scheduling app with chat.',
                    link: 'https://github.com/QambarOfficial/eatit.git',
                    gradient: 'linear-gradient(135deg, #EE9CA7, #FFDDE1)'
                }
            ]
        },
        {
            title: 'Django',
            projects: [
                {
                    name: 'Inbox Cleaner',
                    description: 'Inbox Cleaner & Classifier using Gmail API & Gemini Pro.',
                    link: 'https://github.com/QambarOfficial/inbox_cleaner.git',
                    gradient: 'linear-gradient(135deg, #2E3192, #1BFFFF)'
                },
                {
                    name: 'Blog Platform',
                    description: 'A full-featured blog platform with user authentication and comments.',
                    link: '#',
                    gradient: 'linear-gradient(135deg, #0C4B33, #1A936F)'
                }
            ]
        },
        {
            title: 'Node.js',
            projects: [
                {
                    name: 'Chat Application',
                    description: 'Real-time chat app using WebSockets and Express.',
                    link: '#',
                    gradient: 'linear-gradient(135deg, #339933, #66CC66)'
                },
                {
                    name: 'API Server for Mobile App',
                    description: 'RESTful API server for a mobile application with JWT authentication.',
                    link: '#',
                    gradient: 'linear-gradient(135deg, #333333, #666666)'
                }
            ]
        },
        {
            title: 'React Native',
            projects: [
                {
                    name: 'Fitness Tracker',
                    description: 'Mobile app for tracking workouts and nutrition.',
                    link: '#',
                    gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)'
                },
                {
                    name: 'Weather App',
                    description: 'Weather forecasting app with location services.',
                    link: '#',
                    gradient: 'linear-gradient(135deg, #4ECDC4, #556270)'
                }
            ]
        }
    ];

    const projectsContainer = document.querySelector('.projects-container');

    PROJECT_GROUPS.forEach(group => {
        // Add headline with ID for scrolling
        const headline = document.createElement('h3');
        headline.classList.add('project-group-title');
        headline.textContent = group.title;
        headline.id = `projects-${group.title.toLowerCase().replace(/\s+/g, '-')}`;
        projectsContainer.appendChild(headline);

        const groupWrapper = document.createElement('div');
        groupWrapper.classList.add('project-group');

        group.projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card');

            const stripe = document.createElement('div');
            stripe.classList.add('project-card-gradient');
            stripe.style.background = project.gradient;

            const content = document.createElement('div');
            content.classList.add('project-card-content');

            const title = document.createElement('h3');
            title.textContent = project.name;

            const desc = document.createElement('p');
            desc.textContent = project.description;

            const link = document.createElement('a');
            link.href = project.link;
            link.textContent = 'View Project';
            link.classList.add('project-link');
            link.target = '_blank';

            [title, desc, link].forEach(el => content.appendChild(el));
            [stripe, content].forEach(el => card.appendChild(el));
            groupWrapper.appendChild(card);
        });

        projectsContainer.appendChild(groupWrapper);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal-on-scroll animations
    const revealElements = document.querySelectorAll('.section-header, .skill-item, .project-card, .framework-card');
    function revealOnScroll() {
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 150) {
                el.classList.add('active');
            }
        });
    }

    // Inject reveal CSS
    const style = document.createElement('style');
    style.textContent = `
      .section-header, .skill-item, .project-card, .framework-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .section-header.active, .skill-item.active, .project-card.active, .framework-card.active {
        opacity: 1;
        transform: translateY(0);
      }
      .skill-item:nth-child(1) { transition-delay: 0.1s; }
      .skill-item:nth-child(2) { transition-delay: 0.2s; }
      .skill-item:nth-child(3) { transition-delay: 0.3s; }
      .skill-item:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

}); // end DOMContentLoaded