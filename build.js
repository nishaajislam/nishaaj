const fs = require('fs');
const path = require('path');
const config = require('./site.config.js');
const { escapeHtml, renderHead, renderNavbar, renderFooter, renderCommonScripts } = require('./partials.js');

const OUT = path.join(__dirname, 'dist');

function write(relPath, content) {
    const full = path.join(OUT, relPath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content, 'utf8');
    console.log('wrote', relPath);
}

function copy(srcRel, destRel = srcRel) {
    const src = path.join(__dirname, srcRel);
    const dest = path.join(OUT, destRel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log('copied', destRel);
}

function copyDir(srcRel, destRel = srcRel) {
    const src = path.join(__dirname, srcRel);
    const dest = path.join(OUT, destRel);
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const s = path.join(src, entry.name);
        const d = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            fs.mkdirSync(d, { recursive: true });
            copyDir(path.relative(__dirname, s), path.relative(OUT, d));
        } else {
            fs.copyFileSync(s, d);
        }
    }
    console.log('copied dir', destRel);
}

// Clean previous build
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------------------
// 1. Homepage
// ---------------------------------------------------------------------------
function buildHomepage() {
    const enabledProjects = config.projects.filter(p => p.enabled);

    const techBadges = config.person.techStack
        .map(t => `                    <span class="tech-badge">${escapeHtml(t)}</span>`)
        .join('\n');

    const cards = enabledProjects.map((p, i) => {
        const delay = `animation-delay:${(i * 0.1).toFixed(1)}s;`;
        if (p.type === 'static') {
            return `                <div class="col-lg-4 col-md-6 animate-on-scroll" style="${delay}">
                    <div class="project-card">
                        <div class="project-icon">
                            <i class="bi bi-${p.icon}"></i>
                        </div>
                        <h4>${escapeHtml(p.name)}</h4>
                        <p>${escapeHtml(p.description)}</p>
                    </div>
                </div>`;
        }
        const href = p.online ? `/go/${p.code}.html` : config.greenEarthPage;
        return `                <div class="col-lg-4 col-md-6 animate-on-scroll" style="${delay}">
                    <div class="project-card">
                        <a href="${href}" class="project-link" target="_blank">
                            <div class="project-icon">
                                <i class="bi bi-${p.icon}"></i>
                            </div>
                            <h4>${escapeHtml(p.name)}</h4>
                            <p>${escapeHtml(p.description)}</p>
                            <button class="launch-btn">
                                Launch Project <i class="bi bi-arrow-up-right"></i>
                            </button>
                        </a>
                    </div>
                </div>`;
    }).join('\n');

    const r = config.resume;
    const badges = arr => arr.map(t => `<span class="tech-badge${t.length > 50 ? ' resume-badge-long' : ''}">${escapeHtml(t)}</span>`).join('\n                            ');
    const sectionHead = (title, lead) => `        <div class="text-center mb-5 animate-on-scroll">
            <h2 class="display-5 fw-bold mb-3">${title}</h2>
            <p class="lead text-secondary">${lead}</p>
        </div>`;

    const experienceCards = r.experience.map((e, i) => `                <div class="col-lg-6 animate-on-scroll" style="animation-delay:${(i * 0.1).toFixed(1)}s;">
                    <div class="project-card">
                        <div class="project-icon">
                            <i class="bi bi-${e.icon}"></i>
                        </div>
                        <h4>${escapeHtml(e.role)}</h4>
                        <p class="resume-meta">${escapeHtml(e.org)} · ${escapeHtml(e.location)}<br>${escapeHtml(e.date)}</p>
                        <ul class="resume-list">
${e.bullets.map(b => `                            <li>${escapeHtml(b)}</li>`).join('\n')}
                        </ul>
                    </div>
                </div>`).join('\n');

    const skillCards = r.skills.map((k, i) => `                <div class="col-lg-4 col-md-6 animate-on-scroll" style="animation-delay:${(i * 0.1).toFixed(1)}s;">
                    <div class="project-card">
                        <div class="project-icon">
                            <i class="bi bi-${k.icon}"></i>
                        </div>
                        <h4>${escapeHtml(k.label)}</h4>
                        <div class="tech-stack resume-badges">
                            ${badges(k.items)}
                        </div>
                    </div>
                </div>`).join('\n');

    const resumeSections = `
<section class="projects-section" style="margin-top: 60px;">
    <div class="container">
${sectionHead('About Me', escapeHtml(r.location))}
        <div class="row g-4 justify-content-center">
            <div class="col-lg-10 animate-on-scroll">
                <div class="project-card">
                    <p class="mb-0">${escapeHtml(r.profile)}</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="projects-section" style="margin-top: 60px;">
    <div class="container">
${sectionHead('Education', escapeHtml(r.education.school) + ' · ' + escapeHtml(r.education.location))}
        <div class="row g-4 justify-content-center">
            <div class="col-lg-10 animate-on-scroll">
                <div class="project-card">
                    <div class="project-icon">
                        <i class="bi bi-mortarboard-fill"></i>
                    </div>
                    <h4>${escapeHtml(r.education.degree)}</h4>
                    <p class="resume-meta">${escapeHtml(r.education.date)}</p>
                    <p class="mb-3"><strong>Relevant Coursework</strong></p>
                    <div class="tech-stack resume-badges">
                        ${badges(r.education.coursework)}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="projects-section" style="margin-top: 60px;">
    <div class="container">
${sectionHead('Experience', 'Technology support, customer service, and teamwork')}
        <div class="row g-4">
${experienceCards}
        </div>
    </div>
</section>

<section class="projects-section" style="margin-top: 60px;">
    <div class="container">
${sectionHead('Skills', 'Languages, tools, and platforms')}
        <div class="row g-4">
${skillCards}
        </div>
    </div>
</section>
`;

    const html = `${renderHead(config, `${config.person.name} - ${config.person.title}`,
        `    <meta name="description" content="${escapeHtml(config.person.name)} — ${escapeHtml(config.person.title)}. ${escapeHtml(config.person.techStack.join(', '))}.">\n`)}
${renderNavbar(config)}

<section class="hero-section">
    <div class="container">
        <div class="hero-content">
            <br/><br/><br/>
            <h1>${escapeHtml(config.person.name)}</h1>
            <p class="subtitle">${escapeHtml(config.person.title)}<br>${escapeHtml(config.person.subtitle)}</p>
            <div class="tech-stack">
${techBadges}
            </div>
        </div>
    </div>
</section>

<section class="projects-section" style="margin-top: 60px;">
    <div class="container">
        <div class="text-center mb-5 animate-on-scroll">
            <h2 class="display-5 fw-bold mb-3">Featured Projects</h2>
            <p class="lead text-secondary">Explore my latest work and innovative solutions</p>
        </div>

        <div class="row g-4">
${cards}
        </div>
    </div>
</section>
${resumeSections}
${renderFooter(config)}

${renderCommonScripts()}
</body>
</html>
`;
    write('index.html', html);
}

// ---------------------------------------------------------------------------
// 2. Green-earth "offline project" page
// ---------------------------------------------------------------------------
function buildGreenEarthPage() {
    const extraStyle = `    <style>
${fs.readFileSync(path.join(__dirname, 'partials', 'green-earth.css'), 'utf8')}
    </style>\n`;

    const body = fs.readFileSync(path.join(__dirname, 'partials', 'green-earth.body.html'), 'utf8');
    const script = fs.readFileSync(path.join(__dirname, 'partials', 'green-earth.script.html'), 'utf8');

    const html = `${renderHead(config, 'Page Offline - Saving Green Earth | ' + config.person.name, extraStyle)}
${renderNavbar(config)}

${body}

${renderFooter(config)}

${script}
${renderCommonScripts()}
</body>
</html>
`;
    write('green_earth_page.html', html);
}

// ---------------------------------------------------------------------------
// 3. One static redirect page per online project: /go/<code>.html
//    Replaces the old index.php?site=<code> flow. Instant <meta refresh>
//    for zero-JS reliability, plus the same countdown UI/JS for parity.
// ---------------------------------------------------------------------------
function buildRedirectPages() {
    config.projects.filter(p => p.enabled && p.online && p.type !== 'static').forEach(p => {
        const target = p.url;
        const html = `${renderHead(config, 'Redirecting...',
            `    <meta http-equiv="refresh" content="${config.countdownSeconds}; url=${escapeHtml(target)}">\n`)}
${renderNavbar(config)}

<div class="main-content">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="redirect-card">
                    <div class="redirect-icon">
                        <i class="bi bi-arrow-right"></i>
                    </div>
                    <h2 class="text-primary mb-3">Redirecting...</h2>
                    <p class="mb-4">You will be redirected to <a href="${target}" class="text-info">${escapeHtml(target)}</a> in <span id="countdown" class="text-warning fw-bold">${config.countdownSeconds}</span> seconds.</p>
                    <a href="${target}" class="launch-btn">
                        Go Now <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

${renderFooter(config)}

<script>
    let countdown = ${config.countdownSeconds};
    function updateCountdown() {
        var el = document.getElementById("countdown");
        if (!el) return;
        el.textContent = countdown;
        if (countdown > 0) {
            countdown--;
            setTimeout(updateCountdown, 1000);
        } else {
            window.location.href = ${JSON.stringify(target)};
        }
    }
    window.onload = updateCountdown;
</script>
${renderCommonScripts()}
</body>
</html>
`;
        write(`go/${p.code}.html`, html);
    });
}

buildHomepage();
buildGreenEarthPage();
buildRedirectPages();

// ---------------------------------------------------------------------------
// 4. Copy static assets as-is
// ---------------------------------------------------------------------------
copy('assets/favicon.ico', 'favicon.ico');
copy('assets/logo_small.png', 'logo_small.png');
copy('assets/Nishaaj_Islam_Resume.pdf', 'Nishaaj_Islam_Resume.pdf');
copy('css/site.css', 'css/site.css');
copy('js/site.js', 'js/site.js');
copyDir('vendor', 'vendor');

console.log(`\nBuild complete → ${OUT}`);
