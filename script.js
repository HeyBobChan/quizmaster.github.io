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

    hamburgerIcon.addEventListener('click', function() {
        menuItems.classList.toggle('show');
        hamburgerIcon.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!hamburgerMenu.contains(event.target) && !menuItems.contains(event.target)) {
            menuItems.classList.remove('show');
            hamburgerIcon.classList.remove('active');
        }
    });

    function checkScreenSize() {
        if (window.innerWidth > 768) {
            menuItems.classList.remove('show');
            hamburgerIcon.classList.remove('active');
            menuItems.classList.remove('show-on-mobile');
        } else {
            menuItems.classList.add('show-on-mobile');
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

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
