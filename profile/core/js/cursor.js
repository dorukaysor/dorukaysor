/**
 * Custom Circular Mouse Pointer
 * Creates and manages custom cursor with smooth animations
 */

class CustomCursor {
  constructor() {
    this.cursor = null;
    this.isMoving = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.init();
  }

  init() {
    // Only initialize on non-touch devices
    if (this.isTouchDevice()) {
      return;
    }

    this.createCursor();
    this.bindEvents();
    this.animate();
  }

  // Check if device supports touch
  isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
  }

  // Create cursor element
  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
  }

  // Bind mouse events
  bindEvents() {
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isMoving = true;
    });

    // Mouse enter/leave window
    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
    });

    // Mouse down/up for click animation
    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('custom-cursor--click');
    });

    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('custom-cursor--click');
    });

    // Hover states for different elements
    this.setupHoverStates();
  }

  // Setup hover states for different element types
  setupHoverStates() {
    // Button elements (special animation)
    const buttonSelectors = [
      'button', 'input[type="button"]', 'input[type="submit"]',
      '.btn'
    ];

    // Navigation elements
    const navSelectors = [
      '.nav__links a', '.nav__logo', '.nav__toggle'
    ];

    // Social media links
    const socialSelectors = [
      '.social-links__item'
    ];

    // Project cards
    const projectSelectors = [
      '.project-card', '.card'
    ];

    // Skill items
    const skillSelectors = [
      '.skill-item'
    ];

    // Form elements (non-text inputs)
    const formSelectors = [
      'select', 'input[type="checkbox"]', 'input[type="radio"]',
      'input[type="file"]', 'input[type="range"]'
    ];

    // Text input elements (only these get text cursor)
    const textInputSelectors = [
      'input[type="text"]', 'input[type="email"]', 'input[type="password"]',
      'input[type="search"]', 'input[type="url"]', 'input[type="tel"]',
      'textarea'
    ];

    // Regular links
    const linkSelectors = [
      'a:not(.btn):not(.social-links__item):not(.nav__links a)'
    ];

    // Generic clickable fallback
    const genericClickableSelectors = [
      '[role="button"]', '[onclick]'
    ];

    // Button hover animation
    this.addHoverListener(buttonSelectors, 'custom-cursor--button');

    // Navigation hover animation
    this.addHoverListener(navSelectors, 'custom-cursor--nav');

    // Social links hover animation
    this.addHoverListener(socialSelectors, 'custom-cursor--social');

    // Project cards hover animation
    this.addHoverListener(projectSelectors, 'custom-cursor--project');

    // Skill items hover animation
    this.addHoverListener(skillSelectors, 'custom-cursor--skill');

    // Form elements hover animation
    this.addHoverListener(formSelectors, 'custom-cursor--form');

    // Text input cursor (typing cursor)
    this.addHoverListener(textInputSelectors, 'custom-cursor--text');

    // Regular links hover animation
    this.addHoverListener(linkSelectors, 'custom-cursor--link');

    // Generic clickable elements fallback
    this.addHoverListener(genericClickableSelectors, 'custom-cursor--hover');

    // Disabled elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.disabled || e.target.classList.contains('disabled')) {
        this.clearAllStates();
        this.cursor.classList.add('custom-cursor--disabled');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.disabled || e.target.classList.contains('disabled')) {
        this.cursor.classList.remove('custom-cursor--disabled');
      }
    });

    // Draggable elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.draggable) {
        this.clearAllStates();
        this.cursor.classList.add('custom-cursor--grab');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.draggable) {
        this.cursor.classList.remove('custom-cursor--grab');
      }
    });
  }

  // Helper method to add hover listeners
  addHoverListener(selectors, className) {
    selectors.forEach(selector => {
      document.addEventListener('mouseover', (e) => {
        if (e.target.matches(selector)) {
          this.clearAllStates();
          this.cursor.classList.add(className);
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (e.target.matches(selector)) {
          this.cursor.classList.remove(className);
        }
      });
    });
  }

  // Clear all cursor states
  clearAllStates() {
    const states = [
      'custom-cursor--hover', 'custom-cursor--button', 'custom-cursor--nav',
      'custom-cursor--social', 'custom-cursor--project', 'custom-cursor--skill',
      'custom-cursor--form', 'custom-cursor--text', 'custom-cursor--link',
      'custom-cursor--disabled', 'custom-cursor--grab'
    ];
    
    states.forEach(state => {
      this.cursor.classList.remove(state);
    });
  }

  // Smooth cursor animation
  animate() {
    if (this.isMoving) {
      // Smooth interpolation for natural movement
      this.currentX += (this.mouseX - this.currentX) * 0.2;
      this.currentY += (this.mouseY - this.currentY) * 0.2;

      this.cursor.style.left = this.currentX + 'px';
      this.cursor.style.top = this.currentY + 'px';

      // Check if movement has essentially stopped
      if (Math.abs(this.mouseX - this.currentX) < 0.1 && 
          Math.abs(this.mouseY - this.currentY) < 0.1) {
        this.isMoving = false;
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  // Public methods for external control
  addLoadingState() {
    if (this.cursor) {
      this.cursor.classList.add('custom-cursor--loading');
    }
  }

  removeLoadingState() {
    if (this.cursor) {
      this.cursor.classList.remove('custom-cursor--loading');
    }
  }

  hide() {
    if (this.cursor) {
      this.cursor.style.opacity = '0';
    }
  }

  show() {
    if (this.cursor) {
      this.cursor.style.opacity = '1';
    }
  }

  destroy() {
    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
    }
  }
}

// Initialize custom cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global instance
  window.customCursor = new CustomCursor();
});

// Expose for external use
window.CustomCursor = CustomCursor;