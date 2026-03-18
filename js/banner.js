document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementById('slides');
    const info1Slides = document.getElementById('info1-slides');
    const info2Slides = document.getElementById('info2-slides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const container = document.getElementById('slider-container');
    
    const totalSlides = 10;
    let currentSlide = 0;
    let intervalId = null;
    const slideDuration = 2000;
    
    function updateSlides() {
        const translateX = -(currentSlide * 100);
        slides.style.transform = `translateX(${translateX}%)`;
        info1Slides.style.transform = `translateX(${translateX}%)`;
        info2Slides.style.transform = `translateX(${translateX}%)`;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlides();
    }
    
    function startAutoplay() {
        if (intervalId === null) {
            intervalId = setInterval(nextSlide, slideDuration);
        }
    }
    
    function stopAutoplay() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    let html = document.documentElement;
    html.addEventListener('load', function() {
        prevSlide();
    });
    
    html.addEventListener('load', function() {
        nextSlide();
    });
    
    container.addEventListener('mouseenter', function() {
        stopAutoplay();
    });
    
    container.addEventListener('mouseleave', function() {
        startAutoplay();
    });
    
    startAutoplay();
});