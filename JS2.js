// ==================== HAMBURGER MENU ====================
const hamburgerMenu = {
    initialized: false, // Prevent multiple initializations
    
    init() {
        // Prevent multiple initializations
        if (this.initialized) {
            console.log('Hamburger menu already initialized');
            return true;
        }
        
        console.log('Attempting to initialize hamburger menu...');
        
        // Get DOM elements
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.overlay = document.getElementById('overlay');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        
        // Check if all required elements exist
        if (!this.hamburger || !this.navMenu || !this.overlay) {
            console.warn('Hamburger menu: Some required elements not found');
            console.log('Hamburger:', this.hamburger);
            console.log('NavMenu:', this.navMenu);
            console.log('Overlay:', this.overlay);
            return false;
        }
        
        // Bind event listeners
        this.bindEvents();
        this.initialized = true;
        console.log('✅ Hamburger menu initialized successfully');
        return true;
    },
    
    toggleMenu() {
        // Safety check
        if (!this.hamburger || !this.navMenu || !this.overlay) return;
        
        console.log('Toggling menu...');
        
        // Toggle active classes
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.overlay.classList.toggle('active');
        
        // Prevent/allow body scrolling
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : 'auto';
    },
    
    closeMenu() {
        // Safety check
        if (!this.hamburger || !this.navMenu || !this.overlay) return;
        
        console.log('Closing menu...');
        
        // Remove active classes
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    
    bindEvents() {
        // Hamburger button click
        this.hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
        
        // Overlay click to close menu
        this.overlay.addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Navigation links click to close menu
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // ESC key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
        
        console.log('Event listeners bound successfully');
    }
};

// ==================== MULTIPLE INITIALIZATION METHODS ====================

// Method 1: DOMContentLoaded (most reliable)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Method 1: DOMContentLoaded triggered');
        hamburgerMenu.init();
    });
} else {
    // DOM is already ready
    console.log('Method 1: DOM already ready');
    hamburgerMenu.init();
}

// Method 2: Window load (backup)
window.addEventListener('load', () => {
    console.log('Method 2: Window load triggered');
    hamburgerMenu.init();
});

// Method 3: Timeout fallback (last resort)
setTimeout(() => {
    console.log('Method 3: Timeout fallback triggered');
    hamburgerMenu.init();
}, 100);

// Method 4: Another timeout for slow loading pages
setTimeout(() => {
    console.log('Method 4: Extended timeout fallback triggered');
    hamburgerMenu.init();
}, 500);

// ==================== GLOBAL ACCESS ====================
// Make hamburgerMenu globally accessible
window.hamburgerMenu = hamburgerMenu;

// ==================== MANUAL INITIALIZATION FUNCTION ====================
// Function to manually initialize if needed
window.initHamburgerMenu = () => {
    console.log('Manual initialization triggered');
    return hamburgerMenu.init();
};