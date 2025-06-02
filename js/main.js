
const weddingDate = new Date('2025-08-09T19:00:00');


function updateCountdown() {
    const now = new Date();
    const difference = weddingDate - now;


    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    
    document.querySelector('.wait__time-block:nth-child(1) .wait__time-block__time').textContent = String(days).padStart(2, '0');
    document.querySelector('.wait__time-block:nth-child(2) .wait__time-block__time').textContent = String(hours).padStart(2, '0');
    document.querySelector('.wait__time-block:nth-child(3) .wait__time-block__time').textContent = String(minutes).padStart(2, '0');
    document.querySelector('.wait__time-block:nth-child(4) .wait__time-block__time').textContent = String(seconds).padStart(2, '0');
}


setInterval(updateCountdown, 1000);


updateCountdown(); 
