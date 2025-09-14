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

/* === Rotating background that tracks dark/light === */
(function () {
    // Creating the overlay behind content
    const bg = document.createElement('div');
    Object.assign(bg.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '-1',
        pointerEvents: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        willChange: 'transform, width, height, background-image'
    });
    document.body.prepend(bg);

    // Preload both backgrounds to avoid flicker on theme change
    ["img/background-dark.svg", "img/background-light.svg"].forEach(s => {
        const i = new Image();
        i.src = s;
    });

    // Size it to the viewport diagonal so rotation corners never show
    function sizeOverlay() {
        const diag = Math.hypot(window.innerWidth, window.innerHeight);
        const pad = Math.ceil(diag * 1.1);
        bg.style.width = pad + 'px';
        bg.style.height = pad + 'px';
    }
    sizeOverlay();
    window.addEventListener('resize', sizeOverlay, {passive: true});

    // Decide which theme is active and set the right SVG
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

    function bgForTheme() {
        bg.style.backgroundImage = isLight() ? "url('img/background-light.svg')" : "url('img/background-dark.svg')";
    }
    bgForTheme();

    // Animate (Web animations API)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let anim = null;
    if (!prefersReduced) {
        anim = bg.animate(
            [
                {transform: 'translate(-50%, -50%) rotate(0deg)'},
                {transform: 'translate(-50%, -50%) rotate(360deg)'}
            ],
            {duration: 30000, iterations: Infinity, easing: 'linear'}
        );
    }

    // Watch for theme changes (class/data-attr flips)
    const obs = new MutationObserver(bgForTheme);
    obs.observe(document.documentElement, {attributes: true, attributeFilter: ['class', 'data-theme'] });
    obs.observe(document.body, {attributes: true, attributeFilter: ['class', 'data-theme'] });
})();