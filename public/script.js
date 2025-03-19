// Массив объектов с данными о проектах
const projects = [
    {
        title: "Название проекта 1",
        description: "Краткое описание проекта 1.",
        image: "/static/Sources/project1.png", // Путь через /static, так как Go использует эту папку
        link: "#"
    },
    {
        title: "Название проекта 2",
        description: "Краткое описание проекта 2.",
        image: "/static/Sources/project2.png",
        link: "#"
    },
    {
        title: "Название проекта 3",
        description: "Краткое описание проекта 3.",
        image: "/static/Sources/project3.png",
        link: "#"
    }
];

// Функция для добавления проектов в контейнер
function loadProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = "";
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-md-4 mb-4';
        
        projectCard.innerHTML = `
            <div class="card" style="height: 450px">
                <img src="${project.image}" class="card-img-top" alt="${project.title}" />
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <a href="${project.link}" target="_blank" class="btn btn-primary">Посмотреть проект</a>
                </div>
            </div>
        `;
        
        container.appendChild(projectCard);
    });
}

// Функция для загрузки отзывов с сервера

function loadProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = "";
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-md-4 mb-4';
        projectCard.innerHTML = `
            <div class="card" style="height: 450px">
                <img src="${project.image}" class="card-img-top" alt="${project.title}" />
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <a href="${project.link}" target="_blank" class="btn btn-primary">Посмотреть проект</a>
                </div>
            </div>
        `;
        container.appendChild(projectCard);
    });
}

async function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    container.innerHTML = "";

    try {
        const response = await fetch('/data');
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const testimonials = await response.json();

        if (!testimonials || testimonials.length === 0) {
            container.innerHTML = '<p>Пока нет отзывов</p>';
            return;
        }

        testimonials.forEach(testimonial => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            col.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${testimonial.name}</h5>
                        <p class="card-text">${testimonial.comment}</p>
                        <p class="card-text"><small class="text-muted">— ${testimonial.email}</small></p>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
        container.innerHTML = `<p>Не удалось загрузить отзывы: ${error.message}</p>`;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

window.onload = function() {
    AOS.init();
    loadProjects();
    loadTestimonials();

    const form = document.getElementById('review-form');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            const message = form.querySelector('#message').value;

            if (!name || !email || !message) {
                alert("Пожалуйста, заполните все поля!");
                return;
            }
            if (!isValidEmail(email)) {
                alert("Пожалуйста, введите корректный email!");
                return;
            }

            const reviewData = { name, email, comment: message };

            try {
                const response = await fetch('/data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reviewData)
                });

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Ответ сервера:', result);

                alert("Отзыв успешно отправлен!");
                form.reset();
                loadTestimonials(); // Обновляем список
            } catch (error) {
                console.error('Ошибка при отправке отзыва:', error);
                alert("Ошибка при отправке отзыва: " + error.message);
            }
        });
    }
};
// Функция валидации email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Обработчик загрузки страницы
window.onload = function() {
    // Инициализация AOS (если вы используете библиотеку анимаций)
    AOS.init();

    // Загрузка проектов и отзывов
    loadProjects();
    loadTestimonials();

    // Обработка отправки формы (если форма существует)
    const form = document.getElementById('review-form'); // Предполагаемый ID формы
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = form.querySelector('#name').value; // Предполагаемые ID полей
            const email = form.querySelector('#email').value;
            const message = form.querySelector('#message').value;

            // Валидация
            if (!name || !email || !message) {
                alert("Пожалуйста, заполните все поля!");
                return;
            }
            if (!isValidEmail(email)) {
                alert("Пожалуйста, введите корректный email!");
                return;
            }

            // Логирование (для тестирования)
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            // Отправка данных на сервер (пример POST-запроса)
            try {
                const response = await fetch('http://localhost:8080/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        comment: message
                    })
                });

                if (!response.ok) {
                    throw new Error('Ошибка при отправке данных');
                }

                alert("Form submitted successfully!");
                form.reset();
                loadTestimonials(); // Обновляем отзывы после отправки
            } catch (error) {
                console.error('Ошибка:', error);
                alert("Ошибка при отправке формы!");
            }
        });
    }
};