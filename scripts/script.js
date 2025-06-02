// 1. Проверка подключения
console.log("Скрипт работает!");

// 2. Автоматическое обновление года в футере
document.querySelector('.copyright p').innerHTML = 
  `&copy; ${new Date().getFullYear()} ПереводчикPRO. Все права защищены.`;

// 3. Плавная прокрутка для кнопки "Выбрать курс"
document.querySelector('.hero .btn').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.courses').scrollIntoView({ behavior: 'smooth' });
});

// 4. Анимация карточек курсов
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

// 5. Заглушка для кнопок "Подробнее" (позже замените на модальное окно)
document.querySelectorAll('.course-card .btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Здесь будет информация о курсе!');
  });
});
