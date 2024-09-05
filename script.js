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
        { type: 'video', src: 'yossipointing.MP4' },
        { type: 'video', src: 'huyhappy.MP4' },
        { type: 'video', src: 'C0052.MP4' },
        { type: 'video', src: 'C0051.MP4' },

        { type: 'image', src: 'C5862 (edited).mp4' }
    ];
    
let currentMediaIndex = 0;
let mediaElements = [];
let preloadIndex = 0;

function createMediaElement(item) {
    let element = document.createElement('video');
    element.src = item.src;
    element.controls = false;
    element.muted = true;
    element.loop = false;
    element.preload = 'none'; // Don't preload all videos at once
    element.style.opacity = '0';
    element.style.display = 'none';
    element.crossOrigin = 'anonymous'; // Add this line to handle CORS
    slideshowContainer.appendChild(element);
    return element;
}

function preloadNextVideo() {
    const nextIndex = (preloadIndex + 1) % media.length;
    const nextVideo = mediaElements[nextIndex];
    if (nextVideo.preload !== 'auto') {
        nextVideo.preload = 'auto';
        nextVideo.load();
    }
    preloadIndex = nextIndex;
}

function showNextMedia() {
    const currentMedia = mediaElements[currentMediaIndex];
    currentMedia.style.opacity = '0';
    currentMedia.style.display = 'none';
    currentMedia.pause();
    currentMedia.currentTime = 0;

    currentMediaIndex = (currentMediaIndex + 1) % media.length;
    const nextMedia = mediaElements[currentMediaIndex];
    nextMedia.style.opacity = '1';
    nextMedia.style.display = 'block';

    nextMedia.play().then(() => {
        console.log(`Playing video: ${nextMedia.src}`);
        preloadNextVideo(); // Preload the next video while current one is playing
    }).catch(e => {
        console.error(`Error playing video ${nextMedia.src}:`, e);
        showNextMedia(); // Skip to next video if there's an error
    });

    nextMedia.onended = showNextMedia;
}

// Create all media elements
mediaElements = media.map(createMediaElement);

// Preload the first two videos
mediaElements[0].preload = 'auto';
mediaElements[0].load();
mediaElements[1].preload = 'auto';
mediaElements[1].load();

// Start the slideshow
showNextMedia();
    
});
