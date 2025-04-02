// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Add active class to mobile menu
    if (mobileMenuBtn && nav) {
        const style = document.createElement('style');
        style.textContent = `
            nav ul.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: white;
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced smooth scrolling for both navbar and hero buttons
    const allNavLinks = document.querySelectorAll('nav a[href^="#"], .hero-buttons a[href^="#"]');
    
    allNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                // Calculate position with a slight delay for better accuracy
                setTimeout(() => {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 10);
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            if (scrollTop > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add scrolled class styles
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
        header.scrolled {
            padding: 10px 0;
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(headerStyle);

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create a success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank you for your message!</h3>
                <p>We've received your inquiry and will get back to you shortly.</p>
                <button class="btn-primary" id="resetForm">Send Another Message</button>
            `;
            
            // Add success message styles
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                .success-message {
                    text-align: center;
                    padding: 40px 20px;
                    animation: fadeIn 0.5s ease-out;
                }
                
                .success-message i {
                    font-size: 60px;
                    color: #10b981;
                    margin-bottom: 20px;
                }
                
                .success-message h3 {
                    font-size: 1.5rem;
                    margin-bottom: 15px;
                    color: var(--neutral-900);
                }
                
                .success-message p {
                    color: var(--neutral-600);
                    margin-bottom: 25px;
                }
            `;
            document.head.appendChild(successStyle);
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Reset form button
            document.getElementById('resetForm').addEventListener('click', function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.remove();
            });
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted:', { name, email, company, message });
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .case-study-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .service-card, .case-study-card, .team-member {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .case-study-card.animate, .team-member.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
