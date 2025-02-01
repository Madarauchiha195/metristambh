const carousel = document.querySelector('.carousel');
const list = document.querySelector('.list');
const items = document.querySelectorAll('.item');
const runningTime = document.querySelector('.carousel .timeRunning');
const navbar = document.querySelector('.hamburger-menu'); // Nav elements to exclude
const navLinks = document.querySelector('.nav-links'); // Nav links to exclude
const readMeButtons = document.querySelectorAll('.readmore-sumbmit-btn'); // Read Me buttons to exclude

let timeRunning = 5000;
let timeAutoNext = 15000;

// Auto navigation setup
let runNextAuto = setTimeout(() => {
    showSlider('next');
}, timeAutoNext);

// Reset animation for time-running indicator
function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight; // Trigger reflow
    runningTime.style.animation = 'runningTime 10s linear 5s forwards';
}

// Carousel navigation logic
function showSlider(direction) {
    const sliderItemsDom = list.querySelectorAll('.item');

    if (direction === 'next') {
        list.appendChild(sliderItemsDom[0]); // Move first item to the end
        carousel.classList.add('next');
    } else if (direction === 'prev') {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]); // Move last item to the front
        carousel.classList.add('prev');
    }

    // Clear classes after animation
    setTimeout(() => {
        carousel.classList.remove('next', 'prev');
    }, 500);

    // Reset auto navigation timer
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        showSlider('next');
    }, timeAutoNext);

    resetTimeAnimation(); // Restart animation
}

// Initial animation start
resetTimeAnimation();

// Create navigation buttons
const leftButton = document.createElement('button');
const rightButton = document.createElement('button');

// Style and set up navigation buttons
leftButton.className = 'nav-button left-button';
rightButton.className = 'nav-button right-button';
leftButton.innerHTML = '&lt;';
rightButton.innerHTML = '&gt;';

document.body.appendChild(leftButton);
document.body.appendChild(rightButton);

leftButton.style.display = 'none';
rightButton.style.display = 'none';

// Handle mouse movement for dynamic button appearance
document.addEventListener('mousemove', (event) => {
    const leftBoundary = window.innerWidth * 0.25; // 25% from the left
    const rightBoundary = window.innerWidth * 0.75; // 25% from the right
    const topMargin = window.innerHeight * 0.15; // 15% from the top
    const bottomMargin = window.innerHeight * 0.85; // 15% from the bottom

    // Check if hovering over a "Read Me" button
    const isInReadMeButton = Array.from(readMeButtons).some((button) => button.contains(event.target));

    if (event.clientY <= topMargin || event.clientY >= bottomMargin || isInReadMeButton) {
        document.body.style.cursor = 'default';
        leftButton.style.display = 'none';
        rightButton.style.display = 'none';
        return;
    }

    document.body.style.cursor = 'pointer';
    if (event.clientX < leftBoundary) {
        leftButton.style.display = 'block';
        leftButton.style.top = `${event.clientY - 25}px`;
        leftButton.style.left = `${event.clientX - 25}px`;
        rightButton.style.display = 'none';
    } else if (event.clientX > rightBoundary) {
        rightButton.style.display = 'block';
        rightButton.style.top = `${event.clientY - 25}px`;
        rightButton.style.left = `${event.clientX - 25}px`;
        leftButton.style.display = 'none';
    } else {
        leftButton.style.display = 'none';
        rightButton.style.display = 'none';
    }
});

// Prevent carousel navigation in the top and bottom regions or excluded elements
document.addEventListener('click', (event) => {
    const topMargin = window.innerHeight * 0.15; // 15% from the top
    const bottomMargin = window.innerHeight * 0.85; // 15% from the bottom
    const clickedElement = event.target;

    // Check if the click is in the navbar, nav-links, read-me buttons, or restricted regions
    const isInTopRegion = event.clientY <= topMargin;
    const isInBottomRegion = event.clientY >= bottomMargin;
    const isNavbarClick = navbar.contains(clickedElement) || navLinks.contains(clickedElement);
    const isReadMeClick = Array.from(readMeButtons).some((button) => button.contains(clickedElement));

    if ((isInTopRegion || isInBottomRegion) && !isNavbarClick && !isReadMeClick) {
        console.log('Click blocked in the restricted region');
        event.preventDefault();
        event.stopPropagation();
        return;
    }
});

// Add click events for buttons
leftButton.addEventListener('click', () => showSlider('prev'));
rightButton.addEventListener('click', () => showSlider('next'));

// Handle edge clicks for navigation
document.addEventListener('click', (event) => {
    const leftBoundary = window.innerWidth * 0.3; // 30% from the left
    const rightBoundary = window.innerWidth * 0.7; // 30% from the right

    const topMargin = window.innerHeight * 0.15; // Prevent carousel clicks in the top 15%
    const bottomMargin = window.innerHeight * 0.85; // Prevent carousel clicks in the bottom 15%
    const isInReadMeButton = Array.from(readMeButtons).some((button) => button.contains(event.target));

    if (event.clientY <= topMargin || event.clientY >= bottomMargin || isInReadMeButton) return;

    if (event.clientX < leftBoundary) {
        showSlider('prev');
    } else if (event.clientX > rightBoundary) {
        showSlider('next');
    }
});

// Hamburger Menu Logic
hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});





const navigation = document.querySelector(".primary-navigation");

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty(
    "--scroll-padding",
    navigationHeight + "px"
);
