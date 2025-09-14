// Select the container that holds both images
const portrait = document.querySelector('.main-image');

// Preload the medieval image to avoid flicker on first hover/click

const preload = new Image();
preload.src = 'img/medieval-style.png'

/* Function to toggle the "flipped" class on .main-image
    - If .flipped is present - medieval image is shown
    - If .flipped is removed - modern image is shown */
function toggleQuick() {
    portrait.classList.toggle('flipped');
}

/* Event listener for mouse click on the portrait
    - Adds/removes the "flipped" class on click */
portrait.addEventListener('click', toggleQuick);

/* ================================================== */
/* === ROTATING BACKGROUND THAT TRACKS DARK/LIGHT === */

/* IIFE (Immediately Invoked Function Expression):
   - It's a function that defines itself and runs immediately.
   - Keeps all variables (like `bg`, `anim`) private so they don't leak into the global scope
     and collide with other code. */
(function () {
    // Creating one overlay element that sits behind the content and carries the SVG
    const bg = document.createElement('div');
    
    /* Applying all fixed positioning and rendering hints:
       - fixed + centered: anchor to viewport center, not document flow
       - zIndex: '-1'; is safe because body has 'isolation: isolate'
       - pointerEvents: 'none' lets clicks go through to your content
       - background* props define how the image fills the overlay
       - willChange hints the browser that 'transform' will animate (optimizes paint) */
    Object.assign(bg.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)', // center the overlay
        zIndex: '-1',                       // behind content (safe with isolation: isolate)
        pointerEvents: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        willChange: 'transform, width, height, background-image'
    });

    // Insert the overlay as the first child of <body>
    document.body.prepend(bg);

    // Preload both backgrounds so switching theme has no flicker
    ["img/background-dark.svg", "img/background-light.svg"].forEach(s => {
        const i = new Image(); // create an <img> in memory
        i.src = s;             // setting src triggers the browser to fetch/cache it
    });

    /* Size the overlay as a square large enough to cover the viewport diagonally, so when it
       rotates, no corners "peek" out */
    function sizeOverlay() {
        // window.innerWidth/innerHeight are the viewport size in CSS pixels
        const diag = Math.hypot(window.innerWidth, window.innerHeight); // √(w² + h²)
        const pad = Math.ceil(diag * 1.1);      // small cushion so edges never show
        bg.style.width = pad + 'px';
        bg.style.height = pad + 'px';
    }
    sizeOverlay(); // size once on load

    // Recompute size whenever the viewport changes (e.g., resize, rotate device)
    window.addEventListener('resize', sizeOverlay, {passive: true});

    /* Helper: detect if current theme is light.
       Supports either data-theme="light" or a "light" class on <html> or <body>. */
    function isLight() {
        const root = document.documentElement;
        const body = document.body;

        return (
            root.dataset.theme === 'light' ||
            body.dataset.theme === 'light' ||
            root.classList.contains('light') ||
            body.classList.contains('light')
        );
    }

    // Apply the correct SVG for the current theme
    function bgForTheme() {
        bg.style.backgroundImage = isLight() ? "url('img/background-light.svg')" : "url('img/background-dark.svg')";
    }
    bgForTheme(); // set once on load

    /* Respect the user's OS setting for reduced motion (accessibility).
       If they prefer reduced motion, don't animate at all. */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Keeping a reference to the animation instance in case there's need to control it later.
    let anim = null;

    // Only start the animation if the user hasn't asked for reduced motion
    if (!prefersReduced) {

        /* Web Animations API:
           - keyframes: from rotate(0deg) to rotate(360deg) around the centered translate
           - options: duration, infinite loop, linear speed */
        anim = bg.animate(
            [
                {transform: 'translate(-50%, -50%) rotate(0deg)'},
                {transform: 'translate(-50%, -50%) rotate(360deg)'}
            ],
            {duration: 35000, iterations: Infinity, easing: 'linear'}
        );
    }

    /* Watch for theme changes (class/data-attr flips). Your theme toggle likely changes <html> or <body>
       attributes/classes. Whenever that happens, update the background image. */
    const obs = new MutationObserver(bgForTheme);
    obs.observe(document.documentElement, {attributes: true, attributeFilter: ['class', 'data-theme'] });
    obs.observe(document.body, {attributes: true, attributeFilter: ['class', 'data-theme'] });
})();

(function () {
    /* LocalStorage key name where user's chosen theme is saved (so when the page reloads, the site
       remembers the user's choice) */
    const KEY = 'theme';
    const btn = document.getElementById('theme-toggle');

    // If there's no button in the page, stop here (safety check)
    if (!btn) return;

    /* Try to read a previously saved theme from localStorage. This will be either "light" or "dark" if the user
       clicked before, or null if this is their first visit. */
    const saved = localStorage.getItem(KEY);

    /* Decide the initial theme:
       - if saved is valid ("light" or "dark"), use it
       - otherwise default to the default "dark" */
    const initial = (saved === 'light' || saved === 'dark') ? saved : 'dark';

    /* Apply the initial theme by setting data-theme on <html>
       Example: <html data-theme="dark"> ... </html> */
    document.documentElement.setAttribute('data-theme', initial);

    // Listens for clicks on the button
    btn.addEventListener('click', () => {

        // Get the current theme from <html>
        const current = document.documentElement.getAttribute('data-theme');

        // Decide the next theme: if dark - switch to light, if light - switch to dark
        const next = current === 'dark' ? 'light' : 'dark';

        // Apply the new theme
        document.documentElement.setAttribute('data-theme', next);

        // Save it to localStorage so it persists across reloads
        localStorage.setItem(KEY, next);
        btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    });
})();