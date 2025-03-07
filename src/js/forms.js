
export function setupForms() {
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
           
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const subjectInput = this.querySelector('input[name="subject"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!subjectInput.value.trim()) {
                markInvalid(subjectInput, 'Please enter a subject');
                isValid = false;
            } else {
                markValid(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (isValid) {
                
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
               
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = 'Message Sent!';
                    setTimeout(() => {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const subscribeBtn = this.querySelector('button');
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'red';
                return;
            }
            
            
            subscribeBtn.textContent = 'Subscribing...';
            subscribeBtn.disabled = true;
            
            setTimeout(() => {
                emailInput.value = '';
                subscribeBtn.textContent = 'Subscribed!';
                setTimeout(() => {
                    subscribeBtn.textContent = 'Subscribe';
                    subscribeBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    

    const notifyForm = document.querySelector('.notify-form');
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.notify-input');
            const notifyBtn = this.querySelector('.notify-btn');
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'red';
                return;
            }
            
            
            notifyBtn.textContent = 'Submitting...';
            notifyBtn.disabled = true;
            
            setTimeout(() => {
                emailInput.value = '';
                notifyBtn.textContent = 'Thank You!';
                setTimeout(() => {
                    notifyBtn.textContent = 'Notify Me';
                    notifyBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
   
    function markInvalid(input, message) {
        input.classList.add('invalid');
        input.style.borderColor = 'red';
        
        
        let errorMessage = input.parentNode.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '5px';
            input.parentNode.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
    }
    
    function markValid(input) {
        input.classList.remove('invalid');
        input.style.borderColor = '';
        
        
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

export function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}