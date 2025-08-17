// Modern JavaScript for Secu Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
    initializeNavbar();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeFormValidation();
});

// FAQ Functionality
function initializeFAQ() {
    const faqGroups = document.querySelectorAll('.faq-group');
    const faqMenuItems = document.querySelectorAll('.faq-menu li');

    // FAQ Toggle Functionality
    faqGroups.forEach(group => {
        const header = group.querySelector('.faq-group-header');
        const body = group.querySelector('.faq-group-body');
        const icon = group.querySelector('.icon-plus, .icon-minus');

        header.addEventListener('click', () => {
            // Close all other FAQ items
            faqGroups.forEach(otherGroup => {
                if (otherGroup !== group) {
                    const otherBody = otherGroup.querySelector('.faq-group-body');
                    const otherIcon = otherGroup.querySelector('.icon-plus, .icon-minus');
                    
                    otherBody.classList.remove('open');
                    otherIcon.innerHTML = '<b>+</b>';
                    otherIcon.className = 'icon-plus';
                }
            });

            // Toggle current FAQ item
            body.classList.toggle('open');
            
            if (body.classList.contains('open')) {
                icon.innerHTML = '<b>−</b>';
                icon.className = 'icon-minus';
            } else {
                icon.innerHTML = '<b>+</b>';
                icon.className = 'icon-plus';
            }
        });
    });

    // FAQ Menu Filter Functionality
    faqMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            faqMenuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Filter FAQ items based on selection
            const filterType = item.textContent.toLowerCase();
            filterFAQItems(filterType);
        });
    });
}

// Filter FAQ Items
function filterFAQItems(filterType) {
    const faqGroups = document.querySelectorAll('.faq-group');
    
    faqGroups.forEach(group => {
        if (filterType === 'all') {
            group.style.display = 'block';
        } else {
            // You can add data attributes to FAQ items for better filtering
            // For now, showing all items
            group.style.display = 'block';
        }
    });
}

// Navbar Functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle (for future mobile responsiveness)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainMenu.classList.toggle('active');
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-content, .card, .video-content, .pricing-grid, .textimonials-grid');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const form = document.querySelector('footer form');
    const emailInput = document.querySelector('#email');
    
    if (form && emailInput) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});


function playVideo(videoSrc) {
  const preview = document.querySelector(".video-preview");
  preview.innerHTML = `
    <video src="${videoSrc}" class="w-100 rounded shadow" controls autoplay></video>
  `;
}
