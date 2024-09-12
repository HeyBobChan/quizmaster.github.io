document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const menuItems = nav.querySelector('.menu-items');
    const hamburgerMenu = nav.querySelector('.hamburger-menu');
    const hamburgerIcon = hamburgerMenu.querySelector('.hamburger-icon');

    function toggleMenu() {
        menuItems.classList.toggle('show');
        hamburgerIcon.classList.toggle('active');
    }

    function closeMenu() {
        menuItems.classList.remove('show');
        hamburgerIcon.classList.remove('active');
    }

    function isMobile() {
        return window.innerWidth <= 768;
    }

    hamburgerIcon.addEventListener('click', function(event) {
        if (isMobile()) {
            event.stopPropagation();
            toggleMenu();
        }
    });

    document.addEventListener('click', function(event) {
        if (isMobile() && !nav.contains(event.target) && menuItems.classList.contains('show')) {
            closeMenu();
        }
    });

    function handleScreenSize() {
        if (isMobile()) {
            menuItems.classList.remove('show');
            hamburgerIcon.style.display = 'block';
        } else {
            menuItems.classList.remove('show');
            hamburgerIcon.classList.remove('active');
            hamburgerIcon.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleScreenSize);
    handleScreenSize(); // Call this immediately to set the initial state

    // Video slideshow functionality
    const slideshowContainer = document.querySelector('.slideshow-container');
    const media = [
        { type: 'video', src: 'yossipointing.mp4' },
        { type: 'video', src: 'C0052 (edited).mp4' },
        { type: 'video', src: 'C0051 (edited) (1).mp4' },
        { type: 'video', src: 'C5862 (edited).mp4' },
        { type: 'video', src: 'huyhappy.mp4' }
    ];

    let currentMediaIndex = 0;
    let mediaElements = [];

    function createMediaElement(item) {
        let element;
        if (item.type === 'video') {
            element = document.createElement('video');
            element.muted = true;
            element.loop = false;
        } else {
            element = document.createElement('img');
        }
        element.src = item.src;
        element.style.opacity = '0';
        slideshowContainer.appendChild(element);
        return element;
    }

    function showNextMedia() {
        mediaElements[currentMediaIndex].style.opacity = '0';
        if (mediaElements[currentMediaIndex].tagName === 'VIDEO') {
            mediaElements[currentMediaIndex].pause();
        }

        currentMediaIndex = (currentMediaIndex + 1) % media.length;
        mediaElements[currentMediaIndex].style.opacity = '1';

        if (mediaElements[currentMediaIndex].tagName === 'VIDEO') {
            mediaElements[currentMediaIndex].currentTime = 0;
            mediaElements[currentMediaIndex].play().catch(e => console.error("Error playing video:", e));
        }
    }

    // Create all media elements
    mediaElements = media.map(createMediaElement);

    // Start the slideshow
    mediaElements[0].style.opacity = '1';
    if (mediaElements[0].tagName === 'VIDEO') {
        mediaElements[0].play().catch(e => console.error("Error playing initial video:", e));
    }

    setInterval(showNextMedia, 5000); // Change media every 5 seconds

    // Add header padding to body
    document.body.classList.add('with-header-padding');
});
