// ============================================================================
// SINGLE SOURCE OF TRUTH for the whole site — the direct replacement for the
// $config array you used to edit inside header.php.
//
// To switch a link on/off dynamically: flip its `enabled` flag to false.
// To add a new project card: add a new entry to `projects`.
// Every page (index.html, green_earth_page.html, and every /go/<code>.html
// redirect page) is generated FROM this file by build.js, so there is only
// ever ONE place to make these edits — exactly like editing header.php used
// to update every page that required() it.
// ============================================================================

module.exports = {
    person: {
        name: 'Nishaaj Islam',
        title: 'Information Systems Student & Web Developer',
        subtitle: 'Building API-driven web applications and supporting day-to-day technology operations',
        techStack: ['ReactJS', 'NextJS', 'Angular', 'Python', 'JavaScript', 'HTML', 'CSS', 'AWS']
    },

    favicon: '/favicon.ico',
    navbarLogo: '/logo_small.png',   // separate from favicon: browsers render <img src="favicon.ico"> unreliably
    countdownSeconds: 0,          // how many seconds the redirect pages count down before jumping
    greenEarthPage: '/green_earth_page.html',
    fallbackSite: 'aha',          // used if a /go/<code>.html is ever hit for an unknown code

    // -------------------------------------------------------------------
    // NAVBAR LINKS — this is the "switch links on/off" control you asked
    // about. Set enabled: false to hide a link from every page instantly,
    // or add a new object to the array to add a new link everywhere at once.
    // -------------------------------------------------------------------
    navLinks: [
        { enabled: false, text: 'Tutorials', url: '', icon: 'collection-play' },
        { enabled: true, text: 'Github', url: 'https://github.com/nishaajislam/', icon: 'github' },
        { enabled: true, text: 'Linkedin', url: 'https://www.linkedin.com/in/nishaaj-islam/', icon: 'linkedin' },
        { enabled: true, text: 'Contact', url: 'mailto:nishaaj2512@gmail.com', icon: 'person-lines-fill' },
        { enabled: false, text: 'About', url: '', icon: 'youtube' }
    ],

    // Navbar call-to-action button (glowing pill). Now points at the resume.
    // This replaces the two separate files you used to maintain
    // (header.php vs header_without_cheetsheetlink.php). Instead of keeping
    // two whole copies of the header around, it's now one flag: flip
    // `enabled` to false to get exactly what header_without_cheetsheetlink.php
    // gave you, on every page, at once.
    cheatsheetCTA: {
        enabled: true,
        text: 'Download Resume',
        url: '/Nishaaj_Islam_Resume.pdf',
        icon: 'file-earmark-arrow-down-fill'
    },

    footerText: '© {year} Nishaaj Islam | Information Systems | Virginia Commonwealth University',

    // -------------------------------------------------------------------
    // PROJECT CARDS — equivalent of $config['sites']. `online: true` means
    // the card links through a countdown redirect page (a static
    // /go/<code>.html is generated for it at build time); `online: false`
    // sends it to the green-earth "offline" page, same as before.
    // Set `enabled: false` to pull a card off the homepage entirely
    // without deleting its data (useful while a project is being reworked).
    // -------------------------------------------------------------------
    projects: [
        { code: 'mrdn',  enabled: true, online: true,  url: 'https://meridian-omega-beige.vercel.app/', name: 'Meridian Health Records', description: 'A secure patient information system for clinics and care teams, built on Spring Boot and React. Role-based access control, full audit logging, and encrypted sessions protect every patient record, procedure, and visit, with an interface in English, Spanish, and French. Deploys self-hosted or fully serverless on Vercel', icon: 'hospital-fill' },
        { code: 'cgac',  enabled: true, online: true,  url: 'https://coingecko-api-client-six.vercel.app/', name: 'Crypto Market Watch', description: 'A web application that integrates CoinGecko API data to display cryptocurrency market information and price charts', icon: 'currency-bitcoin' },
        { code: 'nmrn',  enabled: true, online: true,  url: 'https://dominate-theta.vercel.app/', name: 'Numeron Web Game', description: 'An interactive browser game featuring player growth, collision-based progression, and game-over logic based on relative orb size', icon: 'controller' },
        // type: 'static' renders a non-clickable card (no live site to link to).
        { code: 'rcbs',  enabled: true, type: 'static', name: 'Revival Cafe Business Simulation', description: 'Feb 2024 – May 2024 · Legal Environment of Business (BUSN 323). Co-developed a virtual cafe concept, contributing to research and development and financial management, and proposed customer-acquisition and profitability strategies', icon: 'cup-hot-fill' }
    ],

    // -------------------------------------------------------------------
    // RESUME SECTIONS — rendered on the homepage below Featured Projects.
    // Edit here and re-run `node build.js`.
    // -------------------------------------------------------------------
    resume: {
        profile: 'Information Systems student with hands-on experience building API-driven web applications and supporting day-to-day technology operations in a state agency. Brings customer service, business analysis, and teamwork experience across public- and private-sector environments.',
        location: 'Midlothian, VA',
        education: {
            school: 'Virginia Commonwealth University (VCU)',
            location: 'Richmond, VA',
            degree: 'Bachelor of Science in Information Systems',
            date: 'Expected December 2026',
            coursework: [
                'Business Information Systems', 'Information Technology Infrastructure', 'Systems Analysis and Design',
                'Database Systems', 'Intermediate Programming', 'Programming for Business Analytics',
                'Introduction to IS Development Technologies', 'Artificial Intelligence for Business',
                'Fundamentals of Data Communications', 'Advanced Networking and Security',
                'Projects in Information Systems', 'Business Statistics I',
                'Calculus and Analytic Geometry I', 'Mathematical Structures'
            ]
        },
        experience: [
            { icon: 'building', org: 'Virginia Department of Education', location: 'Richmond, VA', role: 'Front Desk Intern', date: 'May 2025 – Aug 2025', bullets: [
                'Provided front-desk and technical support, assisting staff with day-to-day software needs.',
                'Maintained and troubleshot office technology to support reliable departmental operations.'
            ] },
            { icon: 'shop', org: 'Chipotle Mexican Grill', location: 'Chesterfield, VA', role: 'Team Member', date: 'Sep 2023 – Present', bullets: [
                'Deliver high-quality customer service during peak periods in a fast-paced environment.',
                'Process in-person and online orders while monitoring inventory and supporting food preparation.',
                'Help onboard and guide new team members as an experienced crew member.'
            ] },
            { icon: 'shield-check', org: 'Virginia Department of Corrections', location: 'Powhatan, VA', role: 'Corrections Officer', date: 'Mar 2024 – Apr 2024', bullets: [
                'Monitored inmate activities and enforced facility rules and procedures.',
                'Performed routine security supervision to deter contraband and maintain a secure environment.'
            ] },
            { icon: 'graph-up-arrow', org: 'Vector Marketing', location: 'Richmond, VA', role: 'Sales Representative', date: 'Jun 2022 – Jul 2022', bullets: [
                'Conducted virtual sales presentations for Cutco products and converted prospects into customers.',
                'Built trust with customers by recommending products based on their needs.'
            ] }
        ],
        skills: [
            { icon: 'code-slash', label: 'Programming & Web', items: ['ReactJS', 'NextJS', 'Angular', 'Python', 'JavaScript', 'HTML', 'CSS'] },
            { icon: 'tools', label: 'Tools & Platforms', items: ['AWS', 'Microsoft Excel (PivotTables)', 'Word', 'PowerPoint', 'Google Workspace'] },
            { icon: 'stars', label: 'Additional', items: ['UX', 'Applied Mathematics', 'LinkedIn Learning Business Communication certification'] }
        ]
    }
};
