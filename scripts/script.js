document.addEventListener('DOMContentLoaded', () => {
    // Добавляем прелоадер
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader__content">
            <div class="preloader__spinner"></div>
            <div class="preloader__text">Загрузка...</div>
        </div>
    `;
    document.body.prepend(preloader);

    // Скрываем контент во время загрузки
    const mainContent = document.querySelector('.content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.visibility = 'hidden';
    }

    // Функция для скрытия прелоадера
    const hidePreloader = () => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';

        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            mainContent.style.transition = 'opacity 0.5s ease';
        }

        setTimeout(() => {
            preloader.remove();
        }, 500);
    };

    // Имитация загрузки (в реальном проекте можно убрать setTimeout)
    setTimeout(() => {
        hidePreloader();
        initPage();
    }, 2000);

    function initPage() {
        /* --- Динамическое создание карточек курсов в слайдере --- */
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        if (swiperWrapper) {
            console.log('Инициализация слайдера курсов...');
            
            const apiUrl = 'data.json';

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log('Данные курсов получены:', data);
                    
                    const courses = data.courses;
                    const minSlides = 5;
                    const slideDuplicates = [...courses];

                    while (slideDuplicates.length < minSlides) {
                        slideDuplicates.push(...courses);
                    }

                    // Создаем карточки для слайдера
                    slideDuplicates.forEach((course, index) => {
                        console.log(`Создание карточки курса ${index + 1}: ${course.title}`);
                        
                        const slide = `
                            <div class="swiper-slide" data-course-id="${course.id}">
                                <div class="course-card">
                                    <div class="course-img" style="background-image: url('${course.image}');"></div>
                                    <div class="course-content">
                                        <h3>${course.title}</h3>
                                        <p>${course.description}</p>
                                        <div class="price">${course.price}</div>
                                        <a href="${course.link}" class="btn" data-course-link>Подробнее</a>
                                    </div>
                                </div>
                            </div>`;
                        swiperWrapper.insertAdjacentHTML('beforeend', slide);
                    });

                    // Добавляем слушатели для карточек курсов
                    document.querySelectorAll('.course-card').forEach(card => {
                        // Mouseover - при наведении на карточку
                        card.addEventListener('mouseover', () => {
                            const courseTitle = card.querySelector('h3').textContent;
                            console.log(`Навели курсор на курс: "${courseTitle}"`);
                            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                        });

                        // Mouseout - когда убрали курсор
                        card.addEventListener('mouseout', () => {
                            const courseTitle = card.querySelector('h3').textContent;
                            console.log(`Убрали курсор с курса: "${courseTitle}"`);
                            card.style.boxShadow = 'none';
                        });

                        // Click - при клике на карточку
                        card.addEventListener('click', (e) => {
                            // Проверяем, был ли клик по ссылке "Подробнее"
                            if (e.target.hasAttribute('data-course-link')) {
                                console.log('Клик по ссылке "Подробнее"');
                                return;
                            }
                            
                            const courseId = card.closest('.swiper-slide').dataset.courseId;
                            const courseTitle = card.querySelector('h3').textContent;
                            console.log(`Клик по карточке курса ID: ${courseId}, "${courseTitle}"`);
                        });
                    });

                    // Инициализация Swiper с обработчиками событий
                    const swiper = new Swiper('.swiper', {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        loop: true,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        breakpoints: {
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }
                    });

                    // События Swiper
                    swiper.on('slideChange', () => {
                        console.log('Слайд изменился. Активный индекс:', swiper.realIndex);
                    });

                    swiper.on('click', (swiper, event) => {
                        console.log('Клик по слайдеру', event.target);
                    });
                })
                .catch((error) => {
                    console.error('Ошибка при загрузке данных курсов:', error);
                });
        }
        
        /* --- Работа с кнопкой входа и модальным окном --- */
        const loginButton = document.getElementById('login-btn');
        const dialogLayout = document.getElementById('dialog-layout');

        if (loginButton && dialogLayout) {
            console.log('Инициализация модального окна...');
            
            const closeDialogButtons = dialogLayout.querySelectorAll('[data-close]');
            const selectPopup = dialogLayout.querySelector('#popup-select');
            const loginPopup = dialogLayout.querySelector('#popup-login');
            const registrationPopup = dialogLayout.querySelector('#popup-registration');
            const switchToRegisterButtons = dialogLayout.querySelectorAll('[data-registration]');
            const switchToLoginButtons = dialogLayout.querySelectorAll('[data-login]');

            // Открытие модального окна
            loginButton.addEventListener('click', () => {
                console.log('Клик по кнопке "Войти" - открытие модального окна');
                dialogLayout.removeAttribute('hidden');
                
                // Логируем текущее состояние localStorage
                console.log('Текущий логин в localStorage:', localStorage.getItem('login'));
            });

            // Закрытие модального окна
            closeDialogButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    console.log(`Клик по кнопке закрытия #${index + 1}`);
                    dialogLayout.setAttribute('hidden', 'true');
                    selectPopup.removeAttribute('hidden');
                    loginPopup.setAttribute('hidden', 'true');
                    registrationPopup.setAttribute('hidden', 'true');
                });
            });

            // Клик вне модального окна
            dialogLayout.addEventListener('click', (e) => {
                if (e.target === dialogLayout) {
                    console.log('Клик вне модального окна - закрытие');
                    dialogLayout.setAttribute('hidden', 'true');
                    selectPopup.removeAttribute('hidden');
                    loginPopup.setAttribute('hidden', 'true');
                    registrationPopup.setAttribute('hidden', 'true');
                }
            });

            // Переключение на форму регистрации
            switchToRegisterButtons.forEach((button, index) => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    console.log(`Клик по кнопке регистрации #${index + 1}`);
                    selectPopup.setAttribute('hidden', 'true');
                    loginPopup.setAttribute('hidden', 'true');
                    registrationPopup.removeAttribute('hidden');
                });
            });

            // Переключение на форму входа
            switchToLoginButtons.forEach((button, index) => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    console.log(`Клик по кнопке входа #${index + 1}`);
                    selectPopup.setAttribute('hidden', 'true');
                    registrationPopup.setAttribute('hidden', 'true');
                    loginPopup.removeAttribute('hidden');

                    const savedLogin = localStorage.getItem('login');
                    if (savedLogin) {
                        const loginField = loginPopup.querySelector('#userlogin');
                        console.log(`Автозаполнение логина из localStorage: ${savedLogin}`);
                        loginField.value = savedLogin;
                    }
                });
            });

            // Обработка формы регистрации
            registrationPopup.addEventListener('submit', (event) => {
                event.preventDefault();
                console.log('Отправка формы регистрации');
                
                const username = registrationPopup.querySelector('#username').value;
                const login = registrationPopup.querySelector('#login').value;
                const email = registrationPopup.querySelector('#email').value;
                const password = registrationPopup.querySelector('#password').value;
                const confirmPassword = registrationPopup.querySelector('#confirm-password').value;
                const errorMessage = registrationPopup.querySelector('#error-message');

                console.log('Данные формы:', {username, login, email, password, confirmPassword});

                if (password !== confirmPassword) {
                    console.log('Ошибка: пароли не совпадают');
                    errorMessage.textContent = 'Пароли не совпадают';
                    errorMessage.style.color = 'red';
                    return;
                }

                if (username.length < 3) {
                    console.log('Ошибка: имя слишком короткое');
                    errorMessage.textContent = 'Имя пользователя должно содержать не менее 3 символов';
                    return;
                }

                if (password.length < 8) {
                    console.log('Ошибка: пароль слишком короткий');
                    errorMessage.textContent = 'Пароль должен содержать не менее 8 символов';
                    return;
                }

                console.log('Регистрация успешна, сохранение логина в localStorage');
                errorMessage.textContent = 'Регистрация прошла успешно!';
                errorMessage.style.color = 'green';

                localStorage.setItem('login', login);
                registrationPopup.reset();
            });

            // Обработка формы входа
            loginPopup.addEventListener('submit', (event) => {
                event.preventDefault();
                console.log('Отправка формы входа');
                
                const loginField = loginPopup.querySelector('#userlogin').value;
                const passwordField = loginPopup.querySelector('#userpassword').value;
                const errorMessage = loginPopup.querySelector('#error-message-login');

                console.log('Введенные данные:', {login: loginField, password: passwordField});

                const users = {
                    test: '12345678',
                    student: '0987654321',
                };

                if (users[loginField] === passwordField) {
                    console.log('Успешный вход');
                    errorMessage.textContent = 'Вход выполнен успешно';
                    errorMessage.style.color = 'green';

                    setTimeout(() => {
                        console.log('Закрытие модального окна после успешного входа');
                        dialogLayout.setAttribute('hidden', 'true');
                        loginPopup.reset();
                    }, 2000);
                } else {
                    console.log('Ошибка входа: неверные данные');
                    errorMessage.textContent = 'Неверный логин или пароль';
                    errorMessage.style.color = 'red';
                }
            });
        }

        /* --- Глобальные слушатели событий --- */
        console.log('Установка глобальных слушателей событий...');
        
        // Слушатель скролла
        window.addEventListener('scroll', () => {
            console.log('Прокрутка страницы. Текущая позиция:', window.scrollY);
        });

        // Слушатель изменения размера окна
        window.addEventListener('resize', () => {
            console.log('Изменение размера окна:', window.innerWidth, 'x', window.innerHeight);
        });

        // Слушатель кликов по документу
        document.addEventListener('click', (e) => {
            console.log('Клик по элементу:', e.target);
        });

        // Слушатель наведения на элементы
        document.addEventListener('mouseover', (e) => {
            console.log('Наведение на элемент:', e.target);
        });

        console.log('Инициализация завершена');
    }
});
