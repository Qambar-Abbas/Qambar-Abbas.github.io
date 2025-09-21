// scripts.js - improved version
document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav ul li a');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            header.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            header.classList.remove('active');
        });
    });

    // --- Header Scroll Effect ---
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

    // --- Framework cards (generation) ---
    const FRAMEWORKS = [
        { name: 'React', description: 'JavaScript library for building user interfaces.', icon: 'logos:react' },
        { name: 'Flutter', description: 'UI toolkit for natively compiled apps.', icon: 'logos:flutter' },
        { name: 'Django', description: 'Python-based web framework.', icon: 'logos:django' },
        { name: 'Node.js', description: 'JavaScript runtime for server-side scripting.', icon: 'logos:nodejs' },
        { name: 'React Native', description: 'Framework for building native apps with React.', icon: 'logos:react' }
    ];

    const frameworksContainer = document.querySelector('.frameworks-container');
    if (!frameworksContainer) {
        console.warn('No .frameworks-container found');
    } else {
        // Create cards
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
            // don't add per-button listeners (we'll use delegation)

            [icon, title, desc, btn].forEach(el => card.appendChild(el));
            frameworksContainer.appendChild(card);
        });

        // Keep a copy of the original card markup (to re-clone safely)
        const originalCardTemplates = Array.from(frameworksContainer.children).map(item => item.cloneNode(true));

        // Clone framework cards until container has enough content for seamless scroll
        function cloneFrameworksForMarquee() {
            // remove previously cloned nodes (to avoid repeated appends)
            Array.from(frameworksContainer.querySelectorAll('.cloned')).forEach(n => n.remove());

            // Append clones until scrollWidth is comfortably larger than viewport (tweak factor if needed)
            const targetWidth = Math.max(document.documentElement.clientWidth * 2, frameworksContainer.clientWidth * 2);
            let safety = 0;
            while (frameworksContainer.scrollWidth < targetWidth && safety < 8) {
                originalCardTemplates.forEach(template => {
                    const copy = template.cloneNode(true);
                    copy.classList.add('cloned');
                    frameworksContainer.appendChild(copy);
                });
                safety++;
            }
        }
        cloneFrameworksForMarquee();

        // Pause/resume support for mouse, pointer and touch devices
        function pauseMarquee() {
            frameworksContainer.style.animationPlayState = 'paused';
        }
        function resumeMarquee() {
            // if animation style removed for restart, ensure it's running
            frameworksContainer.style.animationPlayState = 'running';
        }

        frameworksContainer.addEventListener('mouseenter', pauseMarquee);
        frameworksContainer.addEventListener('mouseleave', resumeMarquee);

        // Touch & pointer events (mobile)
        frameworksContainer.addEventListener('touchstart', pauseMarquee, { passive: true });
        frameworksContainer.addEventListener('touchend', resumeMarquee);
        frameworksContainer.addEventListener('pointerdown', pauseMarquee);
        frameworksContainer.addEventListener('pointerup', resumeMarquee);

        // Also handle visibilitychange (pause when switching tabs)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) pauseMarquee(); else resumeMarquee();
        });

        // Restart CSS animation safely (useful on orientationchange/resize)
        function restartMarqueeAnimation() {
            // remove existing animation to force restart
            frameworksContainer.style.animation = 'none';
            // force reflow
            // eslint-disable-next-line no-unused-expressions
            frameworksContainer.offsetHeight;
            // clear inline style so CSS takes over again (or restore if you dynamically set it)
            frameworksContainer.style.animation = '';
            // ensure it's running
            frameworksContainer.style.animationPlayState = 'running';
        }

        // On resize/orientationchange re-clone and restart
        let resizeTimeout;
        function onResizeOrOrientation() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                cloneFrameworksForMarquee();
                restartMarqueeAnimation();
            }, 200);
        }
        window.addEventListener('resize', onResizeOrOrientation);
        window.addEventListener('orientationchange', onResizeOrOrientation);

        // --- Event delegation for "View Projects" (works for originals & clones) ---
        frameworksContainer.addEventListener('click', (ev) => {
            const btn = ev.target.closest('.view-projects-button');
            if (!btn) return;

            // Find the framework name from the nearest .framework-card h3 (defensive)
            const card = btn.closest('.framework-card');
            let frameworkName = null;
            if (card) {
                const h3 = card.querySelector('h3');
                if (h3) frameworkName = h3.textContent.trim();
            }

            let targetId = '#projects';
            if (frameworkName) {
                // sanitize (lowercase + dashes)
                const slug = frameworkName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
                targetId = `#projects-${slug}`;
            }

            const targetElement = document.querySelector(targetId) || document.querySelector('#projects');
            if (!targetElement) return;

            // account for fixed header (approx 80px) and smooth scroll
            const headerOffset = 80;
            const top = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        });

        // --- Reveal-on-scroll using IntersectionObserver (handles dynamic content) ---
        const revealSelector = '.section-header, .skill-item, .project-card, .framework-card';
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.08
        };
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // If you want one-time reveal only:
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe existing & future nodes that match selector
        function observeRevealElements(root = document) {
            Array.from(root.querySelectorAll(revealSelector)).forEach(el => {
                if (!el.__revealObserved) {
                    revealObserver.observe(el);
                    el.__revealObserved = true;
                }
            });
        }
        observeRevealElements();
        // If we clone nodes, observe them too:
        const mo = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.addedNodes && m.addedNodes.length) {
                    m.addedNodes.forEach(node => {
                        if (node.nodeType === 1) observeRevealElements(node);
                    });
                }
            }
        });
        mo.observe(document.body, { childList: true, subtree: true });

        // initial reveal run for elements already visible
        // (IntersectionObserver handles this automatically, but keep a fallback)
        // revealOnScroll fallback removed in favor of observer

    }

    // Projects setup - Grouped by framework
    const PROJECT_GROUPS = [
        {
            title: 'React',
            projects: [
                {
                    name: 'Task Manager App',
                    description: 'A responsive task management application with drag-and-drop features.',
                    link: 'https://github.com/Qambar-Abbas/React-Task-Manager-App-With-Drag-And-Drop.git',
                    gradient: 'linear-gradient(135deg, #61DAFB, #2B6CB0)'
                },
                {
                    name: 'E-commerce Dashboard',
                    description: 'Dashboard for managing e-commerce products and orders.',
                    link: '#',
                    gradient: 'linear-gradient(135deg, #4A5568, #7897cbff)'
                }
            ]
        },
        {
            title: 'Flutter',
            projects: [
                {
                    name: 'Khums Calculator',
                    description: 'Khums calculation app for financial management and record keeping.',
                    link: 'https://github.com/shozab-ctl/khums-app.git',
                    gradient: 'linear-gradient(135deg, #996db6ff, #f31575ff)'
                },
                {
                    name: 'Nuevadesk',
                    description: 'Cross-platform CRM mobile software.',
                    link: 'https://play.google.com/store/apps/details?id=app.instaview365.nuevadesk',
                    gradient: 'linear-gradient(135deg, #662D8C, #ED1E79)'
                },
                {
                    name: 'Eat-it',
                    description: 'Family weekly menu scheduling app with private chat room.',
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
                    name: 'Face Comparioson Web App',
                    description: 'A minimal yet professional face comparison web app using InsightFace and Python\'s built-in HTTP server',
                    link: 'https://github.com/Qambar-Abbas/Face-Comparison-Web-App-Python-HTML-CSS-InsightFace.git',
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
    if (projectsContainer) {
        // clear if anything present
        projectsContainer.innerHTML = '';

        // For demonstration we will reuse your existing PROJECT_GROUPS if defined in this file.
        // If you keep PROJECT_GROUPS above uncommented, this will populate correctly.
        if (typeof PROJECT_GROUPS !== 'undefined' && PROJECT_GROUPS.length) {
            PROJECT_GROUPS.forEach(group => {
                const headline = document.createElement('h3');
                headline.classList.add('project-group-title');
                headline.textContent = group.title;
                headline.id = `projects-${group.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}`;
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
        }
    }

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