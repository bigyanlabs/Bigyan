export function setupThemeControls() {
    const body = document.body;
    const themeButtons = document.querySelectorAll('.theme-btn');
    const modeToggle = document.querySelector('.mode-toggle');
    
  
    if (themeButtons) {
        themeButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                const theme = this.dataset.theme;
                
                
                body.dataset.theme = theme;
                
               
                themeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
               
                updateCoursesBackground();
                
                
                localStorage.setItem('preferredTheme', theme);
            });
        });
    }
    
    
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            toggleDarkMode();
        });
    }
    
   
    function toggleDarkMode() {
        const currentMode = body.dataset.mode || 'light';
        const newMode = currentMode === 'light' ? 'dark' : 'light';
        body.dataset.mode = newMode;
        
       
        updateCoursesBackground();
        
        
        localStorage.setItem('preferredMode', newMode);
        
        
        updateThemeButtonsForMode(newMode);
    }
    
   
    function updateThemeButtonsForMode(mode) {
        if (!themeButtons) return;
        
        themeButtons.forEach(button => {
            const theme = button.dataset.theme;
            if (theme !== 'dark') {
               
                if (mode === 'dark') {
                    if (theme === 'blue') {
                        button.style.backgroundColor = 'rgb(107, 138, 255)';
                    } else if (theme === 'purple') {
                        button.style.backgroundColor = 'rgb(164, 124, 244)';
                    } else if (theme === 'green') {
                        button.style.backgroundColor = 'rgb(96, 177, 122)';
                    }
                } else {
                    if (theme === 'blue') {
                        button.style.backgroundColor = 'rgb(74, 107, 255)';
                    } else if (theme === 'purple') {
                        button.style.backgroundColor = 'rgb(156, 107, 255)';
                    } else if (theme === 'green') {
                        button.style.backgroundColor = 'rgb(74, 205, 141)';
                    }
                }
            }
        });
    }
    
   
    function updateCoursesBackground() {
        const coursesBg = document.querySelector('.courses-bg');
        if (!coursesBg) return;
        
        const theme = body.dataset.theme;
        const mode = body.dataset.mode || 'light';
        
       
        let primaryColorRGB;
        
        if (theme === 'blue') {
            primaryColorRGB = mode === 'light' ? '74, 107, 255' : '107, 138, 255';
        } else if (theme === 'purple') {
            primaryColorRGB = mode === 'light' ? '156, 107, 255' : '164, 124, 244';
        } else if (theme === 'green') {
            primaryColorRGB = mode === 'light' ? '74, 205, 141' : '96, 177, 122';
        }
        
        
        coursesBg.style.background = `radial-gradient(circle at 10% 20%, rgba(${primaryColorRGB}, 0.05) 0%, transparent 80%)`;
    }
    
    
    function applyStoredPreferences() {
        const storedTheme = localStorage.getItem('preferredTheme');
        const storedMode = localStorage.getItem('preferredMode');
        
        if (storedTheme) {
            body.dataset.theme = storedTheme;
            themeButtons.forEach(btn => {
                if (btn.dataset.theme === storedTheme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        if (storedMode) {
            body.dataset.mode = storedMode;
            updateThemeButtonsForMode(storedMode);
        }
        
        updateCoursesBackground();
    }
    
   
    updateCoursesBackground();
    applyStoredPreferences();
}