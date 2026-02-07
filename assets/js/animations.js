// Animation on scroll initialization
function initAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
    
    // Initialize counters
    initCounters();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize product hover effects
    initProductHover();
}

// Counter animation for stats
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = (target / duration) * 10;
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    
    // Show first testimonial
    testimonials[0].classList.add('active');
    
    // Auto-rotate testimonials
    setInterval(() => {
        testimonials[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalTestimonials;
        testimonials[currentIndex].classList.add('active');
    }, 8000);
    
    // Add navigation dots if there are multiple testimonials
    if (totalTestimonials > 1) {
        const testimonialContainer = document.querySelector('.testimonials-container');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.className = 'testimonial-dot';
            dot.setAttribute('data-index', i);
            
            if (i === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                testimonials[currentIndex].classList.remove('active');
                document.querySelector('.testimonial-dot.active').classList.remove('active');
                
                currentIndex = i;
                testimonials[currentIndex].classList.add('active');
                dot.classList.add('active');
            });
            
            dotsContainer.appendChild(dot);
        }
        
        testimonialContainer.appendChild(dotsContainer);
    }
}

// Product hover effects
function initProductHover() {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const image = product.querySelector('img');
        const overlay = document.createElement('div');
        overlay.className = 'product-overlay';
        
        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'btn btn-outline quick-view-btn';
        quickViewBtn.textContent = 'Quick View';
        
        overlay.appendChild(quickViewBtn);
        product.appendChild(overlay);
        
        // Show/hide overlay on hover
        product.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            if (image) image.style.transform = 'scale(1.1)';
        });
        
        product.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            if (image) image.style.transform = 'scale(1)';
        });
        
        // Quick view functionality
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showQuickView(product);
        });
    });
}

// Quick view modal
function showQuickView(product) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const productImage = product.querySelector('img').cloneNode(true);
    const productTitle = product.querySelector('.product-title')?.textContent || 'Product';
    const productPrice = product.querySelector('.product-price')?.textContent || '';
    const productDescription = product.querySelector('.product-description')?.textContent || 'No description available.';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <div class="modal-image">
                    ${productImage.outerHTML}
                </div>
                <div class="modal-details">
                    <h3>${productTitle}</h3>
                    <div class="modal-price">${productPrice}</div>
                    <p>${productDescription}</p>
                    <div class="quantity-selector">
                        <button class="quantity-btn quantity-minus">-</button>
                        <input type="number" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn quantity-plus">+</button>
                    </div>
                    <button class="btn add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
        document.body.classList.remove('modal-open');
    });
    
    // Close when clicking outside the modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.classList.remove('modal-open');
        }
    });
    
    // Quantity selector in modal
    const minusBtn = modal.querySelector('.quantity-minus');
    const plusBtn = modal.querySelector('.quantity-plus');
    const quantityInput = modal.querySelector('.quantity-input');
    
    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
    
    // Add to cart from modal
    const addToCartBtn = modal.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        console.log(`Added ${quantity} ${productTitle} to cart`);
        showNotification(`${quantity} ${productTitle} added to cart!`, 'success');
        updateCartCount();
        modal.remove();
        document.body.classList.remove('modal-open');
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Helper function to update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = count + 1;
        cartCount.classList.add('pulse');
        
        // Remove pulse animation after it completes
        setTimeout(() => {
            cartCount.classList.remove('pulse');
        }, 500);
    }
}

// Initialize animations when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initAnimations);

// Export functions for use in other modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        initAnimations,
        initCounters,
        initTestimonialSlider,
        initProductHover,
        showQuickView,
        updateCartCount
    };
}
