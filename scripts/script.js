console.log("Скрипт работает!");
document.querySelector('.copyright p').innerHTML = 
  `&copy; ${new Date().getFullYear()} ПереводчикPRO100. Все права защищены.`;
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
    alert('Здесь будет информация');
  });
});

