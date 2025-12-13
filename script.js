// Particle Animation Background
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.resizeCanvas();
        this.initParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 1 + 0.5,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#00d4ff' : '#ff006e'
            });
        }
    }
    
    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y > this.height) {
                particle.y = 0;
                particle.x = Math.random() * this.width;
            }
            
            // Fade effect
            particle.opacity += (Math.random() - 0.5) * 0.02;
            particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, 'rgba(20, 30, 80, 0.8)');
        gradient.addColorStop(0.5, 'rgba(10, 14, 39, 0.9)');
        gradient.addColorStop(1, 'rgba(5, 10, 30, 0.95)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    new ParticleSystem(canvas);
}



// Link Click Handlers
const links = document.querySelectorAll('.link-item');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow YouTube, Telegram, Telegram Channel, TikTok, and Support links to open normally
        if (
            link.classList.contains('youtube-link') ||
            link.classList.contains('telegram-link') ||
            link.classList.contains('telegram-channel-link') ||
            link.classList.contains('tiktok-link') ||
            link.classList.contains('support-link')
        ) {
            // Optionally show notification, then allow default
            const text = link.querySelector('.link-text').textContent;
            showNotification(`Opening ${text}...`);
            // Do not preventDefault, allow link to open
            return;
        }
        // Prevent default for other links
        e.preventDefault();
        const text = link.querySelector('.link-text').textContent;
        console.log('Link clicked:', text);
        showNotification(`Opening ${text}...`);
    });
});

// Social Icon Handlers
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Social icon clicked');
        showNotification('Social link clicked!');
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 212, 255, 0.2);
        border: 2px solid #00d4ff;
        color: #00d4ff;
        padding: 12px 20px;
        border-radius: 20px;
        font-size: 0.9rem;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);





// Loading Overlay Progress Bar Animation
window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('loading-overlay');
    const bar = document.getElementById('progress-bar');
    const percent = document.getElementById('progress-percent');
    let progress = 0;
    function animateBar() {
        if (progress < 100) {
            progress += Math.random() * 7 + 4; // faster step
            if (progress > 100) progress = 100;
            bar.style.width = progress + '%';
            percent.textContent = Math.floor(progress) + '%';
            setTimeout(animateBar, 18 + Math.random() * 22); // faster interval
        } else {
            bar.style.width = '100%';
            percent.textContent = '100%';
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.style.display = 'none', 500);
            }, 400);
        }
    }
    animateBar();
});

// Music Player Toggle Logic with Animated Dialogue
const musicToggle = document.getElementById('music-toggle');
const musicPlayer = document.getElementById('music-player');
const musicDialogue = document.getElementById('music-dialogue');
let isPlaying = false;

function showMusicDialogue(text) {
    musicDialogue.textContent = text;
    musicDialogue.style.opacity = '1';
    musicDialogue.style.transform = 'translateY(0)';
    setTimeout(() => {
        musicDialogue.style.opacity = '0';
        musicDialogue.style.transform = 'translateY(-10px)';
    }, 1200);
}

musicToggle.addEventListener('click', () => {
    if (!isPlaying) {
        musicPlayer.play();
        musicToggle.style.background = '#00d4ff';
        musicToggle.style.color = '#222';
        showMusicDialogue('Playing music...');
    } else {
        musicPlayer.pause();
        musicToggle.style.background = '#222';
        musicToggle.style.color = '#fff';
        showMusicDialogue('Music paused');
    }
    isPlaying = !isPlaying;
});

musicPlayer.addEventListener('pause', () => {
    isPlaying = false;
    musicToggle.style.background = '#222';
    musicToggle.style.color = '#fff';
    showMusicDialogue('Music paused');
});

musicPlayer.addEventListener('play', () => {
    isPlaying = true;
    musicToggle.style.background = '#00d4ff';
    musicToggle.style.color = '#222';
    showMusicDialogue('Playing music...');
});

console.log('DREVENANT7 site loaded successfully!');
