// Direct port of renderPageHead() / renderNavbar() / renderFooter() /
// renderCommonScripts() from header.php. Same output, just built at
// `node build.js` time instead of on every PHP request.

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderHead(config, title, extraHeadTags = '') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <link rel="icon" href="${config.favicon}">
    <link href="/vendor/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="/vendor/bootstrap-icons/bootstrap-icons.min.css" rel="stylesheet">
    <link href="/vendor/fonts/fonts.css" rel="stylesheet">
    <link href="/css/site.css" rel="stylesheet">
${extraHeadTags}</head>
<body>`;
}

function renderNavbar(config) {
    const enabledLinks = config.navLinks.filter(l => l.enabled);

    const linkItems = enabledLinks.map(link => `                <li class="nav-item">
                    <a class="nav-link" href="${link.url}" target="_blank"><i class="bi bi-${link.icon}"></i> ${escapeHtml(link.text)}</a>
                </li>`).join('\n');

    const cheatsheetItem = config.cheatsheetCTA.enabled ? `
                <li class="nav-item">
                    <a class="nav-link cheatsheet-cta" href="${config.cheatsheetCTA.url}" target="_blank">
                        <i class="bi bi-${config.cheatsheetCTA.icon}"></i>
                        ${escapeHtml(config.cheatsheetCTA.text)}
                    </a>
                </li>` : '';

    return `<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="/">
            <img src="${config.navbarLogo}" alt="${escapeHtml(config.person.name)}">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
${linkItems}${cheatsheetItem}
            </ul>
        </div>
    </div>
</nav>`;
}

function renderFooter(config) {
    const text = config.footerText.replace('{year}', new Date().getFullYear());
    return `<footer class="footer">
    <div class="container">
        <p class="mb-0">${text}</p>
    </div>
</footer>`;
}

function renderCommonScripts() {
    return `<script src="/js/site.js"></script>
<script src="/vendor/bootstrap/bootstrap.bundle.min.js"></script>`;
}

module.exports = { escapeHtml, renderHead, renderNavbar, renderFooter, renderCommonScripts };
