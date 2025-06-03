console.log("Скрипт работает!");

/**
 * АЛГОРИТМ ПЛАВНОГО СКРОЛЛА:
 * 1. Проверяем, что href содержит валидный селектор
 * 2. Отменяем стандартное поведение ссылки
 * 3. Находим целевую секцию
 * 4. Выполняем плавный скролл
 * 5. Обновляем активное состояние меню
 */

// Константы
const SCROLL_OFFSET = 80;

// Основные элементы
const menuLinks = document.querySelectorAll('nav a[href]');
const courseCards = document.querySelectorAll('.course-card');
const heroBtn = document.querySelector('.hero .btn');
const courseGrid = document.querySelector('.course-grid');
const copyrightElement = document.querySelector('.copyright p');

// Функция проверки валидного селектора
function isValidSelector(selector) {
  try {
    document.querySelector(selector);
    return true;
  } catch {
    return false;
  }
}

// Функция плавного скролла
function handleSmoothScroll(e) {
  const targetId = this.getAttribute('href');
  
  // Пропускаем обработку, если это не якорная ссылка
  if (!targetId.startsWith('#') || targetId === '#') {
    return;
  }

  // Проверяем валидность селектора
  if (!isValidSelector(targetId)) {
    console.error(`Невалидный селектор: ${targetId}`);
    return;
  }

  e.preventDefault();
  
  const targetSection = document.querySelector(targetId);
  if (!targetSection) {
    console.error(`Элемент не найден: ${targetId}`);
    return;
  }

  console.log(`Скролл к ${targetId}`);
  window.scrollTo({
    top: targetSection.offsetTop - SCROLL_OFFSET,
    behavior: 'smooth'
  });
  
  menuLinks.forEach(item => item.classList.remove('active'));
  this.classList.add('active');
}

// ... остальные функции без изменений ...

function init() {
  // Обновление года в футере
  copyrightElement.innerHTML = `&copy; ${new Date().getFullYear()} ПереводчикPRO. Все права защищены.`;
  
  // Плавный скролл для меню
  menuLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });

  // ... остальная инициализация без изменений ...
}

init();
