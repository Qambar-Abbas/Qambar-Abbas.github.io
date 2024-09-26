document.addEventListener('DOMContentLoaded', function () {

    // Initialize framework cards for horizontal scrolling
    const FRAMEWORKS = [
        {
            name: 'React',
            description: 'JavaScript library for building user interfaces.',
            icon: 'logos:react'
        },
        {
            name: 'Flutter',
            description: 'UI toolkit for natively compiled apps.',
            icon: 'logos:flutter'
        },
        {
            name: 'Django',
            description: 'Python-based web framework.',
            icon: 'logos:django'
        },
        {
            name: 'Node.js',
            description: 'JavaScript runtime for server-side scripting.',
            icon: 'logos:nodejs'
        },
        {
            name: 'React Native',
            description: 'Framework for building native apps with React.',
            icon: 'logos:react' // Closest match
        }
    ];

    const FRAMEWORKSContainer = document.querySelector('.FRAMEWORKS-container');

    // Function to append cloned cards to create seamless infinite scrolling
    function cloneFRAMEWORKS() {
        const originalCards = Array.from(FRAMEWORKSContainer.children);
        originalCards.forEach(card => {
            const clonedCard = card.cloneNode(true); // Clone each card
            FRAMEWORKSContainer.appendChild(clonedCard); // Append cloned card
        });
    }

    // Pause the animation when the mouse enters the list
    FRAMEWORKSContainer.addEventListener('mouseenter', () => {
        FRAMEWORKSContainer.style.animationPlayState = 'paused'; // Pause the scrolling animation
    });

    // Resume the animation when the mouse leaves the list
    FRAMEWORKSContainer.addEventListener('mouseleave', () => {
        FRAMEWORKSContainer.style.animationPlayState = 'running'; // Resume the scrolling animation
    });

    // Create cards for each framework
    FRAMEWORKS.forEach(framework => {
        const frameworkCard = document.createElement('div');
        frameworkCard.classList.add('framework-card');

        const icon = document.createElement('span');
        icon.classList.add('iconify');
        icon.setAttribute('data-icon', framework.icon);

        const title = document.createElement('h3');
        title.textContent = framework.name;

        const description = document.createElement('p');
        description.textContent = framework.description;

        // Add "View Projects" button inside the framework card
        const viewProjectsButton = document.createElement('button');
        viewProjectsButton.textContent = 'View Projects';
        viewProjectsButton.classList.add('view-projects-button');

        // Button click event
        viewProjectsButton.addEventListener('click', () => {
            window.location.href = '#projects'; // Adjust to your specific projects section
        });

        // Append elements to frameworkCard
        frameworkCard.appendChild(icon);
        frameworkCard.appendChild(title);
        frameworkCard.appendChild(description);
        frameworkCard.appendChild(viewProjectsButton); // Now append the button inside the framework card

        // Append the frameworkCard to the container
        FRAMEWORKSContainer.appendChild(frameworkCard);
    });

    // Clone framework cards to create a seamless loop
    cloneFRAMEWORKS(); // Clone initially to make it seamless



    const PROJECTS = [
        {
            name: 'Nuevadesk',
            description: 'Nuevadesk Mobile App is your trusted companion in managing customer relationships and nurturing your business connections, all in the palm of your hand.',
            link: 'https://play.google.com/store/apps/details?id=app.instaview365.nuevadesk&pcampaignid=web_share',
            gradient: 'linear-gradient(135deg, #662D8C, #ED1E79)' // Gradient background
        },
        {
            name: 'Eatit',
            description: 'Eatit is your ultimate kitchen companion, designed specifically for home chefs. This intuitive app takes the guesswork out of meal planning, helping you decide what\'s for breakfast, lunch, and dinner with ease.',
            link: 'https://github.com/QambarOfficial/eatit.git',
            gradient: 'linear-gradient(135deg, #EE9CA7, #FFDDE1)' // Gradient background
        },
        {
            name: 'Chatbot',
            description: 'A description of the third project.',
            link: '#',
            gradient: 'linear-gradient(135deg, #2E3192, #1BFFFF)' // Gradient background
        }
    ];

    const PROJECTSContainer = document.querySelector('.PROJECTS-container');

    // Create project cards
    PROJECTS.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.style.background = project.gradient; // Set gradient background

        const title = document.createElement('h3');
        title.textContent = project.name;

        const description = document.createElement('p');
        description.textContent = project.description;

        const link = document.createElement('a');
        link.href = project.link;
        link.textContent = 'View Project';
        link.classList.add('project-link');

        projectCard.appendChild(title);
        projectCard.appendChild(description);
        projectCard.appendChild(link);

        PROJECTSContainer.appendChild(projectCard);
    });

});
