// Loading Screen
window.addEventListener('load', () => {
    const screen = document.getElementById('loading-screen');
    const bar = document.getElementById('loaderBar');
    const pct = document.getElementById('loaderPct');
    let progress = 0;

    const tick = setInterval(() => {
        progress += Math.random() * 25 + 5;

        if (progress >= 100) {
            progress = 100;
            clearInterval(tick);

            if (bar) bar.style.width = '100%';
            if (pct) pct.textContent = '100%';

            setTimeout(() => {
                screen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 400);
        } else {
            if (bar) bar.style.width = progress + '%';
            if (pct) pct.textContent = Math.floor(progress) + '%';
        }
    }, 180);
});

// Music Player
const musicBtn = document.getElementById('musicBtn');
let audio = null;
let playing = false;

musicBtn.addEventListener('click', () => {
    if (!audio) {
        audio = new Audio('song.mp3');
        audio.loop = true;
    }
    playing = !playing;
    if (playing) {
        audio.play().catch(() => {});
        musicBtn.classList.add('playing');
    } else {
        audio.pause();
        musicBtn.classList.remove('playing');
    }
});

// Language Switcher
const translations = {
    en: {
        'hero-title': 'DREVENANT7',
        'hero-subtitle': 'Pojavlauncher Expert',
        'hero-desc': 'Tutorials for iOS 18–26 installation, Optifine, Shaders, and fixing common errors. Join the mobile Java community below 🎮',
        'badge-1': 'iOS 18–26',
        'badge-2': 'Optifine',
        'badge-3': 'Troubleshoot',
        'section-title': 'Connect With Me',
        'card-coffee-title': 'Support My Work',
        'card-coffee-sub': 'Buy me a coffee ☕',
        'card-tg-title': 'Telegram',
        'card-tg-sub': 'Chat with me directly',
        'card-tgch-title': 'Telegram Channel',
        'card-tgch-sub': 'Get latest updates',
        'card-tt-title': 'TikTok',
        'card-tt-sub': 'Short tutorials & tips',
        'card-yt-title': 'YouTube',
        'card-yt-sub': 'In-depth video guides',
        'footer-1': '© 2025 DREVENANT7',
        'footer-2': 'Making Minecraft Mobile Better 🎨🎮'
    },
    kh: {
        'hero-title': 'DREVENANT7',
        'hero-subtitle': 'អ្នកជំនាញ Pojavlauncher',
        'hero-desc': 'ការបង្រៀនអំពីការដំឡើង iOS 18–26, Optifine, Shaders និងការដោះស្រាយបញ្ហាផ្សេងៗ។ ចូលរួមជាមួយសហគមន៍ Java លើទូរស័ព្ទខាងក្រោម 🎮',
        'badge-1': 'iOS 18–26',
        'badge-2': 'Optifine',
        'badge-3': 'ដោះស្រាយបញ្ហា',
        'section-title': 'តាមដានខ្ញុំ',
        'card-coffee-title': 'គាំទ្រការងាររបស់ខ្ញុំ',
        'card-coffee-sub': 'ទិញកាហ្វេមួយពែងជូនខ្ញុំ ☕',
        'card-tg-title': 'Telegram',
        'card-tg-sub': 'សារជាមួយខ្ញុំដោយផ្ទាល់',
        'card-tgch-title': 'បណ្តាញ Telegram',
        'card-tgch-sub': 'ទទួលបានព័ត៌មានថ្មីៗ',
        'card-tt-title': 'TikTok',
        'card-tt-sub': 'វីដេអូខ្លីៗ និងគន្លឹះ',
        'card-yt-title': 'YouTube',
        'card-yt-sub': 'មគ្គុទ្ទេសក៍វីដេអូលម្អិត',
        'footer-1': '© 2025 DREVENANT7',
        'footer-2': 'ធ្វើឱ្យ Minecraft លើទូរស័ព្ទកាន់តែល្អ 🎨🎮'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('lang') || 'en';

    // Set active button on load
    langBtns.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Apply saved language on load
    if (currentLang !== 'en') {
        applyTranslations(currentLang);
    }

    // Language toggle
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;

            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            localStorage.setItem('lang', lang);
            applyTranslations(lang);
        });
    });
});

function applyTranslations(lang) {
    const trans = translations[lang];
    if (!trans) return;

    // Hero
    document.querySelector('.name').textContent = trans['hero-title'];
    document.querySelector('.subtitle').innerHTML = trans['hero-subtitle'];
    document.querySelector('.desc').textContent = trans['hero-desc'];

    // Badges
    const badges = document.querySelectorAll('.badge');
    if (badges[0]) badges[0].innerHTML = '<i class="fas fa-mobile-alt"></i> ' + trans['badge-1'];
    if (badges[1]) badges[1].innerHTML = '<i class="fas fa-cog"></i> ' + trans['badge-2'];
    if (badges[2]) badges[2].innerHTML = '<i class="fas fa-wrench"></i> ' + trans['badge-3'];

    // Section heading
    document.querySelector('.section-heading').textContent = trans['section-title'];

    // Link cards
    const cards = document.querySelectorAll('.link-card');
    const cardKeys = ['coffee', 'tg', 'tgch', 'tt', 'yt'];

    cardKeys.forEach((key, i) => {
        if (!cards[i]) return;
        const title = cards[i].querySelector('.link-title');
        const sub   = cards[i].querySelector('.link-sub');
        if (title) title.textContent = trans[`card-${key}-title`];
        if (sub)   sub.textContent   = trans[`card-${key}-sub`];
    });

    // Footer
    const footerPs = document.querySelectorAll('.footer p');
    if (footerPs[0]) footerPs[0].textContent = trans['footer-1'];
    if (footerPs[1]) footerPs[1].textContent = trans['footer-2'];
}

// Ripple on link cards
document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('pointerdown', e => {
        const r = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.className = 'ripple';
        r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
        card.appendChild(r);
        r.addEventListener('animationend', () => r.remove());
    });
});

// Cursor trail — desktop only
if (window.matchMedia('(pointer: fine)').matches) {
    const trail = [];
    const N = 12;
    for (let i = 0; i < N; i++) {
        const d = document.createElement('div');
        d.className = 'cursor-dot';
        d.style.opacity = (N - i) / N * 0.6;
        d.style.transform = `scale(${(N - i) / N})`;
        document.body.appendChild(d);
        trail.push({ el: d, x: 0, y: 0 });
    }

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animTrail() {
        let x = mx, y = my;
        trail.forEach((dot, i) => {
            const nx = trail[i + 1] ? trail[i + 1].x : mx;
            const ny = trail[i + 1] ? trail[i + 1].y : my;
            dot.x += (nx - dot.x) * 0.35;
            dot.y += (ny - dot.y) * 0.35;
            dot.el.style.left = dot.x + 'px';
            dot.el.style.top = dot.y + 'px';
        });
        trail[0].x = x; trail[0].y = y;
        trail[0].el.style.left = x + 'px';
        trail[0].el.style.top = y + 'px';
        requestAnimationFrame(animTrail);
    }
    requestAnimationFrame(animTrail);
}

// Scroll-triggered fade-in for link cards
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.link-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(card);
});
