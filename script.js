/* =============================================
   script.js — Portfolio JS
============================================= */

// ── Navbar scroll shadow ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger menu ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Close drawer when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close drawer on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// ── Smooth scroll with nav offset ────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const href   = a.getAttribute('href');
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 75;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ── Active nav link on scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const activateLink = () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) {
            current = sec.id;
        }
    });
    links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
};

window.addEventListener('scroll', activateLink, { passive: true });
activateLink();

// ── Scroll reveal ─────────────────────────────
const revealTargets = [
    '.sound-text-inner',
    '.services-inner',
    '.about-who-inner',
    '.companies-inner',
    '.education-inner',
    '.contact-inner',
    '.services-list li',
    '.company-card'
];

const revealEls = document.querySelectorAll(revealTargets.join(', '));
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));

// Stagger service list items
document.querySelectorAll('.services-list li').forEach((li, i) => {
    li.style.transitionDelay = (i * 0.06) + 's';
});

// Stagger company cards
document.querySelectorAll('.company-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.07) + 's';
});

// ── Custom red cursor dot (desktop only) ──────
if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 8px; height: 8px;
        background: rgb(190,44,44);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.15s ease, opacity 0.3s;
        opacity: 0;
        will-change: left, top;
    `;
    document.body.appendChild(dot);

    document.addEventListener('mousemove', e => {
        dot.style.opacity = '1';
        dot.style.left = e.clientX + 'px';
        dot.style.top  = e.clientY + 'px';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(3)';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ── Float label parallax ──────────────────────
const floatLabels = document.querySelectorAll('.float-label');

window.addEventListener('scroll', () => {
    floatLabels.forEach(label => {
        const section = label.closest('section');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const pct  = (window.innerHeight / 2 - rect.top) / window.innerHeight;
        label.style.transform = `translateX(${pct * 40}px)`;
    });
}, { passive: true });
