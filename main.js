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