console.log("Скрипт работает!");

/**
 * ОСНОВНЫЕ ФУНКЦИИ:
 * 1. Плавный скролл
 * 2. Анимация и статистика карточек
 * 3. Фильтрация курсов
 */

// ========== КОНСТАНТЫ ==========
const SCROLL_OFFSET = 80;
const STATS_KEY = 'courseStats';

// ========== ЭЛЕМЕНТЫ ==========
const menuLinks = document.querySelectorAll('nav a[href^="#"]');
const courseCards = document.querySelectorAll('.course-card');
const heroBtn = document.querySelector('.hero .btn');
const courseGrid = document.querySelector('.course-grid');
const copyrightElement = document.querySelector('.copyright p');
const filterForm = document.querySelector('.filter-bar');

// ========== СИСТЕМА СТАТИСТИКИ ==========
function updateStats(courseTitle, action) {
  const stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {};
  const courseStats = stats[courseTitle] || { views: 0, clicks: 0 };
  
  if (action === 'view') courseStats.views++;
  if (action === 'click') courseStats.clicks++;
  
  stats[courseTitle] = courseStats;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  
  console.log(`Статистика: ${courseTitle} - ${action === 'view' ? 'Просмотры' : 'Клики'}: ${action === 'view' ? courseStats.views : courseStats.clicks}`);
}

// ========== ФИЛЬТРАЦИЯ КУРСОВ ==========
function filterCourses() {
  if (!filterForm) return;
  
  const category = document.getElementById('category').value;
  const level = document.getElementById('level').value;
  const format = document.getElementById('format').value;

  courseCards.forEach(card => {
    const isVisible = (
      (category === 'Все категории' || card.dataset.category === category) &&
      (level === 'Любой уровень' || card.dataset.level === level) &&
      (format === 'Любой формат' || card.dataset.format === format)
    );
    
    card.style.display = isVisible ? 'block' : 'none';
    if (isVisible) {
      const title = card.querySelector('h3').textContent;
      updateStats(title, 'view');
    }
  });
}

// ========== ОБРАБОТЧИКИ КАРТОЧЕК ==========
function setupCourseCards() {
  courseCards.forEach(card => {
    // Анимация при наведении
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      const title = card.querySelector('h3').textContent;
      updateStats(title, 'view');
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
    
    // Клики по кнопкам
    const btn = card.querySelector('.btn');
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      const title = card.querySelector('h3').textContent;
      updateStats(title, 'click');
      alert(`Курс "${title}" - подробная информация скоро будет доступна!`);
    });
  });
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
function init() {
  // Обновление года
  copyrightElement.innerHTML = `&copy; ${new Date().getFullYear()} ПереводчикPRO`;
  
  // Плавный скролл
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - SCROLL_OFFSET,
          behavior: 'smooth'
        });
        menuLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Кнопка "Выбрать курс"
  heroBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.courses')?.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Инициализация карточек
  setupCourseCards();
  
  // Фильтр курсов
  if (filterForm) {
    filterForm.querySelectorAll('select').forEach(select => {
      select.addEventListener('change', filterCourses);
    });
    filterCourses(); // Применяем фильтр при загрузке
  }
  
  console.log('Все системы активированы');
  console.log('Текущая статистика:', JSON.parse(localStorage.getItem(STATS_KEY)));
}

// Запуск
init();
