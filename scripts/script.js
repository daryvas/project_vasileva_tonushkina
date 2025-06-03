console.log("Скрипт работает!");

/**
 * АЛГОРИТМ ПЛАВНОГО СКРОЛЛА:
 * [Start] → [Click on nav link] → [Prevent default]
 *      → [Get target section] → [Calculate position]
 *      → [Smooth scroll] → [Update active menu item] → [End]
 * 
 * Блок-схема: https://i.imgur.com/VC5M5Uk.png
 */

// Константы
const SCROLL_OFFSET = 80;
const menuLinks = document.querySelectorAll('nav a[href^="#"]');
const courseCards = document.querySelectorAll('.course-card');
const heroBtn = document.querySelector('.hero .btn');
const courseGrid = document.querySelector('.course-grid');
const copyrightElement = document.querySelector('.copyright p');
function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  console.log(`Скролл к ${targetId} initiated`);
  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop - SCROLL_OFFSET,
      behavior: 'smooth'
    }); 
    menuLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
  }
}
function handleCardHover(card) {
  card.style.transform = 'translateY(-5px)';
  card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
}
function handleCardLeave(card) {
  card.style.transform = '';
  card.style.boxShadow = '';
}
function init() {
  copyrightElement.innerHTML = `&copy; ${new Date().getFullYear()} ПереводчикPRO. Все права защищены.`;
  menuLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });
  heroBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Клик по кнопке "Выбрать курс"');
    document.querySelector('.courses').scrollIntoView({ behavior: 'smooth' });
  });
  courseGrid.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.course-card');
    if (card) {
      console.log('Наведение на карточку:', card.querySelector('h3').textContent);
      handleCardHover(card);
    }
  });
  courseGrid.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.course-card');
    if (card) handleCardLeave(card);
  });
  document.querySelectorAll('.course-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Здесь будет информация о курсе');
    });
  });
  console.log('Скрипты успешно подключены!');
}
init();
