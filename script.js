// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });
    
    function updateThemeButton(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
        }
    }
    
    // Add click animation to link cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Add clicked class for animation
            this.classList.add('clicked');
            
            // Track click analytics (optional)
            const linkText = this.querySelector('.link-text').textContent;
            console.log('Clicked:', linkText);
            
            // Remove class after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
    
    // Staggered animation for link cards
    linkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 100));
    });
    
    // Add hover tilt effect (3D tilt on mouse move)
    linkCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Copy link functionality on menu dots
    const menuDots = document.querySelectorAll('.menu-dots');
    menuDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const linkCard = this.closest('.link-card');
            const url = linkCard.getAttribute('href');
            
            // Copy to clipboard
            navigator.clipboard.writeText(url).then(() => {
                // Show temporary feedback
                const originalIcon = this.innerHTML;
                this.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
                
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                }, 1500);
            });
        });
    });
    
    // Profile image hover effect
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.6s ease';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 600);
        });
    }
    
    // Visit counter (using localStorage)
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    console.log('Visit count:', visitCount);
    
    // Easter egg: Konami code
    let konamiCode = [];
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === secretCode.join(',')) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            alert('🎉 You found the secret! Rainbow mode activated!');
        }
    });
    
    // Add rainbow animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});