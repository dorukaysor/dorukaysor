// 3D Cube Preloader JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Initialize preloader
    const preloader = document.getElementById('preloader');
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        // Add a minimum display time of 2 seconds for better UX
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('loaded');
                
                // Remove from DOM after fade animation
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Re-enable scrolling
                    document.documentElement.style.overflow = 'auto';
                }, 1000);
            }
        }, 2000); // 2-second minimum display time
    });
    
    // Disable scrolling while preloader is active
    document.documentElement.style.overflow = 'hidden';
});

// Optional: Hide preloader if it takes too long (fallback)
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.documentElement.style.overflow = 'auto';
        }, 1000);
    }
}, 8000); // 8-second maximum display time