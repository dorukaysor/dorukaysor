/**
 * Doruk's Portfolio - Main JavaScript
 * Modern, interactive functionality with smooth animations
 */

class Portfolio {
  constructor() {
    this.init();
  }

  init() {
    this.initializeDarkTheme();
    this.setupSmoothScrolling();
    this.setupAnimations();
    this.setupMobileMenu();
    this.setupContactForm();
    this.setupTypingEffect();
    this.setupParticles();
  }

  // Initialize Dark Theme (default)
  initializeDarkTheme() {
    const body = document.body;
    body.setAttribute('data-theme', 'dark');
  }

  // Simplified Smooth Scrolling for Navigation Links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add visual feedback
        anchor.style.transform = 'scale(0.95)';
        setTimeout(() => {
          anchor.style.transform = '';
        }, 150);
        
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          // Update active nav link
          document.querySelectorAll('.nav__links a').forEach(link => {
            link.classList.remove('active');
          });
          anchor.classList.add('active');
          
          // Simple smooth scroll - let CSS handle it
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Update active nav on scroll
    this.updateActiveNavOnScroll();
  }
  
  // Update active navigation based on scroll position
  updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const headerHeight = 80;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  // Smooth Animation System (Enhanced)
  setupAnimations() {
    // Setup fade-in animations for elements coming into view
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Add smooth reveal classes to elements (excluding skill-card which has its own animation)
    const elements = document.querySelectorAll('.card, .skill-item, .project-card');
    elements.forEach(el => {
      observer.observe(el);
    });
  }

  // Mobile Menu Toggle
  setupMobileMenu() {
    const mobileToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
      });

      // Close menu when clicking on a link
      document.querySelectorAll('.nav__links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          mobileToggle.classList.remove('active');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('active');
          mobileToggle.classList.remove('active');
        }
      });
    }
  }

  // Contact Form Handling
  setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
          // Simulate form submission (replace with actual endpoint)
          await this.simulateFormSubmission(data);
          
          // Show success message
          this.showNotification('Message sent successfully!', 'success');
          contactForm.reset();
        } catch (error) {
          this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    }
  }

  // Simulate form submission
  async simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90%) or failure (10%)
        Math.random() > 0.1 ? resolve(data) : reject(new Error('Submission failed'));
      }, 2000);
    });
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      color: 'white',
      fontWeight: '600',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Typing Effect for Hero Section
  setupTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;

    const texts = [
      'Full-Stack Developer',
      'Tech Enthusiast',
      'Problem Solver',
      'Innovation Driver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    const type = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let speed = isDeleting ? deleteSpeed : typeSpeed;
      
      if (!isDeleting && charIndex === currentText.length) {
        speed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      
      setTimeout(type, speed);
    };
    
    type();
  }

  // Particle Background Effect
  setupParticles() {
    const canvas = document.querySelector('#particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(169, 219, 184, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(112, 162, 136, ${0.15 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  // Scroll Progress Indicator
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    
    Object.assign(progressBar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '0%',
      height: '3px',
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      zIndex: '9999',
      transition: 'width 0.1s ease'
    });
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${scrolled}%`;
    });
  }

  // Initialize scroll to top button
  setupScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    
    Object.assign(scrollBtn.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: 'none',
      background: 'var(--primary-color)',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
      opacity: '0',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      zIndex: '1000'
    });
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.transform = 'scale(1)';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.transform = 'scale(0.8)';
      }
    });
    
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Portfolio;
}