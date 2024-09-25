document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
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
    const hamburgerIcon = document.createElement('div');
    hamburgerIcon.className = 'hamburger-icon';
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        hamburgerIcon.appendChild(span);
    }

    nav.appendChild(hamburgerIcon);

    // Toggle the menu on hamburger icon click
    hamburgerIcon.addEventListener('click', function() {
        menuItems.classList.toggle('show');
    });

    // Hide the menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && menuItems.classList.contains('show')) {
            menuItems.classList.remove('show');
        }
    });

    // Custom Cursor Effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Wiggle Effect
    document.addEventListener('mousemove', function(e) {
        cursor.style.transform = `translate(-50%, -50%) rotate(${Math.sin(e.clientX * 0.05) * 10}deg)`;
    });

    // Ensure default cursor is hidden
    // Remove the line that hides the default cursor
    // document.body.style.cursor = 'none'; 

    // Video slideshow for the main page
    if (document.querySelector('.hero')) {
        const slideshowContainer = document.querySelector('.slideshow-container');
        const media = [
            { type: 'video', src: 'yossipointing.mp4'},
            { type: 'video', src: 'C0052.mp4'},
            { type: 'video', src: 'C5862.mp4' },
            { type: 'video', src: 'C0051.mp4' },
            { type: 'video', src: 'huyhappy.mp4'}
            
            
        ];

        let currentMediaIndex = 0;
        let mediaElements = [];

        function createMediaElement(item) {
            let element = document.createElement('video');
            element.src = item.src;
            element.controls = false;
            element.muted = true;
            element.loop = false;
            element.preload = 'auto';
            element.autoplay = true;
            element.setAttribute('playsinline', '');
            element.setAttribute('webkit-playsinline', '');
            element.style.opacity = '0';
            element.style.display = 'none';
            slideshowContainer.appendChild(element);
            return element;
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
            nextMedia.play();

            nextMedia.onended = showNextMedia;
        }

        // Create all media elements
        mediaElements = media.map(createMediaElement);

        // Start the slideshow
        function initSlideshow() {
            const firstMedia = mediaElements[currentMediaIndex];
            firstMedia.style.opacity = '1';
            firstMedia.style.display = 'block';
            firstMedia.play();
            firstMedia.onended = showNextMedia;
        }

        initSlideshow();
    }
});
