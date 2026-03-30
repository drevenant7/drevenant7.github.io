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
            bar.style.width = '100%';
            pct.textContent = '100%';
            setTimeout(() => {
                screen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 400);
        } else {
            bar.style.width = progress + '%';
            pct.textContent = Math.floor(progress) + '%';
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