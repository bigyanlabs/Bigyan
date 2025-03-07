let lastScrollTop = 0;
let scrollTimeout;

export function setupNavigation() {
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); 
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
       
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
       
        const mobileNavLinks = navLinks.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }
    
    
    setupSmoothScroll();
    
   
    setupNavbarFadeEffect();
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                window.history.pushState(null, null, targetId);
            }
        });
    });
}

function setupNavbarFadeEffect() {
    const header = document.querySelector('header.fade-header');
    if (!header) return;
    
    header.classList.add('header-transition');
    header.classList.add('header-visible');
    
    let lastScrollTop = 0;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            header.classList.add('is-scrolling');
            isScrolling = true;
        }
        
        clearTimeout(scrollTimeout);
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
      
        if (scrollTop < 50) {
            header.classList.add('header-visible');
            header.classList.remove('header-hidden');
        } 
      
        else if (scrollTop > lastScrollTop) {
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
        } 
       
        else {
            header.classList.add('header-visible');
            header.classList.remove('header-hidden');
        }
        
      
        lastScrollTop = scrollTop;
        
        
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            header.classList.remove('is-scrolling');
            
          
            if (scrollTop < 10) {
                header.classList.add('header-visible');
                header.classList.remove('header-hidden');
            }
        }, 150);
    }, { passive: true });
    
   
    window.addEventListener('resize', function() {
       
        lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    });
}