document.addEventListener('DOMContentLoaded', function() {

    // Переключатель темы
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    // Функция обновления состояния переключателя
    function updateThemeToggle() {
        if (!themeToggle) return;
        const light = themeToggle.children[0];
        const dark = themeToggle.children[2];
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            light.classList.remove('activeState');
            dark.classList.add('activeState');
        } else {
            light.classList.add('activeState');
            dark.classList.remove('activeState');
        }
    }

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    }

    // Обработчик клика по переключателю темы
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = !body.classList.contains('dark-theme');
            setTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeToggle();
        });
    }

    // Проверяем сохранённую тему и инициализируем переключатель
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark');
    updateThemeToggle();


    // Скролл вверх
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Плавная навигация по разделам с подсветкой
    function initSmoothNavigation() {
        // Находим все ссылки навигации в хедере
        const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Вычисляем позицию для центрирования элемента
                    const elementRect = targetElement.getBoundingClientRect();
                    const elementTop = elementRect.top + window.pageYOffset;
                    let targetPosition;
                    
                    // Особая логика для раздела "Проекты" - показываем заголовок сверху
                    if (targetId === 'projects') {
                        // Находим заголовок секции проектов
                        const projectsHeader = targetElement.querySelector('.blockHeader');
                        if (projectsHeader) {
                            const headerRect = projectsHeader.getBoundingClientRect();
                            const headerTop = headerRect.top + window.pageYOffset;
                            targetPosition = headerTop - 20; // Небольшой отступ сверху
                        } else {
                            targetPosition = elementTop - 20;
                        }
                    } else {
                        // Для остальных разделов центрируем в viewport
                        const elementHeight = elementRect.height;
                        const viewportHeight = window.innerHeight;
                        targetPosition = elementTop - (viewportHeight - elementHeight) / 2;
                    }
                    
                    // Плавно прокручиваем к позиции
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                    
                    // Добавляем подсветку после окончания прокрутки
                    setTimeout(() => {
                        highlightSection(targetElement);
                    }, 800); // Задержка для завершения анимации прокрутки
                }
            });
        });
    }
    
    // Инициализируем плавную навигацию
    initSmoothNavigation();




    // Кликабельные listItem в секциях проектов и текстов
    function makeListItemsClickable() {
        const selectors = ['#projects .list .list-item', '#texts .list .list-item', '#main-projects .list .list-item'];
        const items = document.querySelectorAll(selectors.join(','));
        
        items.forEach(item => {
            const primaryBtn = item.querySelector('a.buttonPrimary[href]');
            if (!primaryBtn) return;
            
            item.classList.add('listItem--hoverable');
            item.style.cursor = 'pointer';
            
            const href = primaryBtn.getAttribute('href');
            const target = primaryBtn.getAttribute('target');
            
            const go = () => {
                if (target === '_blank') {
                    window.open(href, '_self');
                } else {
                    window.location.href = href;
                }
            };
            
            item.addEventListener('click', (e) => {
                if (e.defaultPrevented) return;
                if (e.target && e.target.closest('a')) return; // не перехватывать клики по ссылкам внутри
                go();
            });
            
            item.addEventListener('keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
                    e.preventDefault();
                    go();
                }
            });
            
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'link');
            
            // Добавляем hover эффект для кнопки при наведении на list item
            item.addEventListener('mouseenter', () => primaryBtn.classList.add('hover'));
            item.addEventListener('mouseleave', () => primaryBtn.classList.remove('hover'));
        });
    }

    makeListItemsClickable();

    // Обработчик для кнопки "Подробнее"
    const aboutToggleBtn = document.getElementById('aboutToggleBtn');
    const aboutDetails = document.querySelector('.about-details');
    
    if (aboutToggleBtn && aboutDetails) {
        aboutToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isVisible = aboutDetails.classList.contains('show');
            
            if (isVisible) {
                aboutDetails.classList.remove('show');
                aboutToggleBtn.textContent = 'Подробнее+';
            } else {
                aboutDetails.classList.add('show');
                aboutToggleBtn.textContent = 'Скрыть-';
            }
        });
    }


    function makeMobileProjectsItemsClickable() {
        const items = document.querySelectorAll('.mobile-projects-list .list-item');
        items.forEach(item => {
            const primaryBtn = item.querySelector('a.buttonPrimary[href]');
            if (!primaryBtn) return;
            item.classList.add('listItem--hoverable');
            item.style.cursor = 'pointer';
            const href = primaryBtn.getAttribute('href');
            const target = primaryBtn.getAttribute('target');
            const go = () => {
                if (target === '_blank') {
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            };
            item.addEventListener('click', (e) => {
                if (e.defaultPrevented) return;
                if (e.target && e.target.closest('a')) return; // не перехватывать клики по ссылкам внутри
                go();
            });
            item.addEventListener('keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
                    e.preventDefault();
                    go();
                }
            });
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'link');
            // Add hover effect to buttonPrimary when hovering over the list item
            item.addEventListener('mouseenter', () => primaryBtn.classList.add('hover'));
            item.addEventListener('mouseleave', () => primaryBtn.classList.remove('hover'));
        });
    }

    function makeMainProjectsItemsClickable() {
        const items = document.querySelectorAll('.main-projects-item');
        items.forEach(item => {
            const primaryBtn = item.querySelector('a.buttonPrimary[href]');
            if (!primaryBtn) return;
            item.classList.add('listItem--hoverable');
            item.style.cursor = 'pointer';
            const href = primaryBtn.getAttribute('href');
            const target = primaryBtn.getAttribute('target');
            const go = () => {
                if (target === '_blank') {
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            };
            item.addEventListener('click', (e) => {
                if (e.defaultPrevented) return;
                if (e.target && e.target.closest('a')) return; // не перехватывать клики по ссылкам внутри
                go();
            });
            item.addEventListener('keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
                    e.preventDefault();
                    go();
                }
            });
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'link');
            // Add hover effect to buttonPrimary when hovering over the list item
            item.addEventListener('mouseenter', () => primaryBtn.classList.add('hover'));
            item.addEventListener('mouseleave', () => primaryBtn.classList.remove('hover'));
        });
    }

    makeMainProjectsItemsClickable();
    makeMobileProjectsItemsClickable();

    // Попап уведомлений
    function initNotificationPopup() {
        const popup = document.getElementById('notificationPopup');
        const closeBtn = document.getElementById('closePopup');
        
        if (!popup || !closeBtn) return;
        
        // Изначально скрываем попап
        popup.style.visibility = 'hidden';
        
        // Показываем попап через 3 секунды
        setTimeout(() => {
            popup.style.visibility = 'visible';
            popup.classList.add('show');
        }, 3000);
        
        // Функция закрытия попапа
        function closePopup() {
            // Добавляем класс closing для анимации ease-in
            popup.classList.add('closing');
            // Убираем класс show для запуска анимации закрытия
            popup.classList.remove('show');
            
            // Ждем завершения анимации перед полным скрытием
            setTimeout(() => {
                popup.style.visibility = 'hidden';
                popup.classList.remove('closing'); // Убираем класс closing
            }, 100); // 100ms соответствует времени transition в CSS для закрытия
        }
        
        // Обработчик закрытия попапа
        closeBtn.addEventListener('click', closePopup);
        
        // Закрытие по клику вне попапа (опционально)
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
    }
    
    // Инициализируем попап только на главной странице
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        initNotificationPopup();
    }
}); 
