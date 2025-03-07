
import { initThreeJS } from './animations.js';
import { setupThemeControls } from './theme.js';
import { setupNavigation } from './navigation.js';
import { setupForms } from './forms.js';

document.addEventListener("DOMContentLoaded", function () {
    
    setTimeout(function () {
        document.getElementById("preloader").style.opacity = "0"; 
        setTimeout(() => {
            document.getElementById("preloader").remove(); 
            document.getElementById("website-content").style.display = "block"; 
            setTimeout(() => {
                document.getElementById("website-content").style.opacity = "1"; 
            }, 50); 
            document.body.style.overflow = "auto"; 
        }, 500); 
    }, 3200);

    setupThemeControls();
    setupNavigation();
    initThreeJS();
    setupForms();
    
   
    function updateCountdown() {
        
        const launchDate = new Date("2025-07-07T00:00:00").getTime();
        
        const now = new Date().getTime(); 
        
        const diff = launchDate - now;

        if (diff < 0) {
            document.getElementById('countdown').innerHTML = "Launched!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
       
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
    
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        
        currentIndex = index;
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= testimonialCards.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = testimonialCards.length - 1;
            }
            showTestimonial(prevIndex);
        });
    }
    
    if (dots && dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= testimonialCards.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        }, 5000);
    }
});