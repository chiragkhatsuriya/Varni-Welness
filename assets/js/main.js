// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a');

// Mobile Menu Toggle
hamburger?.addEventListener('click', () => {
    const isExpanded = navMenu.classList.contains('active');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Update ARIA attributes
    hamburger.setAttribute('aria-expanded', !isExpanded);
    
    // Update current page indicator
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        if (isExpanded) {
            homeLink.setAttribute('aria-current', 'page');
        } else {
            homeLink.removeAttribute('aria-current');
        }
    }
});

// Close mobile menu when clicking on a nav link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('no-scroll');
        
        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active nav link highlight
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Category tabs functionality
const categoryTabs = document.querySelectorAll('.category-tab');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Navigate to the appropriate section
        const category = tab.getAttribute('data-category');
        if (category === 'multi') {
            window.location.hash = '#multi-honey';
        } else if (category === 'ajwain') {
            window.location.hash = '#ajwain-honey';
        } else if (category === 'all') {
            window.location.hash = '#shop';
        }
    });
});

// Add to cart functionality for all buttons
const allAddToCartButtons = document.querySelectorAll('.btn');
allAddToCartButtons.forEach(button => {
    if (button.textContent.includes('Buy Now') || button.textContent.includes('Shop Now')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Find the product name
            const productCard = button.closest('.bestseller-item, .combo-card, .showcase-item, .category-card');
            let productName = 'Product';
            
            if (productCard) {
                const titleElement = productCard.querySelector('h3');
                if (titleElement) {
                    productName = titleElement.textContent;
                }
            }
            
            // Show success message
            showNotification(`${productName} added to cart!`, 'success');
            
            // Add cart animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        });
    }
});

// Enhanced smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active navigation state
            updateActiveNavigation(targetId);
        }
    });
});

// Update active navigation based on current section
function updateActiveNavigation(currentSection) {
    navItems.forEach(item => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
        
        const href = item.getAttribute('href');
        if (href === `#${currentSection}`) {
            item.classList.add('active');
            item.setAttribute('aria-current', 'page');
        }
    });
}

// Scroll-based navigation update with better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            updateActiveNavigation(current);
        }
    }, 16); // ~60fps
});

// Add to cart functionality for product cards
const addToCartButtons = document.querySelectorAll('.product-card .btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        console.log(`Added to cart: ${productName} - ${productPrice}`);
        showNotification(`${productName} added to cart!`, 'success');
    });
});

// Email validation helper function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary)' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide and remove notification after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Varni Wellness website loaded successfully!');
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Add entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});
