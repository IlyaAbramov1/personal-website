// Управление переключением языка
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const languageIndicator = document.getElementById('languageIndicator');
    const languageTexts = document.querySelectorAll('.language-text');
    
    let currentLanguage = 'ru'; // По умолчанию русский
    
    // Обработчик клика на кнопку переключения языка
    languageToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Определяем новый язык
        const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
        switchLanguage(newLanguage);
    });
    
    // Обработчики кликов на отдельные языки
    languageTexts.forEach(text => {
        text.addEventListener('click', function(e) {
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLanguage) {
                switchLanguage(lang);
            }
        });
    });
    
    function switchLanguage(lang) {
        currentLanguage = lang;
        
        // Анимация индикатора
        if (lang === 'en') {
            languageIndicator.classList.add('en-active');
        } else {
            languageIndicator.classList.remove('en-active');
        }
        
        // Здесь можно добавить логику смены языка контента
        console.log('Переключение языка на:', lang.toUpperCase());
        
        // Можно добавить событие для других компонентов
        document.dispatchEvent(new CustomEvent('languageChange', { 
            detail: { language: lang } 
        }));
    }
    
    // Инициализация начального состояния
    switchLanguage('ru');
});

// Управление навигацией и активными состояниями
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.getElementById('homeLink');
    const navItems = document.querySelectorAll('.nav-item');
    const hamburgerButton = document.getElementById('hamburgerButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Определение текущей страницы по URL
    function getCurrentPage() {
        const path = window.location.pathname;
        
        // Убираем возможную подпапку проекта из пути
        let cleanPath = path;
        if (path.includes('/sirena-web/')) {
            cleanPath = path.split('/sirena-web')[1];
        }
        
        // Проверка главной страницы
        if (cleanPath === '/' || cleanPath === '/index.html' || cleanPath === '' || cleanPath === '/sirena-web/' || cleanPath === '/sirena-web/index.html') {
            return 'home';
        }
        
        // Определение страницы по пути
        if (cleanPath.startsWith('/cases') || path.includes('/sirena-web/cases')) {
            return 'cases';
        }
        if (cleanPath.startsWith('/team') || path.includes('/sirena-web/team')) {
            return 'team';
        }
        if (cleanPath.startsWith('/careers') || path.includes('/sirena-web/careers')) {
            return 'careers';
        }
        if (cleanPath.startsWith('/contact') || path.includes('/sirena-web/contact')) {
            return 'contact';
        }
        // Страница конкретной вакансии должна подсвечивать раздел "Вакансии"
        if (cleanPath.startsWith('/job-position') || path.includes('/sirena-web/job-position')) {
            return 'careers';
        }
        
        return 'home';
    }
    
    // Установка активного состояния навигации
    function setActiveNavigation() {
        const currentPage = getCurrentPage();
        const isHomePage = currentPage === 'home';
        
        // Показать/скрыть кнопку "На главную"
        if (homeLink) {
            homeLink.style.display = isHomePage ? 'none' : 'flex';
        }
        
        // Убираем активные классы со всех элементов
        navItems.forEach(item => {
            item.classList.remove('nav-item-active');
        });
        
        // Устанавливаем активный класс для текущей страницы
        if (!isHomePage) {
            const activeSelectors = {
                'cases': '.nav-bar a[href="./cases/"], .nav-bar a[href="../cases/"]',
                'team': '.nav-bar a[href="./team/"], .nav-bar a[href="../team/"]',
                'careers': '.nav-bar a[href="./careers/"], .nav-bar a[href="../careers/"]',
                'contact': '.nav-bar a[href="./contact/"], .nav-bar a[href="../contact/"]'
            };

            const selector = activeSelectors[currentPage];
            if (selector) {
                const activeItems = document.querySelectorAll(selector);
                activeItems.forEach(item => item.classList.add('nav-item-active'));
            }
        }
        
        console.log('Текущая страница:', currentPage);
        console.log('Главная страница:', isHomePage);
    }
    
    // Инициализация при загрузке
    setActiveNavigation();
    
    // Обновление при изменении URL (для SPA)
    window.addEventListener('popstate', setActiveNavigation);

    // Hamburger open/close
    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('open');
        if (hamburgerButton) {
            hamburgerButton.setAttribute('aria-expanded', 'false');
            const menuIcon = hamburgerButton.querySelector('.menu-icon');
            if (menuIcon) menuIcon.src = './imgs/icons/w-hamburger.svg';
        }
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('open');
        if (hamburgerButton) {
            hamburgerButton.setAttribute('aria-expanded', 'true');
            const menuIcon = hamburgerButton.querySelector('.menu-icon');
            if (menuIcon) menuIcon.src = './imgs/icons/w-cross.svg';
        }
        document.body.style.overflow = 'hidden';
    }

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', function() {
            if (mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Закрытие по клику на ссылку
        mobileMenu.addEventListener('click', function(e) {
            const target = e.target;
            if (target.closest('a')) {
                closeMobileMenu();
            }
        });

        // Закрытие по Esc
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeMobileMenu();
        });
    }
});
