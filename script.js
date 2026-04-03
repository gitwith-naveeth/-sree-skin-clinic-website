// ── NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('stickyCta').classList.toggle('visible', window.scrollY > 400);
});

// ── HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;
hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.style.display = menuOpen ? 'flex' : 'none';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuOpen = false;
  mobileMenu.style.display = 'none';
}));

// ── INTERSECTION OBSERVER (animations)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── SKIN CONCERN SELECTOR
const concernData = {
  acne: {
    title: 'Acne & Pimples Treatment',
    text: 'Dr. Saravanan tailors acne treatment based on your grade, skin type, and triggers — from topical therapies and antibiotics to advanced laser and peel protocols.',
    treatments: ['Chemical Peels', 'Pico Laser', 'Topical Therapy', 'Oral Antibiotics', 'Comedone Extraction']
  },
  hairloss: {
    title: 'Hair Loss Treatment',
    text: 'A thorough trichoscopy and blood workup identifies the root cause — whether androgenetic, alopecia areata, or nutritional deficiency — followed by targeted therapy.',
    treatments: ['PRP Therapy', 'Minoxidil Protocol', 'Mesotherapy', 'Supplements', 'LLLT']
  },
  pigmentation: {
    title: 'Pigmentation Correction',
    text: 'Stubborn pigmentation from sun damage, melasma, or post-acne marks responds well to our combination approach of lasers, peels, and prescription lightening agents.',
    treatments: ['Pico Laser', 'Chemical Peels', 'Q-Switch Laser', 'Brightening Agents', 'Sunscreen Protocol']
  },
  antiaging: {
    title: 'Anti-Ageing Treatment',
    text: 'Restore youthful skin texture, volume, and tone with our medically guided anti-ageing treatments — no unnecessary procedures, just targeted results.',
    treatments: ['Fractional CO₂', 'Botox', 'Dermal Fillers', 'RF Skin Tightening', 'Microneedling']
  },
  scars: {
    title: 'Acne Scar Treatment',
    text: 'Fractional lasers, subcision, and RF microneedling work in combination to remodel scar tissue and restore smooth skin texture progressively over sessions.',
    treatments: ['Fractional CO₂', 'RF Microneedling', 'Chemical Peels', 'Subcision', 'PRP']
  },
  psoriasis: {
    title: 'Psoriasis Management',
    text: 'Chronic conditions like psoriasis and vitiligo require long-term management. Our phototherapy unit and evidence-based systemic treatments deliver real relief.',
    treatments: ['Narrowband UVB', 'Topical Steroids', 'Biologics', 'Phototherapy', 'Lifestyle Guidance']
  },
  tanning: {
    title: 'Sun Damage & Tanning',
    text: 'Reverse years of sun damage with targeted treatments that reduce tanning, correct texture, and protect your skin barrier from further damage.',
    treatments: ['Chemical Peels', 'Pico Laser', 'Brightening', 'Sunscreen Protocol', 'Vitamin C Infusion']
  },
  laser: {
    title: 'Skin Rejuvenation',
    text: 'Full-face rejuvenation combining laser resurfacing, peels, and advanced skin boosters for a refreshed, radiant complexion with minimal downtime.',
    treatments: ['Fractional CO₂', 'PRP Facials', 'Skin Boosters', 'Microneedling', 'Chemical Peels']
  }
};

function selectConcern(btn, key) {
  document.querySelectorAll('.concern-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const data = concernData[key];
  document.getElementById('cResult-title').textContent = data.title;
  document.getElementById('cResult-text').textContent = data.text;
  const tagsEl = document.getElementById('cResult-tags');
  tagsEl.innerHTML = data.treatments.map(t => `<span class="treatment-tag">${t}</span>`).join('');
  const result = document.getElementById('concernResult');
  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── FORM SUBMIT
function submitForm() {
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  if (!name || !phone) {
    alert('Please enter your name and phone number to continue.');
    return;
  }
  const concern = document.getElementById('fconcern').value;
  const msg = document.getElementById('fmsg').value;
  const waMsg = `Hello, I would like to book an appointment.\n\nName: ${name}\nPhone: ${phone}\nConcern: ${concern || 'General Consultation'}\n${msg ? 'Message: ' + msg : ''}`;
  window.open('https://wa.me/919445628809?text=' + encodeURIComponent(waMsg), '_blank');
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
  document.getElementById('fname').value = '';
  document.getElementById('fphone').value = '';
  document.getElementById('fmsg').value = '';
}

// ── SET MIN DATE FOR BOOKING
const dateInput = document.getElementById('fdate');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// ── SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

