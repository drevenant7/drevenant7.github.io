// Loading Screen Animation
window.addEventListener('load', () => {
    let progress = 0;
    const loadingScreen = document.getElementById('loading-screen');
    const percentage = document.querySelector('.loader-percentage');
    
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            percentage.textContent = '100%';
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        } else {
            percentage.textContent = Math.floor(progress) + '%';
        }
    }, 200);
});

// Music Player Functionality
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;
let audio = null;

musicBtn.addEventListener('click', () => {
    if (!audio) {
        // ═══════════════════════════════════════════════════════
        // 🎵 ADD YOUR MUSIC FILE HERE:
        // ═══════════════════════════════════════════════════════
        // 1. Upload your music file (MP3, WAV, OGG) to the same folder
        // 2. Replace 'your-song.mp3' with YOUR file name below
        // 3. Remove the // at the start of the next 2 lines to activate
        
            audio = new Audio('song.mp3');  
            audio.loop = true;                 
        
        // Example: If your file is named "background-music.mp3", use:
        // audio = new Audio('background-music.mp3');
        
        // ═══════════════════════════════════════════════════════
        
        // For demo purposes (remove this line after adding your music)
    }
    
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        musicBtn.classList.add('playing');
        if (audio) audio.play();
    } else {
        musicBtn.classList.remove('playing');
        if (audio) audio.pause();
    }
});

// Smooth Scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
const sections = document.querySelectorAll('.feature-card, .social-card');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add parallax effect to gradient orbs
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 50;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add click ripple effect to social cards
const socialCards = document.querySelectorAll('.social-card');
socialCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add dynamic title animation
const titleLine = document.querySelector('.title-line');
if (titleLine) {
    const text = titleLine.textContent;
    titleLine.textContent = '';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            titleLine.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Add cursor trail effect
const trail = [];
const trailLength = 20;

for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    document.body.appendChild(dot);
    trail.push(dot);
}

let mouseXPos = 0;
let mouseYPos = 0;

document.addEventListener('mousemove', (e) => {
    mouseXPos = e.clientX;
    mouseYPos = e.clientY;
});

function animateTrail() {
    let x = mouseXPos;
    let y = mouseYPos;
    
    trail.forEach((dot, index) => {
        const nextDot = trail[index + 1] || trail[0];
        
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.transform = `scale(${(trailLength - index) / trailLength})`;
        
        x += (nextDot.offsetLeft - x) * 0.3;
        y += (nextDot.offsetTop - y) * 0.3;
    });
}

setInterval(animateTrail, 16);