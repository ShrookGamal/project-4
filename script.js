document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const closeMenu = document.getElementById('close-menu');
    const navLinks = document.querySelectorAll('.desktop-nav ul li a, .mobile-nav ul li a');
    const sections = document.querySelectorAll('section');
    const navContainer = document.querySelector('.nav-container');
    const cards = document.querySelectorAll('.service-card');
    const videoItems = document.querySelectorAll('.video-item');

    const handleActiveLink = () => {
        let scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    };

    const reveal = () => {
        const items = document.querySelectorAll('[data-reveal]');
        items.forEach(item => {
            if (item.getBoundingClientRect().top < window.innerHeight - 100) {
                item.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleActiveLink();
        reveal();
        if (window.scrollY > 50) {
            navContainer.style.padding = '5px 20px';
            navContainer.style.width = '95%';
        } else {
            navContainer.style.padding = '10px 25px';
            navContainer.style.width = '90%';
        }
    });

    menuBtn.onclick = () => sideMenu.classList.add('active');
    closeMenu.onclick = () => sideMenu.classList.remove('active');

    navLinks.forEach(link => {
        link.onclick = () => {
            sideMenu.classList.remove('active');
        };
    });

    cards.forEach(card => {
        card.onmousemove = (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        };
    });

    videoItems.forEach(item => {
        const video = item.querySelector('video');
        item.onmouseenter = () => video.play();
        item.onmouseleave = () => {
            video.pause();
            video.currentTime = 0;
        };
    });

    reveal();
    handleActiveLink();
});