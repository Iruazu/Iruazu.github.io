// Document ready event handler - this should run before window load
document.addEventListener('DOMContentLoaded', function() {
  // Get important elements
  const header = document.querySelector('header');
  const heroSection = document.querySelector('.hero-image'); // Changed from getElementById to match CSS
  const aboutSection = document.getElementById('about');
  
  // Initialize header state - start with transparent if at top of page
  if (window.scrollY === 0 && heroSection) {
    header.classList.add('header-transparent');
  }
  
  // Add loaded class to header for initial fade-in
  header.classList.add('loaded');
  
  // Handle hero image loading and fade-in
  if (heroSection) {
    const heroHeight = heroSection.offsetHeight;
    
    // Add loaded class to trigger content fade-in
    heroSection.classList.add('loaded');
    
    // Handle scroll events for header transparency
    window.addEventListener('scroll', function() {
      if (window.scrollY > heroHeight * 0.1) { // Adjust threshold as needed
        header.classList.remove('header-transparent');
      } else {
        header.classList.add('header-transparent');
      }
    });
  }
  
  // About section fade-in handler
  const handleAboutFadeIn = () => {
    if (aboutSection && !aboutSection.classList.contains('loaded')) {
      const aboutTop = aboutSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (aboutTop < windowHeight * 0.8) {
        aboutSection.classList.add('loaded');
        // Remove scroll listener once loaded
        window.removeEventListener('scroll', handleAboutFadeIn);
      }
    }
  };
  
  // Check about section visibility on initial load
  if (aboutSection) {
    const aboutTopOnLoad = aboutSection.getBoundingClientRect().top;
    const windowHeightOnLoad = window.innerHeight;
    
    if (aboutTopOnLoad < windowHeightOnLoad) {
      aboutSection.classList.add('loaded');
    } else {
      window.addEventListener('scroll', handleAboutFadeIn);
    }
  }
  
  // Hamburger menu functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const globalNav = document.querySelector('.global-nav');
  
  if (hamburgerMenu && globalNav) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('open');
      globalNav.classList.toggle('open');
    });
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('header a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // Header height offset
          behavior: 'smooth'
        });
        
        // Close hamburger menu if open
        if (hamburgerMenu && hamburgerMenu.classList.contains('open')) {
          hamburgerMenu.classList.remove('open');
          globalNav.classList.remove('open');
        }
      }
    });
  });
  
  // Accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentNode;
      accordionItem.classList.toggle('open');
    });
  });
  
  // Works section carousel initialization
  initializeCarousels();
  
  // Cocricot button functionality
  const cocricotButton = document.getElementById('cocricot-button');
  if (cocricotButton) {
    cocricotButton.addEventListener('click', function() {
      window.open('https://cocricot.pics', '_blank');
    });
  }
});

// Wait for all resources to load before adding final fade-in effects
window.addEventListener('load', () => {
  // Add 'loaded' class to body
  document.body.classList.add('loaded');
  
  // Find and fade in all elements with fade-in class
  const fadeIns = document.querySelectorAll('.fade-in');
  fadeIns.forEach(fadeIn => {
    fadeIn.classList.add('loaded');
  });
});

// Separate function to initialize all carousels
function initializeCarousels() {
  const worksListItems = document.querySelectorAll('.works-list li');
  const swiperContainers = document.querySelectorAll('.swiper-container');
  let currentSwiper;
  
  // Initialize first carousel if available
  if (swiperContainers.length > 0) {
    const firstSwiperElement = swiperContainers[0].querySelector('.swiper');
    if (firstSwiperElement && typeof Swiper !== 'undefined') {
      try {
        currentSwiper = new Swiper(firstSwiperElement, {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 30,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        });
      } catch (e) {
        console.error('Error initializing Swiper:', e);
      }
    }
  }
  
  // Add click handlers for work list items
  worksListItems.forEach(item => {
    item.addEventListener('click', function() {
      const carouselId = this.dataset.carousel;
      const targetCarousel = document.getElementById(carouselId);
      
      // Hide all carousels
      swiperContainers.forEach(container => {
        container.style.display = 'none';
      });
      
      // Show and initialize the selected carousel
      if (targetCarousel && typeof Swiper !== 'undefined') {
        targetCarousel.style.display = 'block';
        
        // Check if Swiper instance already exists
        const swiperElement = targetCarousel.querySelector('.swiper');
        if (swiperElement) {
          const existingSwiper = swiperElement.swiper;
          
          if (existingSwiper) {
            existingSwiper.update();
          } else {
            try {
              new Swiper(swiperElement, {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
                autoplay: {
                  delay: 3000,
                  disableOnInteraction: false,
                },
              });
            } catch (e) {
              console.error('Error initializing Swiper for', carouselId, e);
            }
          }
        }
      }
    });
  });
}