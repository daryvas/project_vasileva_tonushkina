console.log("Скрипт работает!");

/**
 * АЛГОРИТМ ПЛАВНОГО СКРОЛЛА:
 * [Start] → [Click on nav link] → [Prevent default]
 *      → [Get target section] → [Calculate position]
 *      → [Smooth scroll] → [Update active menu item] → [End]
 * 
 * Блок-схема: https://i.imgur.com/VC5M5Uk.png
 */
const SCROLL_OFFSET = 80;
const menuLinks = document.querySelectorAll('nav a[href^="#"]:not([href="#"])'); 
const courseCards = document.querySelectorAll('.course-card');
const heroBtn = document.querySelector('.hero .btn');
const courseGrid = document.querySelector('.course-grid');
const copyrightElement = document.querySelector('.copyright p');
function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  if (targetId === '#') return;
  console.log(`Скролл к ${targetId} initiated`);
  const targetSection = document.querySelector(targetId);  
  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop - SCROLL_OFFSET,
      behavior: 'smooth'
    });
    menuLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
  }
}
function init() {
  copyrightElement.innerHTML = `&copy; ${new Date().getFullYear()} ПереводчикPRO. Все права защищены.`;
  menuLinks.forEach(link => {
    if (link.getAttribute('href') !== '#') {
      link.addEventListener('click', handleSmoothScroll);
    }
  });
}
init();
