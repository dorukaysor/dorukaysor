// Loading Placeholders Management
document.addEventListener("DOMContentLoaded", function() {
    console.log('🔄 Initializing loading placeholders...');
    
    // Much simpler approach - just wait and show images
    setTimeout(() => {
        showAllImages();
    }, 1500); // Start showing images after 1.5 seconds
    
    setTimeout(() => {
        loadSkills();
    }, 3000); // Load skills after 3 seconds
    
    function showAllImages() {
        console.log('📸 Revealing project images...');
        const projectCards = document.querySelectorAll('.project-card.loading');
        console.log(`Found ${projectCards.length} project cards to reveal`);
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                const img = card.querySelector('img');
                const placeholder = card.querySelector('.skeleton-placeholder');
                
                console.log(`Revealing card ${index + 1}`);
                
                if (img && placeholder) {
                    // Simply show the image and hide placeholder
                    img.style.display = 'block';
                    img.style.opacity = '1';
                    placeholder.style.display = 'none';
                    card.classList.remove('loading');
                    card.classList.add('fade-in');
                    
                    console.log(`✅ Card ${index + 1} revealed`);
                }
            }, index * 500); // Stagger by 500ms each
        });
    }
    
    function loadSkills() {
        console.log('🎯 Loading skills carousel...');
        const skillsBelt = document.querySelector('.skills-carousel-belt.loading');
        
        if (skillsBelt) {
            // Simulate skills loading
            setTimeout(() => {
                skillsBelt.classList.remove('loading');
                skillsBelt.classList.add('loaded');
                console.log('✅ Skills carousel loaded');
            }, 1500);
        }
    }
    
    // Add loading indicators to specific sections that need them
    function addGlaringPlaceholders() {
        // Only add loading banners to sections that actually load external content
        const sectionsToLoad = ['#projects']; // Only projects section needs loading banners
        
        sectionsToLoad.forEach(sectionId => {
            const section = document.querySelector(sectionId);
            if (section) {
                const banner = document.createElement('div');
                banner.className = 'loading-banner';
                banner.innerHTML = `
                    <div class="loading-banner-content">
                        <div class="loading-spinner"></div>
                        <h3>🔄 LOADING PROJECTS...</h3>
                        <p>Please wait while we fetch amazing projects for you!</p>
                    </div>
                `;
                banner.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    border: 3px dashed #ff6b6b;
                    color: #ff6b6b;
                    font-family: monospace;
                    text-align: center;
                    animation: pulse 2s ease-in-out infinite;
                `;
                
                section.style.position = 'relative';
                section.appendChild(banner);
                
                // Remove banner after a delay
                setTimeout(() => {
                    if (banner.parentNode) {
                        banner.style.opacity = '0';
                        banner.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            if (banner.parentNode) {
                                banner.parentNode.removeChild(banner);
                            }
                        }, 500);
                    }
                }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
            }
        });
    }
    
    // Add glaring placeholders immediately
    addGlaringPlaceholders();
});