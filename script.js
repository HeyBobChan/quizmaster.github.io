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

    // Slideshow functionality
    const slideshowContainer = document.querySelector('.slideshow-container');
    const images = [
        'IMG-20240827-WA0010.jpg',
        'IMG-20240827-WA0013.jpg',
        'IMG-20240827-WA0010.jpg',
        'IMG-20240827-WA0012.jpg',
        'IMG-20240827-WA0013.jpg'
    ];

    let currentImageIndex = 0;

    function preloadImages(imageArray, callback) {
        let loadedImages = 0;
        imageArray.forEach((imageSrc) => {
            const img = new Image();
            img.onload = () => {
                loadedImages++;
                if (loadedImages === imageArray.length) {
                    callback();
                }
            };
            img.src = imageSrc;
        });
    }

    function createImageElement(src) {
        const img = document.createElement('img');
        img.src = src;
        img.style.opacity = '0';
        slideshowContainer.appendChild(img);
        return img;
    }

    function showNextImage() {
        const currentImage = slideshowContainer.children[currentImageIndex];
        currentImage.style.opacity = '0';

        currentImageIndex = (currentImageIndex + 1) % images.length;
        const nextImage = slideshowContainer.children[currentImageIndex];
        nextImage.style.opacity = '1';

        const minDelay = 2000;
        const maxDelay = 7000;
        const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);

        setTimeout(showNextImage, randomDelay);
    }

    preloadImages(images, () => {
        images.forEach(createImageElement);
        showNextImage();
    });
});