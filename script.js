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
    
    document.addEventListener('DOMContentLoaded', function() {
        const slideshowContainer = document.querySelector('.slideshow-container');
        const media = [
            { type: 'video', src: 'yossipointing.mp4', poster: 'yossipointing-poster.jpg' },
            { type: 'video', src: 'C0052 (edited).mp4', poster: 'C0052-poster.jpg' },
            { type: 'video', src: 'C0051 (edited) (1).mp4', poster: 'C0051-poster.jpg' },
            { type: 'image', src: 'C5862 (edited).jpg' },
            { type: 'image', src: 'huyhappy.jpg' }
        ];
    
        let currentMediaIndex = 0;
        let mediaElements = [];
    
        function createMediaElement(item) {
            let element;
            if (item.type === 'video') {
                element = document.createElement('video');
                element.src = item.src;
                element.poster = item.poster;
                element.muted = true;
                element.playsInline = true;
                element.preload = 'metadata';
                element.addEventListener('loadedmetadata', () => {
                    console.log(`Metadata loaded for ${item.src}`);
                });
                element.addEventListener('error', (e) => {
                    console.error(`Error loading video ${item.src}:`, e);
                    showNextMedia(); // Skip to next on error
                });
            } else {
                element = document.createElement('img');
                element.src = item.src;
                element.alt = 'Slideshow image';
            }
            element.style.opacity = '0';
            element.style.display = 'none';
            slideshowContainer.appendChild(element);
            return element;
        }
    
        async function showNextMedia() {
            const currentMedia = mediaElements[currentMediaIndex];
            currentMedia.style.opacity = '0';
            currentMedia.style.display = 'none';
            if (currentMedia.tagName === 'VIDEO') {
                currentMedia.pause();
                currentMedia.currentTime = 0;
            }
    
            currentMediaIndex = (currentMediaIndex + 1) % media.length;
            const nextMedia = mediaElements[currentMediaIndex];
    
            nextMedia.style.opacity = '1';
            nextMedia.style.display = 'block';
    
            if (nextMedia.tagName === 'VIDEO') {
                try {
                    await nextMedia.play();
                    console.log(`Playing video: ${nextMedia.src}`);
                    nextMedia.onended = showNextMedia;
                } catch (e) {
                    console.error(`Error playing video ${nextMedia.src}:`, e);
                    setTimeout(showNextMedia, 1000); // Try next media after a short delay
                }
            } else {
                // For images, move to next slide after a fixed duration
                setTimeout(showNextMedia, 5000);
            }
        }
    
        // Create all media elements
        mediaElements = media.map(createMediaElement);
    
        // Preload the first few videos
        mediaElements.slice(0, 3).forEach(element => {
            if (element.tagName === 'VIDEO') {
                element.load();
            }
        });
    
        function initSlideshow() {
            mediaElements[0].style.opacity = '1';
            mediaElements[0].style.display = 'block';
            if (mediaElements[0].tagName === 'VIDEO') {
                mediaElements[0].play().catch(e => {
                    console.error('Error playing first video:', e);
                    showNextMedia();
                });
            } else {
                setTimeout(showNextMedia, 5000);
            }
        }
    
        initSlideshow();
    });

})