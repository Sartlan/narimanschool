// Управление мобильным меню
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Функция для плавной прокрутки к секциям
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    const headerOffset = 80;
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    // Добавляем эффект пульсации
    target.classList.add('pulse-effect');
    setTimeout(() => target.classList.remove('pulse-effect'), 1000);

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// Управление модальными окнами
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Разрешаем прокрутку страницы
}

// Закрытие модального окна при клике вне его содержимого
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Обработка отправки формы
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Здесь должна быть отправка данных на сервер
    // Пока просто имитируем успешную отправку
    showNotification('Сообщение успешно отправлено!', 'success');
    
    // Очищаем форму
    event.target.reset();
}

// Система уведомлений
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Загрузка дополнительных новостей
function loadMoreNews() {
    // Здесь должен быть запрос к серверу за новыми новостями
    // Пока просто показываем уведомление
    showNotification('Загрузка новостей...', 'success');
    
    // Имитация загрузки
    setTimeout(() => {
        showNotification('Новости загружены!', 'success');
    }, 1500);
}

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Анимация для статистики
const stats = document.querySelectorAll('.stat-item h3');
stats.forEach(stat => {
    const finalValue = parseInt(stat.textContent);
    let currentValue = 0;
    const duration = 2000;
    const increment = finalValue / (duration / 16);

    function updateCounter() {
        if (currentValue < finalValue) {
            currentValue += increment;
            stat.textContent = Math.ceil(currentValue) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            stat.textContent = finalValue + '+';
        }
    }

    const statObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            statObserver.unobserve(stat);
        }
    });

    statObserver.observe(stat);
});

// Фиксированная навигация при прокрутке
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Анимации для карточек
document.querySelectorAll('.news-item, .teacher-card, .contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-10px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Добавляем текущий год в футер
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-info p');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Все права защищены`;
});

// Функция для установки правильной высоты на мобильных устройствах
function setMobileHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Вызываем функцию при загрузке и изменении размера окна
window.addEventListener('load', setMobileHeight);
window.addEventListener('resize', setMobileHeight); 