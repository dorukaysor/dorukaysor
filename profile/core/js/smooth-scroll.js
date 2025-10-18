/**
 * Smooth Scroll Animation System
 * Using Web Components and CSS Custom Properties
 * No external dependencies - pure modern web standards
 */

// Custom Web Component for smooth animations
class SmoothAnimator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.setupComponent();
  }

  setupComponent() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(var(--translate-y, 0));
          opacity: var(--opacity, 1);
        }

        :host(.animate-in) {
          --translate-y: 0;
          --opacity: 1;
        }

        :host(.animate-out) {
          --translate-y: 20px;
          --opacity: 0;
        }

        ::slotted(*) {
          transition: inherit;
        }
      </style>
      <slot></slot>
    `;
  }

  connectedCallback() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: [0, 0.1, 0.5, 0.9, 1],
      rootMargin: '50px 0px -10% 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const ratio = entry.intersectionRatio;
        
        if (ratio > 0.1) {
          this.classList.add('animate-in');
          this.classList.remove('animate-out');
          
          // Set custom properties for fine-tuned animation
          this.style.setProperty('--opacity', Math.min(ratio * 1.2, 1));
          this.style.setProperty('--translate-y', `${Math.max(0, (1 - ratio) * 20)}px`);
        } else {
          this.classList.remove('animate-in');
          this.classList.add('animate-out');
        }
      });
    }, options);

    this.observer.observe(this);
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Advanced Smooth Scroll Handler
class SmoothScrollManager {
  constructor() {
    this.isScrolling = false;
    this.ticking = false;
    this.lastScrollY = 0;
    this.scrollVelocity = 0;
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupCSSVariables();
  }

  bindEvents() {
    let scrollTimer;
    
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }

      // Detect scroll end
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        this.isScrolling = false;
        document.body.classList.remove('is-scrolling');
      }, 150);

      if (!this.isScrolling) {
        this.isScrolling = true;
        document.body.classList.add('is-scrolling');
      }
    }, { passive: true });
  }

  handleScroll() {
    const currentScrollY = window.pageYOffset;
    this.scrollVelocity = currentScrollY - this.lastScrollY;
    this.lastScrollY = currentScrollY;

    // Update CSS custom properties
    document.documentElement.style.setProperty('--scroll-y', currentScrollY);
    document.documentElement.style.setProperty('--scroll-velocity', Math.abs(this.scrollVelocity));
    
    // Add scroll direction class
    if (this.scrollVelocity > 0) {
      document.body.classList.add('scroll-down');
      document.body.classList.remove('scroll-up');
    } else if (this.scrollVelocity < 0) {
      document.body.classList.add('scroll-up');
      document.body.classList.remove('scroll-down');
    }
  }

  setupCSSVariables() {
    // Set initial CSS custom properties
    document.documentElement.style.setProperty('--scroll-y', '0');
    document.documentElement.style.setProperty('--scroll-velocity', '0');
    document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
    document.documentElement.style.setProperty('--viewport-width', `${window.innerWidth}px`);

    // Update on resize
    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
      document.documentElement.style.setProperty('--viewport-width', `${window.innerWidth}px`);
    }, { passive: true });
  }
}

// Performance-optimized Parallax Effect
class ParallaxController {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    this.gatherElements();
    this.bindScroll();
  }

  gatherElements() {
    // Auto-detect elements that should have parallax
    const candidates = document.querySelectorAll('.skill-card, .project-card, .card');
    
    candidates.forEach((el, index) => {
      const speed = 0.5 + (index % 3) * 0.2; // Varied speeds
      this.elements.push({
        element: el,
        speed: speed,
        offset: 0
      });
    });
  }

  bindScroll() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  updateParallax() {
    const scrollY = window.pageYOffset;

    this.elements.forEach(item => {
      const { element, speed } = item;
      const rect = element.getBoundingClientRect();
      
      // Only update if element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = -(scrollY * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Register the custom web component
  customElements.define('smooth-animator', SmoothAnimator);
  
  // Initialize managers
  new SmoothScrollManager();
  
  // Add some delay for parallax to allow content to load
  setTimeout(() => {
    new ParallaxController();
  }, 1000);

  console.log('🚀 Advanced smooth scrolling system initialized');
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SmoothAnimator, SmoothScrollManager, ParallaxController };
}