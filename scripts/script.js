console.log("Скрипт работает!");
/**
 * АЛГОРИТМ ПЛАВНОГО СКРОЛЛА:
 * [Start] → [Click on nav link] → [Prevent default]
 *      → [Get target section] → [Calculate position]
 *      → [Smooth scroll] → [Update active menu item] → [End]
 * 
 * Блок-схема: https://i.imgur.com/VC5M5Uk.png
 */
const menuLinks = document.querySelectorAll('nav a[href^="#"]');
menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(`Скролл к ${this.getAttribute('href')} initiated`); 
    const targetSection = document.querySelector(this.getAttribute('href'));
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });   
      menuLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    }
  });
});
document.querySelector('.hero .btn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Клик по кнопке "Выбрать курс"'); 
  document.querySelector('.courses').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.course-grid').addEventListener('mouseover', (e) => {
  const card = e.target.closest('.course-card');
  if (card) {
    console.log('Наведение на карточку:', card.querySelector('h3').textContent);
    card.style.transform = 'translateY(-5px)';
  }
});
document.querySelector('.course-grid').addEventListener('mouseout', (e) => {
  const card = e.target.closest('.course-card');
  if (card) card.style.transform = '';
});
document.querySelector('.copyright p').innerHTML = 
  `&copy; ${new Date().getFullYear()} ПереводчикPRO. Все права защищены.`;
document.querySelector('.hero .btn').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.courses').scrollIntoView({ behavior: 'smooth' });
});
const cards = document.querySelectorAll('.course-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});
document.querySelectorAll('.course-card .btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Здесь будет информация о курсе');
  });
});
const menuLinks = document.querySelectorAll('nav a[href^="#"]');
menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
      menuLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    }
  });
});
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});
console.log('Скрипты успешно подключены!');
