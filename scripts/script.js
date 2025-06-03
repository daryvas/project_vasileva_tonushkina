console.log("Скрипт работает!");

/**
 * ОСНОВНЫЕ ФУНКЦИИ ПРОЕКТА:
 * 1. Плавный скролл
 * 2. Анимация карточек
 * 3. Фильтрация курсов
 */

// ========== КОНСТАНТЫ И ЭЛЕМЕНТЫ ==========
const SCROLL_OFFSET = 80;
const menuLinks = document.querySelectorAll('nav a[href^="#"]');
const courseCards = document.querySelectorAll('.course-card');
const heroBtn = document.querySelector('.hero .btn');
const courseGrid = document.querySelector('.course-grid');
const copyrightElement = document.querySelector('.copyright p');
const filterForm = document.querySelector('.filter-bar');

// ========== ФУНКЦИЯ ФИЛЬТРАЦИИ КУРСОВ ==========
function filterCourses() {
  const category = document.getElementById('category')?.value;
  const level = document.getElementById('level')?.value;
  const format = document.getElementById('format')?.value;

  if (!category || !level || !format) return;

  courseCards.forEach(card => {
    const matchesCategory = category === 'Все категории' || card.dataset.category === category;
    const matchesLevel = level === 'Любой уровень' || card.dataset.level === level;
    const matchesFormat = format === 'Любой формат' || card.dataset.format === format;

    card.style.display = matchesCategory && matchesLevel && matchesFormat ? 'block' : 'none';
  });
  console.log(`Фильтр применен: Категория=${category}, Уровень=${level}, Формат=${format}`);
}

// ========== ПЛАВНЫЙ СКРОЛЛ ==========
function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  if (targetId === '#') return;

  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop - SCROLL_OFFSET,
      behavior: 'smooth'
    });
    menuLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
  }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
function init() {
  // Обновление года
  copyrightElement.innerHTML = `&copy; ${new Date().getFullYear()} ПереводчикPRO`;
  
  // Плавный скролл
  menuLinks.forEach(link => link.addEventListener('click', handleSmoothScroll));

  // Кнопка "Выбрать курс"
  heroBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.courses')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Фильтр курсов (только на странице courses.html)
  if (filterForm) {
    filterForm.querySelectorAll('select').forEach(select => {
      select.addEventListener('change', filterCourses);
    });
    console.log('Модуль фильтрации активирован');
  }

  console.log('Все модули инициализированы');
}

init();
