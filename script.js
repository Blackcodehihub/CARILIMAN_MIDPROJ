// Starry Background
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
            speed: Math.random() * 0.02 + 0.01
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) {
            star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});

resizeCanvas();
createStars();
animateStars();

// Toggle navigation menu on mobile
function toggleNav() {
    const navButtons = document.querySelector('.nav-buttons');
    const hamburger = document.querySelector('.hamburger');
    navButtons.classList.toggle('active');
    hamburger.textContent = navButtons.classList.contains('active') ? '✖' : '☰';
}

// Function to show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.innerWidth <= 768) {
        const navButtons = document.querySelector('.nav-buttons');
        const hamburger = document.querySelector('.hamburger');
        navButtons.classList.remove('active');
        hamburger.textContent = '☰';
    }

    if (sectionId === 'homepage') {
        startTypingAnimation();
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    showSection(sectionId);
}

// Typing Animation for Homepage
function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    element.style.display = 'block';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function startTypingAnimation() {
    const subheading = document.getElementById('subheading-text');
    const heading = document.getElementById('heading-text');
    const tagline = document.getElementById('tagline-text');
    const bottomHeading = document.getElementById('bottom-heading-text');
    const bottomText = document.getElementById('bottom-text-content');

    const subheadingText = subheading.getAttribute('data-text');
    const headingText = heading.getAttribute('data-text');
    const taglineText = tagline.getAttribute('data-text');
    const bottomHeadingText = bottomHeading.getAttribute('data-text');
    const bottomTextContent = bottomText.getAttribute('data-text');

    typeText(subheading, subheadingText, 50, () => {
        const headingParts = headingText.split('Stellar Innovations');
        heading.innerHTML = '';
        typeText(heading, headingParts[0], 50, () => {
            const span = document.createElement('span');
            heading.appendChild(span);
            typeText(span, 'Stellar Innovations', 50, () => {
                if (headingParts[1]) {
                    const remainingText = document.createTextNode(headingParts[1]);
                    heading.appendChild(remainingText);
                }
                typeText(tagline, taglineText, 30, () => {
                    typeText(bottomHeading, bottomHeadingText, 50, () => {
                        typeText(bottomText, bottomTextContent, 30);
                    });
                });
            });
        });
    });
}

// Function to show function box
function executeFunction() {
    const selectedFunction = document.getElementById('functionSelect').value;
    const functionBoxes = document.querySelectorAll('.function-box');
    functionBoxes.forEach(box => {
        box.classList.add('hidden');
        // Clear previous results
        const resultElement = box.querySelector('.result');
        if (resultElement) resultElement.textContent = '';
    });

    if (selectedFunction) {
        document.getElementById(selectedFunction).classList.remove('hidden');
        // Reset input fields
        const inputs = document.getElementById(selectedFunction).querySelectorAll('input, select');
        inputs.forEach(input => {
            input.value = input.tagName === 'SELECT' ? '' : input.value;
        });
    }
}

// Add Enter key functionality for inputs
function handleEnterKey(event, buttonHandler) {
    if (event.key === 'Enter') {
        event.preventDefault();
        buttonHandler();
    }
}

// 1. Temperature Converter
function convertTemperature(temp, unit) {
    if (isNaN(temp)) return "Please enter a valid number.";
    if (unit === "1") {
        const convertedTemp = (temp * 9/5) + 32;
        return `${temp}°C = ${convertedTemp.toFixed(2)}°F`;
    } else if (unit === "2") {
        const convertedTemp = (temp - 32) * 5/9;
        return `${temp}°F = ${convertedTemp.toFixed(2)}°C`;
    }
    return "Invalid choice. Please select 1 or 2.";
}

function handleTemperatureConvert() {
    const tempInput = document.getElementById('tempInput').value;
    const unit = document.getElementById('tempUnit').value;
    const resultElement = document.getElementById('tempResult');

    if (tempInput === '' || unit === '') {
        resultElement.textContent = "Please provide both temperature and unit.";
        return;
    }

    const temp = parseFloat(tempInput);
    resultElement.textContent = convertTemperature(temp, unit);
}

// Add Enter key listener for Temperature Converter
document.getElementById('temperatureConverter')?.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        handleEnterKey(event, handleTemperatureConvert);
    }
});

// 2. The Longer Word
function findLongerWord(word1, word2) {
    if (!word1 || !word2) return "Please enter both words.";
    if (word1.length > word2.length) {
        return `"${word1}" is longer than "${word2}".`;
    } else if (word2.length > word1.length) {
        return `"${word2}" is longer than "${word1}".`;
    }
    return `"${word1}" and "${word2}" are of the same length.`;
}

function handleLongerWord() {
    const word1 = document.getElementById('word1').value.trim();
    const word2 = document.getElementById('word2').value.trim();
    const resultElement = document.getElementById('wordResult');

    resultElement.textContent = findLongerWord(word1, word2);
}

// Add Enter key listener for The Longer Word
document.getElementById('longerWord')?.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT') {
        handleEnterKey(event, handleLongerWord);
    }
});

// 3. Know My Birthstone
function findBirthstone(month) {
    if (!month || month.trim() === "") return "Please enter a month.";
    const birthstones = {
        'january': 'Garnet',
        'february': 'Amethyst',
        'march': 'Aquamarine',
        'april': 'Diamond',
        'may': 'Emerald',
        'june': 'Pearl',
        'july': 'Ruby',
        'august': 'Peridot',
        'september': 'Sapphire',
        'october': 'Opal',
        'november': 'Topaz',
        'december': 'Turquoise'
    };
    const monthLower = month.toLowerCase().trim();
    return birthstones[monthLower] ? `Your birthstone is ${birthstones[monthLower]}.` : "Invalid month. Please enter a valid month name (e.g., January, February, etc.).";
}

function handleBirthstone() {
    const month = document.getElementById('birthMonth').value.trim();
    const resultElement = document.getElementById('birthstoneResult');

    resultElement.textContent = findBirthstone(month);
}

// Add Enter key listener for Know My Birthstone
document.getElementById('birthstone')?.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT') {
        handleEnterKey(event, handleBirthstone);
    }
});

// 4. Basic Operators
function calculate(num1, num2, operator) {
    if (isNaN(num1) || isNaN(num2)) return "Please enter valid numbers.";
    switch (operator) {
        case '1':
            return `${num1} + ${num2} = ${num1 + num2}`;
        case '2':
            return `${num1} - ${num2} = ${num1 - num2}`;
        case '3':
            return `${num1} × ${num2} = ${num1 * num2}`;
        case '4':
            if (num2 === 0) return "Cannot divide by zero.";
            return `${num1} ÷ ${num2} = ${(num1 / num2).toFixed(2)}`;
        default:
            return "Invalid operation. Please select 1-4.";
    }
}

function handleCalculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    const resultElement = document.getElementById('calcResult');

    if (isNaN(num1) || isNaN(num2) || operator === '') {
        resultElement.textContent = "Please provide both numbers and an operation.";
        return;
    }

    resultElement.textContent = calculate(num1, num2, operator);
}

// Add Enter key listener for Basic Operators
document.getElementById('basicOperators')?.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        handleEnterKey(event, handleCalculate);
    }
});

// 5. Compute for Acceleration
function computeAcceleration(force, mass) {
    if (isNaN(force) || isNaN(mass)) return "Please enter valid values for force and mass.";
    if (mass === 0) return "Mass cannot be zero.";
    const acceleration = force / mass;
    return `Acceleration: ${acceleration.toFixed(2)} m/s²`;
}

function handleComputeAcceleration() {
    const force = parseFloat(document.getElementById('force').value);
    const mass = parseFloat(document.getElementById('mass').value);
    const resultElement = document.getElementById('accelResult');

    if (isNaN(force) || isNaN(mass)) {
        resultElement.textContent = "Please provide both force and mass.";
        return;
    }

    resultElement.textContent = computeAcceleration(force, mass);
}

// Add Enter key listener for Compute for Acceleration
document.getElementById('computeAcceleration')?.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT') {
        handleEnterKey(event, handleComputeAcceleration);
    }
});

// Heart toggle function for favorites gallery
function toggleHeart(heart) {
    heart.classList.toggle('filled');
    heart.textContent = heart.classList.contains('filled') ? '♥' : '♡';
}

// Submit comment function
function submitComment(button) {
    const textarea = button.previousElementSibling;
    const commentText = textarea.value.trim();
    if (commentText) {
        const commentList = button.nextElementSibling;
        const li = document.createElement('li');
        li.textContent = commentText;
        commentList.appendChild(li);
        textarea.value = '';
    }
}

// Submit comment on Enter key
function submitOnEnter(event, textarea) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const submitButton = textarea.nextElementSibling;
        submitComment(submitButton);
    }
}

// Carousel functionality with 3D effect
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');

slides[currentSlide].classList.add('active');

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 4000);

// Initialize homepage as visible
document.addEventListener('DOMContentLoaded', () => {
    showSection('homepage');
});