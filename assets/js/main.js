// Check if jQuery is loaded, otherwise wait for it
if (typeof jQuery === 'undefined') {
    console.log('jQuery not loaded yet, waiting...');
    setTimeout(function() {
        if (typeof jQuery !== 'undefined') {
            console.log('jQuery loaded after delay');
            initApp();
        } else {
            console.error('jQuery failed to load!');
        }
    }, 1000);
} else {
    initApp();
}

function initApp() {
    // jQuery Document Ready
    $(document).ready(function() {
        
        // Test if jQuery is loaded
        console.log('jQuery version:', $.fn.jquery);
        console.log('Document ready - jQuery loaded successfully');
        
        // Slider Data Template
        const sliderData = [
            {
                id: 1,
                image: 'assets/images/bg-1.png',
                imageAlt: 'Pure Natural Honey',
                title: 'Pure Honey from Nature\'s Bounty',
                titleTag: 'h1',
                description: 'Experience the golden goodness of Varni Wellness honey - 100% natural, pure, and packed with nature\'s finest nutrients.',
                buttons: [
                    {
                        text: 'Shop Now',
                        class: 'btn btn-primary',
                        href: '#shop',
                        ariaLabel: 'Shop our honey products'
                    },
                    {
                        text: 'Learn More',
                        class: 'btn btn-secondary',
                        href: '#about',
                        ariaLabel: 'Learn more about Varni Wellness'
                    }
                ]
            },
            {
                id: 2,
                image: 'assets/images/bg-1.png',
                imageAlt: 'Premium Multi Flower Honey',
                title: 'Premium Multi Flower Honey',
                titleTag: 'h2',
                description: 'Discover our exclusive collection of multi-floral honey, harvested from the finest blossoms for unparalleled taste and health benefits.',
                buttons: [
                    {
                        text: 'Explore Combos',
                        class: 'btn btn-primary',
                        href: '#combos',
                        ariaLabel: 'View honey combos'
                    },
                    {
                        text: 'Shop All',
                        class: 'btn btn-secondary',
                        href: '#shop',
                        ariaLabel: 'Shop all products'
                    }
                ]
            },
            {
                id: 3,
                image: 'assets/images/bg-1.png',
                imageAlt: 'Ethical Sourcing',
                title: 'Ethically Sourced Wellness',
                titleTag: 'h2',
                description: 'Support sustainable beekeeping practices and tribal communities while enjoying the purest honey nature has to offer.',
                buttons: [
                    {
                        text: 'Our Story',
                        class: 'btn btn-primary',
                        href: '#about',
                        ariaLabel: 'Learn about our story'
                    },
                    {
                        text: 'Contact Us',
                        class: 'btn btn-secondary',
                        href: '#contact',
                        ariaLabel: 'Get in touch'
                    }
                ]
            }
        ];
        
        // Slider Template Generator
        function generateSlideHTML(slide) {
            const titleId = slide.id === 1 ? 'hero-heading' : `slide-${slide.id}-heading`;
            const titleTag = slide.titleTag || 'h2';
            
            return `
                <div class="slide" role="group" aria-label="Slide ${slide.id} of ${sliderData.length}">
                    <img src="${slide.image}" alt="${slide.imageAlt}" class="slide-image">
                    <div class="slide-content">
                        <${titleTag} id="${titleId}">${slide.title}</${titleTag}>
                        <p>${slide.description}</p>
                        <div class="hero-buttons">
                            ${slide.buttons.map(btn => 
                                `<a href="${btn.href}" class="${btn.class}" aria-label="${btn.ariaLabel}">${btn.text}</a>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Generate Indicators HTML
        function generateIndicatorsHTML() {
            return sliderData.map((slide, index) => 
                `<button class="indicator ${index === 0 ? 'active' : ''}" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}" aria-label="Go to slide ${index + 1}" data-slide="${index}"></button>`
            ).join('');
        }
        
        // Generate Status HTML
        function generateStatusHTML() {
            return `
                <span class="sr-only">Current slide: <span id="current-slide">1</span> of <span id="total-slides">${sliderData.length}</span></span>
            `;
        }
        
        // Initialize Slider with Dynamic Content
        function initDynamicSlider() {
            console.log('=== INITIALIZING DYNAMIC SLIDER ===');
            
            const $sliderContainer = $('.slider-container');
            const $slider = $('#heroSlider');
            
            console.log('Slider container found:', $sliderContainer.length);
            console.log('Slider element found:', $slider.length);
            
            if ($slider.length === 0) {
                console.error('Slider container not found!');
                return;
            }
            
            // Clear existing content
            $slider.empty();
            console.log('Cleared existing slider content');
            
            // Generate slides
            const slidesHTML = sliderData.map(slide => generateSlideHTML(slide)).join('');
            console.log('Generated slides HTML:', slidesHTML.substring(0, 200) + '...');
            $slider.html(slidesHTML);
            
            // Generate indicators
            const $indicatorsContainer = $('.slider-indicators');
            console.log('Indicators container found:', $indicatorsContainer.length);
            if ($indicatorsContainer.length > 0) {
                const indicatorsHTML = generateIndicatorsHTML();
                console.log('Generated indicators HTML:', indicatorsHTML);
                $indicatorsContainer.html(indicatorsHTML);
            }
            
            // Generate status
            const $statusContainer = $('.slider-status');
            console.log('Status container found:', $statusContainer.length);
            if ($statusContainer.length > 0) {
                const statusHTML = generateStatusHTML();
                console.log('Generated status HTML:', statusHTML);
                $statusContainer.html(statusHTML);
            }
            
            console.log('Dynamic slider generated with', sliderData.length, 'slides');
            
            // Set first slide as active
            const $generatedSlides = $('.slide');
            console.log('Generated slides found:', $generatedSlides.length);
            if ($generatedSlides.length > 0) {
                $generatedSlides.eq(0).addClass('active');
                console.log('Set first slide as active');
            }
            
            // Re-initialize slider functionality with longer delay
            setTimeout(() => {
                console.log('=== INITIALIZING SLIDER FUNCTIONALITY ===');
                initSliderFunctionality();
            }, 300);
        }
        
        // Slider Functionality (separated from generation)
        function initSliderFunctionality() {
            console.log('=== SETTING UP SLIDER FUNCTIONALITY ===');
            
            // DOM Elements (re-select after dynamic generation)
            const $slides = $('.slide');
            const $prevBtn = $('#prevSlide');
            const $nextBtn = $('#nextBtn');
            const $indicators = $('.indicator');
            const $currentSlideSpan = $('#current-slide');
            const $totalSlidesSpan = $('#total-slides');
            
            console.log('=== ELEMENT DETECTION ===');
            console.log('Slides found:', $slides.length);
            console.log('Prev button found:', $prevBtn.length);
            console.log('Next button found:', $nextBtn.length);
            console.log('Indicators found:', $indicators.length);
            console.log('Current slide span found:', $currentSlideSpan.length);
            console.log('Total slides span found:', $totalSlidesSpan.length);
            
            if ($slides.length === 0) {
                console.error('No slides found after generation!');
                return;
            }
            
            // Slider Configuration
            let currentSlide = 0;
            let autoplayInterval;
            const autoplayDelay = 5000; // 5 seconds
            
            // Update initial slide
            console.log('=== SETTING INITIAL SLIDE ===');
            updateSlide(0);
            
            // Start autoplay
            console.log('=== STARTING AUTOPLAY ===');
            startAutoplay();
            
            // Previous button click
            console.log('=== SETTING PREVIOUS BUTTON ===');
            if ($prevBtn.length > 0) {
                $prevBtn.off('click.slider').on('click.slider', function(e) {
                    e.preventDefault();
                    console.log('🔙 Previous button clicked');
                    stopAutoplay();
                    previousSlide();
                    startAutoplay();
                });
                console.log('✅ Previous button event attached');
            } else {
                console.warn('⚠️ Previous button not found!');
            }
            
            // Next button click
            console.log('=== SETTING NEXT BUTTON ===');
            if ($nextBtn.length > 0) {
                $nextBtn.off('click.slider').on('click.slider', function(e) {
                    e.preventDefault();
                    console.log('🔜 Next button clicked');
                    stopAutoplay();
                    nextSlide();
                    startAutoplay();
                });
                console.log('✅ Next button event attached');
            } else {
                console.warn('⚠️ Next button not found!');
            }
            
            // Indicator clicks
            console.log('=== SETTING INDICATORS ===');
            if ($indicators.length > 0) {
                $indicators.each(function(index) {
                    const $indicator = $(this);
                    console.log(`Setting up indicator ${index} with data-slide:`, $indicator.data('slide'));
                });
                
                $indicators.off('click.slider').on('click.slider', function(e) {
                    e.preventDefault();
                    const index = parseInt($(this).data('slide'));
                    console.log('🎯 Indicator clicked for slide:', index);
                    stopAutoplay();
                    goToSlide(index);
                    startAutoplay();
                });
                console.log('✅ Indicator events attached');
            } else {
                console.warn('⚠️ No indicators found!');
            }
            
            // Keyboard navigation
            console.log('=== SETTING KEYBOARD NAVIGATION ===');
            $(document).off('keydown.slider').on('keydown.slider', function(e) {
                if (e.key === 'ArrowLeft') {
                    console.log('⬅️ Left arrow pressed');
                    stopAutoplay();
                    previousSlide();
                    startAutoplay();
                } else if (e.key === 'ArrowRight') {
                    console.log('➡️ Right arrow pressed');
                    stopAutoplay();
                    nextSlide();
                    startAutoplay();
                }
            });
            console.log('✅ Keyboard navigation attached');
            
            // Slider Functions
            function updateSlide(index) {
                console.log(`🔄 Updating slide to: ${index} (total: ${$slides.length})`);
                
                // Remove active class from all slides and indicators
                $slides.removeClass('active');
                $indicators.removeClass('active').attr('aria-selected', 'false');
                
                // Add active class to current slide and indicator
                $slides.eq(index).addClass('active');
                
                if ($indicators.length > 0) {
                    $indicators.eq(index).addClass('active').attr('aria-selected', 'true');
                }
                
                // Update current slide display
                if ($currentSlideSpan.length) {
                    $currentSlideSpan.text(index + 1);
                }
                
                // Update slide labels
                $slides.each(function(i) {
                    $(this).attr('aria-label', `Slide ${i + 1} of ${$slides.length}`);
                });
                
                console.log(`✅ Slide ${index} is now active`);
            }
            
            function nextSlide() {
                currentSlide = (currentSlide + 1) % $slides.length;
                console.log(`➡️ Moving to next slide: ${currentSlide}`);
                updateSlide(currentSlide);
            }
            
            function previousSlide() {
                currentSlide = (currentSlide - 1 + $slides.length) % $slides.length;
                console.log(`⬅️ Moving to previous slide: ${currentSlide}`);
                updateSlide(currentSlide);
            }
            
            function goToSlide(index) {
                console.log(`🎯 Going to slide: ${index}`);
                currentSlide = index;
                updateSlide(currentSlide);
            }
            
            function startAutoplay() {
                if (autoplayInterval) clearInterval(autoplayInterval);
                autoplayInterval = setInterval(function() {
                    console.log('🔄 Autoplay: advancing to next slide');
                    nextSlide();
                }, autoplayDelay);
                console.log('▶️ Autoplay started');
            }
            
            function stopAutoplay() {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                    console.log('⏸️ Autoplay stopped');
                }
            }
            
            // Make functions globally accessible for debugging
            window.sliderAPI = {
                nextSlide,
                previousSlide,
                goToSlide,
                startAutoplay,
                stopAutoplay,
                getCurrentSlide: () => currentSlide,
                updateSlide,
                $slides,
                $indicators
            };
            
            console.log('🎉 Slider functionality initialized successfully!');
            console.log('🔧 Available API: window.sliderAPI');
        }
        
        // Initialize dynamic slider
        initDynamicSlider();
        
        // Add manual test function
        window.testSlider = function() {
            console.log('=== MANUAL SLIDER TEST ===');
            console.log('Slides:', $('.slide').length);
            console.log('Prev button:', $('#prevSlide').length);
            console.log('Next button:', $('#nextBtn').length);
            console.log('Indicators:', $('.indicator').length);
            console.log('Active slide:', $('.slide.active').index());
            
            // Test manual slide change
            if (window.sliderAPI) {
                console.log('Slider API available');
                console.log('Current slide:', window.sliderAPI.getCurrentSlide());
                window.sliderAPI.nextSlide();
                console.log('After next slide:', window.sliderAPI.getCurrentSlide());
            } else {
                console.error('Slider API not available!');
            }
        };
        
        console.log('Varni Wellness website loaded successfully with jQuery!');
        console.log('🔧 Run testSlider() in console to test manually');
    });
}
