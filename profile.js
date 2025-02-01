document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project'); // Select all projects

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the viewport
        threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const loadProject = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const project = entry.target;

                // Load the image
                const img = project.querySelector('.lazy-load');
                if (img && img.dataset.src) {
                    img.src = img.dataset.src; // Set the actual image source
                    img.removeAttribute('data-src'); // Remove the data-src attribute
                }

                // Add the "loaded" class for animation
                project.classList.add('loaded');

                // Stop observing the project once loaded
                observer.unobserve(project);
            }
        });
    };

    const observer = new IntersectionObserver(loadProject, observerOptions);

    // Observe each project
    projects.forEach(project => observer.observe(project));
});

// Scroll to Top Functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const projectPlaceholders = document.querySelectorAll('.project');
    const lightbox = document.getElementById('lightbox');
    const lightboxMainImage = document.getElementById('lightbox-main-image');
    const thumbnailsContainer = lightbox.querySelector('.lightbox-thumbnails');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    let currentImages = [];
    let currentIndex = 0;

    // Open lightbox
    projectPlaceholders.forEach((placeholder) => {
        placeholder.addEventListener('click', () => {
            currentImages = placeholder.dataset.images.split(',');
            currentIndex = 0;
            openLightbox(currentImages, currentIndex);
        });
    });

    function openLightbox(images, index) {
        lightbox.classList.add('active');
        updateMainImage(images[index]);
        renderThumbnails(images);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function updateMainImage(src) {
        lightboxMainImage.src = src;
    }

    function renderThumbnails(images) {
        thumbnailsContainer.innerHTML = images
            .map((src, idx) => `<img src="${src}" data-index="${idx}" alt="Thumbnail">`)
            .join('');
        thumbnailsContainer.querySelectorAll('img').forEach((thumbnail) => {
            thumbnail.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.dataset.index, 10);
                updateMainImage(images[currentIndex]);
            });
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateMainImage(currentImages[currentIndex]);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateMainImage(currentImages[currentIndex]);
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
});



