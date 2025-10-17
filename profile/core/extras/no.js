class NoCodeAlert {
  constructor() {
    this.init();
  }

  init() {
    this.setupCodeButtons();
  }

  // Setup event listeners for all "Code" buttons
  setupCodeButtons() {
    document.addEventListener('DOMContentLoaded', () => {
      const codeButtons = document.querySelectorAll('.btn--secondary');
      
      codeButtons.forEach(button => {
        // Check if this is a "Code" button by looking for GitHub icon and "Code" text
        const hasGithubIcon = button.querySelector('.fab.fa-github');
        const hasCodeText = button.textContent.trim().includes('Code');
        
        if (hasGithubIcon && hasCodeText) {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            this.showAlert();
          });
        }
      });
    });
  }

  // Create and show the custom alert
  showAlert() {
    // Remove any existing alerts
    this.removeExistingAlert();

    // Create alert container
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert-overlay';
    alertContainer.innerHTML = `
      <div class="custom-alert">
        <div class="custom-alert__icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="custom-alert__content">
          <h3 class="custom-alert__title">Private Repository</h3>
          <p class="custom-alert__message">
            This code is private and cannot be accessed publicly.
            <br>Please contact me for more information.
          </p>
        </div>
        <div class="custom-alert__close">
          <button class="custom-alert__close-btn" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(alertContainer);

    // Trigger entrance animation
    setTimeout(() => {
      alertContainer.classList.add('custom-alert-overlay--show');
    }, 10);

    // Setup close functionality
    this.setupCloseHandlers(alertContainer);

    // Auto-hide after 4 seconds
    setTimeout(() => {
      this.hideAlert(alertContainer);
    }, 4000);
  }

  // Setup close event handlers
  setupCloseHandlers(alertContainer) {
    const closeBtn = alertContainer.querySelector('.custom-alert__close-btn');
    
    // Close on button click
    closeBtn.addEventListener('click', () => {
      this.hideAlert(alertContainer);
    });

    // Close on overlay click
    alertContainer.addEventListener('click', (e) => {
      if (e.target === alertContainer) {
        this.hideAlert(alertContainer);
      }
    });

    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.hideAlert(alertContainer);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Hide the alert with animation
  hideAlert(alertContainer) {
    if (!alertContainer || !alertContainer.parentNode) return;

    alertContainer.classList.add('custom-alert-overlay--hide');
    
    setTimeout(() => {
      if (alertContainer.parentNode) {
        alertContainer.parentNode.removeChild(alertContainer);
      }
    }, 300);
  }

  // Remove any existing alerts
  removeExistingAlert() {
    const existingAlert = document.querySelector('.custom-alert-overlay');
    if (existingAlert) {
      this.hideAlert(existingAlert);
    }
  }
}

class NoDemoAlert {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupDemoButtons();
  }

  // Setup event listeners for all "Demo" buttons
  setupDemoButtons() {
    document.addEventListener('DOMContentLoaded', () => {
      const demoButtons = document.querySelectorAll('.btn--primary');

      demoButtons.forEach(button => {
        // Check if this is a "Demo" button by looking for "Demo" text
        const hasDemoText = button.textContent.trim().includes('Demo');
        if (hasDemoText) {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            this.showAlert();
          });
        }
      });
    });
  }

  // Create and show the custom alert
  showAlert() {
    // Remove any existing alerts
    this.removeExistingAlert();

    // Create alert container
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert-overlay';
    alertContainer.innerHTML = `
      <div class="custom-alert">
        <div class="custom-alert__icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="custom-alert__content">
          <h3 class="custom-alert__title">Private Repository</h3>
          <p class="custom-alert__message">
            This project is private and cannot be accessed publicly.
            <br>Please contact me for more information.
          </p>
        </div>
        <div class="custom-alert__close">
          <button class="custom-alert__close-btn" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(alertContainer);

    // Trigger entrance animation
    setTimeout(() => {
      alertContainer.classList.add('custom-alert-overlay--show');
    }, 10);

    // Setup close functionality
    this.setupCloseHandlers(alertContainer);

    // Auto-hide after 4 seconds
    setTimeout(() => {
      this.hideAlert(alertContainer);
    }, 4000);
  }

  // Setup close event handlers
  setupCloseHandlers(alertContainer) {
    const closeBtn = alertContainer.querySelector('.custom-alert__close-btn');

    // Close on button click
    closeBtn.addEventListener('click', () => {
      this.hideAlert(alertContainer);
    });

    // Close on overlay click
    alertContainer.addEventListener('click', (e) => {
      if (e.target === alertContainer) {
        this.hideAlert(alertContainer);
      }
    });

    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.hideAlert(alertContainer);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Hide the alert with animation
  hideAlert(alertContainer) {
    if (!alertContainer || !alertContainer.parentNode) return;

    alertContainer.classList.add('custom-alert-overlay--hide');

    setTimeout(() => {
      if (alertContainer.parentNode) {
        alertContainer.parentNode.removeChild(alertContainer);
      }
    }, 300);
  }

  // Remove any existing alerts
  removeExistingAlert() {
    const existingAlert = document.querySelector('.custom-alert-overlay');
    if (existingAlert) {
      this.hideAlert(existingAlert);
    }
  }
}

// Initialize the no code alert system
new NoCodeAlert();

// initialize the no demo alert system
new NoDemoAlert();