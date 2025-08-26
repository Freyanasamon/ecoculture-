// ==================== HAMBURGER MENU ====================
const hamburgerMenu = {
    init() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.overlay = document.getElementById('overlay');
        this.navLinks = document.querySelectorAll('.nav-menu a');

        if (!this.hamburger || !this.navMenu || !this.overlay) return;

        this.bindEvents();
    },

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.overlay.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : 'auto';
    },

    bindEvents() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.overlay.addEventListener('click', () => this.toggleMenu());

        
   this.navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // close the menu, no preventDefault
        this.toggleMenu();
    });
});
    }
};

// ==================== CAROUSEL ====================
const carousel = {
    init() {
        this.currentSlideIndex = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.carouselWrapper = document.getElementById('carouselWrapper');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');

        this.autoSlideInterval = null;
        this.autoSlideDelay = 4000;

        if (!this.carouselWrapper || this.totalSlides === 0) {
            console.warn('Carousel elements not found');
            return;
        }

        this.bindEvents();
        this.startAutoSlide();
    },

    updateSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;

        this.currentSlideIndex = index;
        this.carouselWrapper.style.transform = `translateX(-${index * 100}%)`;

        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    },

    nextSlide() {
        const nextIndex = (this.currentSlideIndex + 1) % this.totalSlides;

        // Seamless loop from last to first
        if (this.currentSlideIndex === this.totalSlides - 1) {
            const firstSlideClone = this.slides[0].cloneNode(true);
            this.carouselWrapper.appendChild(firstSlideClone);

            this.carouselWrapper.style.transform = `translateX(-${this.totalSlides * 100}%)`;

            setTimeout(() => {
                this.carouselWrapper.style.transition = 'none';
                this.carouselWrapper.style.transform = 'translateX(0%)';
                this.carouselWrapper.removeChild(firstSlideClone);
                this.currentSlideIndex = 0;

                this.dots.forEach((dot, i) => dot.classList.toggle('active', i === 0));

                setTimeout(() => {
                    this.carouselWrapper.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 50);
            }, 800);
        } else {
            this.updateSlide(nextIndex);
        }
    },

    prevSlide() {
        const prevIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;

        // Seamless loop from first to last
        if (this.currentSlideIndex === 0) {
            const lastSlideClone = this.slides[this.totalSlides - 1].cloneNode(true);
            this.carouselWrapper.insertBefore(lastSlideClone, this.slides[0]);

            this.carouselWrapper.style.transition = 'none';
            this.carouselWrapper.style.transform = `translateX(-100%)`;

            setTimeout(() => {
                this.carouselWrapper.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                this.carouselWrapper.style.transform = 'translateX(0%)';

                setTimeout(() => {
                    this.carouselWrapper.style.transition = 'none';
                    this.carouselWrapper.removeChild(lastSlideClone);
                    this.carouselWrapper.style.transform = `translateX(-${(this.totalSlides - 1) * 100}%)`;
                    this.currentSlideIndex = this.totalSlides - 1;

                    this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.totalSlides - 1));

                    setTimeout(() => {
                        this.carouselWrapper.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 50);
                }, 800);
            }, 50);
        } else {
            this.updateSlide(prevIndex);
        }
    },

    startAutoSlide() {
        if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);

        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    },

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    },

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    },

    bindEvents() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.restartAutoSlide();
            });
        }

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.restartAutoSlide();
            });
        }

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.updateSlide(index);
                this.restartAutoSlide();
            });
        });

        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoSlide());

            let startX = 0;
            let endX = 0;

            carouselContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                this.stopAutoSlide();
            });

            carouselContainer.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;

                if (Math.abs(diff) > 50) {
                    diff > 0 ? this.nextSlide() : this.prevSlide();
                }
                this.startAutoSlide();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.restartAutoSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.restartAutoSlide();
            }
        });
    }
};

// ==================== PAGE ANIMATIONS ====================
const pageAnimations = {
    init() {
        window.addEventListener('load', () => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        });
    }
};

// ==================== CTA BUTTON ====================
const ctaButton = {
    init() {
        const button = document.querySelector('.cta-button');
        if (button) {
            button.addEventListener('click', () => {
                window.location.href = "booking.html";
            });
        }
    }
};

// ==================== APP INITIALIZATION ====================
function initializeApp() {
    console.log('Initializing application...');

    hamburgerMenu.init();
    carousel.init();
    pageAnimations.init();
    ctaButton.init();

    console.log('Application initialized successfully');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Ensure carousel restarts on window load if needed
window.addEventListener('load', () => {
    if (carousel.slides?.length > 0 && carousel.carouselWrapper && !carousel.autoSlideInterval) {
        carousel.startAutoSlide();
    }
});
