document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {  
        anchor.addEventListener('click', function (e) { 
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
         
            if (targetElement) {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.header').offsetHeight, 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Slideshow functionality for Awards and Innovations ---
    let slideIndex = {}; // Object to hold current slide index for each slideshow
    let slideTimers = {}; // Object to hold timers for auto-advance

    // Initialize all slideshows
    document.querySelectorAll('.slideshow-container').forEach(container => {
        const slideshowId = Array.from(container.classList).find(cls => cls.includes('-slideshow'));
        if (slideshowId) {
            slideIndex[slideshowId] = 1;
            showSlides(1, slideshowId);
            startAutoAdvance(slideshowId); // Start the automatic slideshow
        }
    });

    // Function to show specific slides for a given slideshow
    function showSlides(n, slideshowId) {
        let i;
        const slideshowContainer = document.querySelector(`.${slideshowId}`);
        if (!slideshowContainer) return;

        let slides = slideshowContainer.querySelectorAll('.mySlides');
        const dotContainer = slideshowContainer.parentNode.querySelector(`.dot-container.${slideshowId.replace('-slideshow', '-dots')}`);
        let dots = dotContainer ? dotContainer.querySelectorAll('.dot') : [];

        if (n > slides.length) { slideIndex[slideshowId] = 1 }
        if (n < 1) { slideIndex[slideshowId] = slides.length }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        if (slides.length > 0) {
            slides[slideIndex[slideshowId] - 1].style.display = "block";
            if (dots.length > 0) {
                dots[slideIndex[slideshowId] - 1].className += " active";
            }
        }
    }

    // Next/previous controls
    window.plusSlides = function(n, slideshowId) {
        showSlides(slideIndex[slideshowId] += n, slideshowId);
        // Reset auto-advance timer
        if (slideTimers[slideshowId]) {
            clearTimeout(slideTimers[slideshowId]);
            startAutoAdvance(slideshowId);
        }
    }

    // Thumbnail image controls
    window.currentSlide = function(n, slideshowId) {
        showSlides(slideIndex[slideshowId] = n, slideshowId);
        // Reset auto-advance timer
        if (slideTimers[slideshowId]) {
            clearTimeout(slideTimers[slideshowId]); 
            startAutoAdvance(slideshowId);
        }
    }

    // Function to handle automatic slideshow advance
    function startAutoAdvance(slideshowId) {
        const slideshowContainer = document.querySelector(`.${slideshowId}`);
        if (!slideshowContainer) return;
        let slides = slideshowContainer.querySelectorAll('.mySlides');

        if (slides.length > 1) { // Only auto-advance if there's more than one slide
            slideTimers[slideshowId] = setTimeout(() => {
                plusSlides(1, slideshowId);
                // The plusSlides function already calls startAutoAdvance again, so we don't need to loop it here.
            }, 5000); // Change image every 5 seconds
        }
    }
    
// Add the 'View All' functionality for image galleries
function setupImageGallery(buttonId) {
    const viewAllBtn = document.getElementById(buttonId);
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            const imageGrid = viewAllBtn.previousElementSibling;
            if (imageGrid && imageGrid.classList.contains('project-image-grid')) {
                imageGrid.classList.add('expanded');
                viewAllBtn.style.display = 'none'; // Hide the button after it's clicked
            }
        });
    }
}
// New: Full-size image modal functionality
    const modal = document.getElementById('fullsize-modal');
    const modalImg = document.getElementById('fullsize-image');
    const closeBtn = document.querySelector('.close-btn');
    const imageGrid = document.querySelector('.project-image-grid');

    if (imageGrid && modal && modalImg && closeBtn) {
        // Open the modal when a grid image is clicked
        imageGrid.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                modal.style.display =   'block';
                modalImg.src = e.target.src;
            } 
        }); 

        // Close the modal when the close button is clicked
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        }); 

        // Close the modal if the user clicks anywhere outside the image
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Also close the modal with the Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    }

    // Call the function for the E-Waste gallery 
    setupImageGallery('view-all-btn');
}); 