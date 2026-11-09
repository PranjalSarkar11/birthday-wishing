// --- 1. Floating Hearts Background Generator ---
const heartsContainer = document.getElementById('floatingHearts');
const heartSymbols = ['❤️', '💖', '✨', '💕', '💗', '⭐'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; // 4 to 7 seconds
    heart.style.fontSize = (Math.random() * 10 + 12) + 'px';
    
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 400);

// --- 2. Live Countdown Timer to November 30 ---
function updateCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();
    
    // Target is November 30 of the current year
    let targetDate = new Date(currentYear, 10, 30, 0, 0, 0); // Month 10 is November (0-indexed)

    // If Nov 30 has already passed this year, target next year
    if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 10, 30, 0, 0, 0);
    }

    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    // Check if today is November 30
    const isBirthday = now.getMonth() === 10 && now.getDate() === 30;
    if (isBirthday || diff <= 0) {
        document.getElementById('birthday-alert').classList.remove('hidden');
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- 3. Interactive Photo Slider ---
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');
let currentSlide = 0;
let slideInterval;

// Create indicator dots dynamically
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetTimer();
}

document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide();
    resetTimer();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlideFunc();
    resetTimer();
});

// Auto-play slider every 4 seconds
function startTimer() {
    slideInterval = setInterval(nextSlide, 4000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

startTimer();

// --- 4. Dynamic Love Quotes Rotator ---
const loveQuotes = [
    {
        text: "In a world full of temporary things, you are my forever, my peace, and my absolute favorite reason to smile.",
        author: "— Forever Yours"
    },
    {
        text: "I never truly understood what home felt like until I looked into your eyes and held your hand.",
        author: "— Your Lucky Guy"
    },
    {
        text: "Meeting you was fate , ata totally amader kismat amader dekha howar kono chances e chilo na..hoyto thakur amar jonnoi toke baniyeche and vice versa.",
        author: "— Rab ne bana di jodi..(#filmy dialogue)"
    },
    {
        text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.",
        author: "—To the sweatest motki "
    },
    {
        text: "No matter where life takes us or what we do, but i will always support you and i will try to be your strength.",
        author: "— Always & Forever"
    }
];

let quoteIndex = 0;
const quoteTextEl = document.getElementById('quoteText');
const quoteAuthorEl = document.getElementById('quoteAuthor');
const nextQuoteBtn = document.getElementById('nextQuoteBtn');

nextQuoteBtn.addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % loveQuotes.length;
    
    // Smooth transition effect
    quoteTextEl.style.opacity = 0;
    quoteAuthorEl.style.opacity = 0;
    
    setTimeout(() => {
        quoteTextEl.innerText = `"${loveQuotes[quoteIndex].text}"`;
        quoteAuthorEl.innerText = loveQuotes[quoteIndex].author;
        quoteTextEl.style.opacity = 1;
        quoteAuthorEl.style.opacity = 1;
    }, 200);
});

// Add transition styling dynamically to quote text
quoteTextEl.style.transition = 'opacity 0.2s ease-in-out';
quoteAuthorEl.style.transition = 'opacity 0.2s ease-in-out';
