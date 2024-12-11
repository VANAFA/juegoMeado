const levels = [
    {
        images: [
            { src: '1.jpeg', trigger: { x: '88.5%', y: '0%', width: '7%', height: '100%' }, failTriggers: [{ x: '3%', y: '0%', width: '83%', height: '100%', message: 'Mmm, dudoso' }] },
            { src: '2.jpeg', trigger: { x: '41%', y: '0%', width: '17%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: '¿Estás seguro de ir ahí?' }] },
            { src: '3.jpeg', trigger: { x: '2%', y: '0%', width: '9%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'Tenés pito, ¿no?' }] },
            { src: '4.jpeg', trigger: { x: '86%', y: '0%', width: '9%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'Yo no iría ahí si fuese vos' }] },
            { src: '5.jpeg', trigger: { x: '0%', y: '0%', width: '10%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'Dale, fijate a ver quién la tiene más grande' }] },
            { src: '6.jpeg', trigger: { x: '48%', y: '0%', width: '8%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'El tipo no podía mear sin companía' }] },
            { src: '7.jpeg', trigger: { x: '0%', y: '0%', width: '11%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'No es tan difícil, dale pa' }] },
            { src: '8.jpeg', trigger: { x: '50%', y: '0%', width: '7%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'Uy, cuidado con el gigante noble' }] },
            { src: '9.jpeg', trigger: { x: '42%', y: '0%', width: '7%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'No hay de otra que estar chocando mano con mano' }] },
            { src: '10.jpeg', trigger: { x: '0%', y: '0%', width: '12%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: '¿Te pensás que son tus patovas flaco?' }] },
            { src: '11.jpeg', trigger: { x: '77%', y: '0%', width: '7%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'Medio apretadito vas a estar ahí' }] },
            { src: '12.jpeg', trigger: { x: '16%', y: '0%', width: '7%', height: '100%' }, failTriggers: [{ x: '0%', y: '0%', width: '100%', height: '100%', message: 'Sick shit man' }] }, 
            // Add more images as needed
        ]
    },
    // Add more levels as needed
];

let currentLevel = 0;
let currentImageIndex = 0;
let failCount = 0;

function loadLevel(levelIndex) {
    currentImageIndex = 0;
    loadImage(levelIndex, currentImageIndex);
}

function loadImage(levelIndex, imageIndex) {
    const level = levels[levelIndex];
    const image = level.images[imageIndex];
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    const img = document.createElement('img');
    img.src = image.src;
    img.className = 'image';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain'; // Ensure the image maintains its aspect ratio
    levelContainer.appendChild(img);

    const trigger = document.createElement('div');
    trigger.className = 'trigger';
    trigger.style.left = image.trigger.x;
    trigger.style.top = image.trigger.y;
    trigger.style.width = image.trigger.width;
    trigger.style.height = image.trigger.height;
    trigger.addEventListener('click', nextImage);
    levelContainer.appendChild(trigger);

    image.failTriggers.forEach(failTrigger => {
        const failDiv = document.createElement('div');
        failDiv.className = 'fail-trigger';
        failDiv.style.left = failTrigger.x;
        failDiv.style.top = failTrigger.y;
        failDiv.style.width = failTrigger.width;
        failDiv.style.height = failTrigger.height;
        failDiv.addEventListener('click', () => {
            failCount++;
            showMessage(failTrigger.message);
        });
        levelContainer.appendChild(failDiv);
    });
}

function nextImage() {
    currentImageIndex++;
    if (currentImageIndex < levels[currentLevel].images.length) {
        loadImage(currentLevel, currentImageIndex);
    } else {
        nextLevel();
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        loadLevel(currentLevel);
    } else {
        showEndScreen();
    }
}

function showMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 2000);
}

function showEndScreen() {
    const endScreen = document.getElementById('end-screen');
    const endMessage = document.getElementById('end-message');
    if (failCount === 0) {
        endMessage.textContent = 'A la mierda, este tipo es hombre de pura cepa. ¡No le erraste a ninguna!';
    } else if (failCount === 1) {
        endMessage.textContent = 'Le erraste solo una vez. Podríamos decir que tenés bastante bien el instinto, pero algún que otro pito te gusta pispear.';
    } else if (failCount < 4) {
        endMessage.textContent = `Le erraste ${failCount} veces. Podríamos decir que tenés bastante bien el instinto, pero algún que otro pito te gusta mirar.`;
    } else {
        endMessage.textContent = `Le erraste ${failCount} veces. Sospecho que acá en vez de ganas de mear hay hambre.`;
    }
    endScreen.style.display = 'block';
}

function resetGame() {
    currentLevel = 0;
    currentImageIndex = 0;
    failCount = 0;
    document.getElementById('end-screen').style.display = 'none';
    loadLevel(currentLevel);
}

document.addEventListener('DOMContentLoaded', () => {
    loadLevel(currentLevel);
    document.getElementById('retry-button').addEventListener('click', resetGame);
});