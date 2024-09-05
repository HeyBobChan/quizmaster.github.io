document.addEventListener('DOMContentLoaded', function() {
    // Normal navigation functionality
    const nav = document.querySelector('nav');
    const menuItems = document.createElement('ul');
    menuItems.className = 'menu-items';

    const menuLinks = [
        { href: 'index.html', text: 'דף הבית' },
        { href: 'about.html', text: 'אודות' },
        { href: 'services.html', text: 'שירותים' },
        { href: 'contact.html', text: 'צור קשר' }
    ];

    menuLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        menuItems.appendChild(li);
    });

    nav.appendChild(menuItems);

    // Hamburger menu functionality
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    
    const hamburgerIcon = document.createElement('div');
    hamburgerIcon.className = 'hamburger-icon';
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        hamburgerIcon.appendChild(span);
    }

    hamburgerMenu.appendChild(hamburgerIcon);
    nav.appendChild(hamburgerMenu);

    // Toggle the menu on hamburger icon click
    hamburgerIcon.addEventListener('click', function() {
        menuItems.classList.toggle('show');
        hamburgerIcon.classList.toggle('active');
    });

    // Hide the menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburgerMenu.contains(event.target) && menuItems.classList.contains('show')) {
            menuItems.classList.remove('show');
            hamburgerIcon.classList.remove('active');
        }
    });

    // Always show the normal navigation on the left on larger screens
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            menuItems.classList.remove('show');
            hamburgerIcon.classList.remove('active');
            menuItems.classList.remove('mobile-menu');
        } else {
            menuItems.classList.add('mobile-menu');
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    const media = [
        { type: 'video', src: '/C0051.mp4' },
        { type: 'video', src: '/huyhappy.mp4' },
        { type: 'video', src: '/closeyoossitama.mp4' },
        { type: 'video', src: '/closuppage.mp4' },
        { type: 'video', src: '/yossipointing.mp4' }
    ];

let currentMediaIndex = 0;
let mediaElements = [];

function createMediaElement(item) {
    let element = document.createElement('video');
    element.src = item.src;
    element.controls = false;
    element.muted = true;
    element.loop = false;
    element.preload = 'none';
    element.style.opacity = '0';
    element.style.display = 'none';
    element.crossOrigin = 'anonymous';
    slideshowContainer.appendChild(element);
    return element;
}

function loadVideo(index) {
    const video = mediaElements[index];
    if (video.preload !== 'auto') {
        video.preload = 'auto';
        return new Promise((resolve, reject) => {
            video.oncanplaythrough = resolve;
            video.onerror = (e) => {
                console.error(`Error loading video ${video.src}:`, e);
                reject(new Error(`Video load error: ${video.src} - ${e.type}`));
            };
            video.load();
        });
    }
    return Promise.resolve();
}

async function showNextMedia() {
    const currentMedia = mediaElements[currentMediaIndex];
    currentMedia.style.opacity = '0';
    currentMedia.style.display = 'none';
    currentMedia.pause();
    currentMedia.currentTime = 0;

    currentMediaIndex = (currentMediaIndex + 1) % media.length;
    const nextMedia = mediaElements[currentMediaIndex];

    try {
        await loadVideo(currentMediaIndex);
        nextMedia.style.opacity = '1';
        nextMedia.style.display = 'block';
        await nextMedia.play();
        console.log(`Playing video: ${nextMedia.src}`);

        // Start loading the next video
        const nextIndex = (currentMediaIndex + 1) % media.length;
        loadVideo(nextIndex).catch(e => console.error(`Error preloading next video: ${e.message}`));
    } catch (e) {
        console.error(`Error playing video ${nextMedia.src}:`, e.message);
        showNextMedia(); // Skip to next video if there's an error
    }

    nextMedia.onended = showNextMedia;
}

// Create all media elements
mediaElements = media.map(createMediaElement);

// Start the slideshow
async function initSlideshow() {
    try {
        await loadVideo(0); // Preload the first video
        showNextMedia();
    } catch (e) {
        console.error("Error initializing slideshow:", e.message);
    }
}

// Add this function to check if we're running on GitHub Pages
function isGitHubPages() {
    return window.location.hostname.includes('github.io');
}

// Modify initSlideshow to include GitHub Pages specific logic
    async function initSlideshow() {
        if (isGitHubPages()) {
            console.log("Running on GitHub Pages. Ensuring videos are served correctly...");
            // Update video sources for GitHub Pages
            media.forEach(item => {
                item.src = `/quizmaster.github.io${item.src}`;
            });
        }
        
        try {
            await loadVideo(0); // Preload the first video
            showNextMedia();
        } catch (e) {
            console.error("Error initializing slideshow:", e.message);
            // Fallback: display an error message in the slideshow container
            slideshowContainer.innerHTML = `<p>Error loading slideshow. Please check the console for more information.</p>`;
        }
    }

    initSlideshow();
    
});