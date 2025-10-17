document.addEventListener('DOMContentLoaded', function() {
    // Интерактивные кнопки для статьи об анимации
    function initAnimationButtons() {
        const sharpButton = document.getElementById('sharpButton');
        const blurButton = document.getElementById('blurButton');

        if (!sharpButton || !blurButton) return;

        // Первая кнопка - резкое изменение через opacity
        let sharpState = false;
        sharpButton.addEventListener('click', function() {
            const copyIcon = this.querySelector('.icon-copy');
            const checkmarkIcon = this.querySelector('.icon-checkmark');
            
            if (sharpState) {
                // Возвращаемся к copy иконке
                copyIcon.classList.remove('hidden');
                copyIcon.classList.add('visible');
                checkmarkIcon.classList.remove('visible');
                checkmarkIcon.classList.add('hidden');
            } else {
                // Меняем на checkmark
                copyIcon.classList.remove('visible');
                copyIcon.classList.add('hidden');
                checkmarkIcon.classList.remove('hidden');
                checkmarkIcon.classList.add('visible');
            }
            
            sharpState = !sharpState;
        });

        // Вторая кнопка - плавное изменение с blur
        let blurState = false;
        blurButton.addEventListener('click', function() {
            const copyIcon = this.querySelector('.icon-copy');
            const checkmarkIcon = this.querySelector('.icon-checkmark');
            
            if (blurState) {
                // Возвращаемся к copy иконке
                copyIcon.classList.remove('hidden');
                copyIcon.classList.add('visible');
                checkmarkIcon.classList.remove('visible');
                checkmarkIcon.classList.add('hidden');
            } else {
                // Меняем на checkmark
                copyIcon.classList.remove('visible');
                copyIcon.classList.add('hidden');
                checkmarkIcon.classList.remove('hidden');
                checkmarkIcon.classList.add('visible');
            }
            
            blurState = !blurState;
        });
    }

    // Инициализируем кнопки анимации
    initAnimationButtons();


    // Droplist без анимации элементов
    function initDroplistNoItems() {
        const droplist = document.getElementById('droplistNoItems');
        const droplistButton = document.getElementById('droplistButtonNoItems');
        if (!droplist || !droplistButton) return;

        let droplistState = false;

        function closeDroplist() {
            if (!droplistState) return;
            
            droplist.classList.remove('droplist-animation');
            droplist.classList.add('droplist-closing');
            
            setTimeout(() => {
                droplist.classList.remove('droplist-closing');
            }, 150);
            
            droplistState = false;
        }

        function openDroplist() {
            droplist.classList.remove('droplist-animation');
            droplist.classList.remove('droplist-closing');
            
            setTimeout(() => {
                droplist.classList.add('droplist-animation');
            }, 10);
            droplistState = true;
        }

        droplistButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (droplistState) {
                closeDroplist();
            } else {
                openDroplist();
            }
        });

        // Закрытие при клике вне droplist
        document.addEventListener('click', function(e) {
            if (!droplist.contains(e.target) && e.target !== droplistButton) {
                closeDroplist();
            }
        });

        // Предотвращение закрытия при клике на сам droplist
        droplist.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Droplist с анимацией элементов
    function initDroplistWithItems() {
        const droplist = document.getElementById('droplistWithItems');
        const droplistButton = document.getElementById('droplistButtonWithItems');
        if (!droplist || !droplistButton) return;

        const droplistItems = droplist.querySelectorAll('.droplist-item');
        let droplistState = false;

        function closeDroplist() {
            if (!droplistState) return;
            
            droplist.classList.remove('droplist-animation');
            droplist.classList.add('droplist-closing');
            droplistItems.forEach(item => {
                item.classList.remove('droplist-item-animation');
            });
            
            setTimeout(() => {
                droplist.classList.remove('droplist-closing');
            }, 150);
            
            droplistState = false;
        }

        function openDroplist() {
            droplist.classList.remove('droplist-animation');
            droplist.classList.remove('droplist-closing');
            droplistItems.forEach(item => {
                item.classList.remove('droplist-item-animation');
            });
            
            setTimeout(() => {
                droplist.classList.add('droplist-animation');
                droplistItems.forEach(item => {
                    item.classList.add('droplist-item-animation');
                });
            }, 10);
            droplistState = true;
        }

        droplistButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (droplistState) {
                closeDroplist();
            } else {
                openDroplist();
            }
        });

        // Закрытие при клике вне droplist
        document.addEventListener('click', function(e) {
            if (!droplist.contains(e.target) && e.target !== droplistButton) {
                closeDroplist();
            }
        });

        // Предотвращение закрытия при клике на сам droplist
        droplist.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    initDroplistNoItems();
    initDroplistWithItems();

    // Функция управления удалением изображений
    function initTrashAnimation() {
        const imageContainers = document.querySelectorAll('.image-and-checkmark');
        const buttonToTrash = document.getElementById('buttonToTrash');
        const canTop = document.getElementById('canTop');
        const canBottom = document.getElementById('canBottom');
        const buttonText = buttonToTrash ? buttonToTrash.querySelector('p') : null;
        
        if (!imageContainers.length || !buttonToTrash || !canTop || !canBottom) return;

        let confirmMode = false;
        let selectedImages = new Set();

        // Функция проверки видимых checkmarks
        function updateButtonVisibility() {
            const visibleCheckmarks = document.querySelectorAll('.checkmark-in-image.visible');
            if (visibleCheckmarks.length > 0 && !confirmMode) {
                buttonToTrash.classList.add('visible');
            } else if (visibleCheckmarks.length === 0 && !confirmMode) {
                buttonToTrash.classList.remove('visible');
            }
        }

        // Клик по картинке - выбор/отмена
        imageContainers.forEach(container => {
            container.addEventListener('click', function() {
                if (confirmMode) return; // Блокируем выбор в режиме подтверждения
                
                const checkmark = this.querySelector('.checkmark-in-image');
                const image = this.querySelector('.image-in-can');
                
                if (checkmark.classList.contains('visible')) {
                    checkmark.classList.remove('visible');
                    selectedImages.delete(image);
                } else {
                    checkmark.classList.add('visible');
                    selectedImages.add(image);
                }
                
                updateButtonVisibility();
            });
        });

        // Клик по кнопке удаления
        buttonToTrash.addEventListener('click', function() {
            if (!confirmMode) {
                // Переход в режим подтверждения
                confirmMode = true;
                
                // Показываем корзину
                canTop.classList.add('visible');
                canBottom.classList.add('visible');
                
                // Затухание невыбранных картинок и скрытие checkmark-ов
                imageContainers.forEach(container => {
                    const image = container.querySelector('.image-in-can');
                    const checkmark = container.querySelector('.checkmark-in-image');
                    const checkmarkContainer = container.querySelector('.checkmark-container');
                    
                    if (!selectedImages.has(image)) {
                        container.classList.add('faded');
                    } else {
                        // Скрываем checkmark и контейнер у выбранных изображений
                        checkmark.classList.remove('visible');
                        checkmarkContainer.classList.add('hidden');
                    }
                });
                
                // Меняем кнопку на подтверждение
                buttonToTrash.classList.add('confirm');
                buttonText.textContent = 'Подтвердить удаление';
                
                // Перемещаем выбранные картинки в корзину
                moveImagesToTrash();
                
            } else {
                // Подтверждение удаления
                confirmDeletion();
            }
        });

        function moveImagesToTrash() {
            const canRect = canTop.getBoundingClientRect();
            const canCenterX = canRect.left + canRect.width / 2;
            const canCenterY = canRect.top + canRect.height / 2;
            
            // Различные позиции (offsetX, offsetY) для каждой картинки
            const positions = [
                { offsetX: 0, offsetY: -8, className: 'position-1' },
                { offsetX: 0, offsetY: -15, className: 'position-2' },
                { offsetX: 5, offsetY: -10, className: 'position-3' },
                { offsetX: -5, offsetY: -6, className: 'position-4' }
            ];
            
            // Преобразуем Set в массив для правильной работы с индексами
            const imagesArray = Array.from(selectedImages);
            
            imagesArray.forEach((image, index) => {
                const imageRect = image.getBoundingClientRect();
                const imageCenterX = imageRect.left + imageRect.width / 2;
                const imageCenterY = imageRect.top + imageRect.height / 2;
                
                const deltaX = canCenterX - imageCenterX;
                const deltaY = canCenterY - imageCenterY;
                
                // Используем предустановленную позицию
                const pos = positions[index % positions.length];
                const positionNumber = (index % positions.length) + 1;
                
                // Добавляем класс позиции
                image.classList.add(pos.className);
                
                // Устанавливаем CSS переменные для координат
                image.style.setProperty(`--target-x-${positionNumber}`, `${deltaX + pos.offsetX}px`);
                image.style.setProperty(`--target-y-${positionNumber}`, `${deltaY + pos.offsetY}px`);
                
                // Запускаем анимацию с задержкой для каждой картинки
                setTimeout(() => {
                    image.classList.add('moving-to-trash');
                }, index * 50);
            });
        }

        function confirmDeletion() {
            // Скрываем кнопку
            buttonToTrash.classList.add('hiding');
            
            // Убираем анимацию перемещения и добавляем fade out
            selectedImages.forEach(image => {
                image.classList.add('deleting');
            });
            
            // Ждем окончания анимации картинок (0.4s), затем скрываем корзину
            setTimeout(() => {
                canTop.classList.remove('visible');
                canBottom.classList.remove('visible');
            }, 600);
            
            // Через 2 секунды возвращаем всё к начальному состоянию
            setTimeout(() => {
                resetToInitialState();
            }, 2000);
        }

        function resetToInitialState() {
            // Убираем все анимации и классы
            imageContainers.forEach(container => {
                const checkmark = container.querySelector('.checkmark-in-image');
                const checkmarkContainer = container.querySelector('.checkmark-container');
                const image = container.querySelector('.image-in-can');
                
                checkmark.classList.remove('visible');
                checkmarkContainer.classList.remove('hidden');
                container.classList.remove('faded');
                image.classList.remove('moving-to-trash', 'deleting', 'position-1', 'position-2', 'position-3', 'position-4');
                
                // Удаляем CSS переменные для всех позиций
                for (let i = 1; i <= 4; i++) {
                    image.style.removeProperty(`--target-x-${i}`);
                    image.style.removeProperty(`--target-y-${i}`);
                }
            });
            
            // Возвращаем кнопку к исходному состоянию
            buttonToTrash.classList.remove('visible', 'confirm', 'hiding');
            buttonText.textContent = 'Удалить';
            
            // Сбрасываем состояния
            confirmMode = false;
            selectedImages.clear();
        }
    }

    initTrashAnimation();
});

