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

// ============= Job details data ==============
        const jobDetails = {
            job1: {
                title: "Profil Animateur Socioculturel",
                contact: "",
                description: `Le profil d’animateur socioculturel s’adresse à toute personne voulant acquérir une expérience professionnelle dans ce domaine. 
                Une expérience dans le milieu culturel ou celui de l’animation est un plus. 
                <br><br>
                <strong>Les tâches à effectuer sont les suivantes : </strong>
                <br>

                • Mise en place d’animation et d’activités culturelles, <br>
                    &nbsp;&nbsp;&nbsp; techniques ou ludiques <br>
                • S’adapter à différents espaces et différentes structures d’accueils <br>
                    &nbsp;&nbsp;&nbsp; mais aussi à divers publics <br>
                    &nbsp;&nbsp;&nbsp; (pouvoir animer un espace multimédia, par exemple)<br>
                • Préparer le matériel nécessaire et l’espace d’animation <br>
                • Suivre et mettre à jour les informations professionnelles <br>
                    &nbsp;&nbsp;&nbsp; et réglementaires <br>
                • Promouvoir la culture à travers les animations <br>
                • Sensibiliser aux enjeux écologiques via des interventions dans  <br>
                    &nbsp;&nbsp;&nbsp; diverses écoles de la région Wallonie-Bruxelles <br>
                • Proposer et créer de nouveaux projets artistiques <br>
                • Acquérir des savoirs faires et des compétences en participant aux <br>
                    &nbsp;&nbsp;&nbsp; formations internes,en utilisant les ressources à disposition, etc. <br><br>

                Les animateurs travaillant avec nous doivent aussi prendre part aux projets de création, 
                artistique ou théâtrale, développés parallèlement à leurs activités. Ainsi, ils acquerront 
                également des compétences transversales. <br>`,

                buttonText: "Contact Carrières : asbl.ecoculture@yahoo.fr"
            },
            job2: {
                title: "Profil Metteur en Scène",
                contact: "",
                description: `Le profil de metteur en scène s’adresse à ceux qui ont déjà de l’expérience dans le monde artistique ou à ceux qui veulent acquérir une expérience dans ce milieu. 
                Tous les artistes sont les bienvenus, qu’ils soient issus du milieu du théâtre, du cinéma ou encore de la photographie ou de la danse (à titre d’exemple). Grâce à la formation qu’ils recevront chez Ecoculture, 
                les artistes apprendront à créer et à s’intégrer dans leurs œuvres. Les tâches à effectuer sont les suivantes : 

                <br><br>

                • Choisir et analyser le point de départ pour la création d’un spectacle <br>
                • Créer ou adapter une pièce <br>
                • Analyser la structure de la pièce et créer la scénographie <br>
                • Participer à la distribution des rôles et apprendre un rôle <br>
                • Inclure les différents éléments d’une présentation scénique ou <br>
                &nbsp;&nbsp;&nbsp; performance (lumières, son, costumes, décors, etc.) <br>
                • Participer au processus de répétition <br>
                • Faire une présentation publique <br>
                • Analyser les résultats de la présentation publique afin d’améliorer <br>
                &nbsp;&nbsp;&nbsp; celle-ci et de pouvoir en faire la diffusion <br><br>

                Le but est pour les artistes d’apprendre à devenir autonome dans la création d'œuvres artistiques qui se connectent avec la société actuelle 
                et le public d’aujourd’hui. Les metteurs en scène doivent également participer aux activités parallèles d’animations socioculturelles de l’ASBL. <br>`,

                buttonText: "Contact Carrières : asbl.ecoculture@yahoo.fr"
            }
        };

        function showJobDetails(jobId) {
            const content = document.getElementById('careerContent');
            const job = jobDetails[jobId];
            
            // Add fade out effect
            content.classList.add('content-fade-out');
            
            setTimeout(() => {
                // Update content
                document.querySelector('.career-title').textContent = job.title;
                document.getElementById('contactInfo').textContent = job.contact;
                document.getElementById('mainDescription').innerHTML = job.description;
                document.getElementById('mainButton').textContent = job.buttonText;
                
                // Remove fade out and trigger fade in
                content.classList.remove('content-fade-out');
            }, 400);
        }

        
