// Массив объектов с данными о проектах
const projects = [
    {
        title: "Название проекта 1",
        description: "Краткое описание проекта 1.",
        image: "Sources/project1.png",
        link: "#"
    },
    {
        title: "Название проекта 2",
        description: "Краткое описание проекта 2.",
        image: "Sources/project2.png",
        link: "#"
    },
    {
        title: "Название проекта 3",
        description: "Краткое описание проекта 3.",
        image: "Sources/project3.png",
        link: "#"
    }
];

// Массив с отзывами
const testimonials = [
    {
        title: "Отзыв 1",
        text: "Этот проект превзошёл все мои ожидания! Отлично выполненная работа и внимание к деталям. Рекомендую всем!",
        author: "Анна Петрова"
    },
    {
        title: "Отзыв 2",
        text: "Прекрасная идея и реализация! Я был впечатлён функциональностью и дизайном. Отличная работа!",
        author: "Сергей Иванов"
    },
    {
        title: "Отзыв 3",
        text: "Очень полезный проект! Он действительно решает важные задачи и делает жизнь проще. Спасибо команде!",
        author: "Екатерина Смирнова"
    }
];

// Функция для загрузки отзывов
function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    
    testimonials.forEach(testimonial => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        const card = document.createElement('div');
        card.className = 'card';
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = testimonial.title;
        
        const text = document.createElement('p');
        text.className = 'card-text';
        text.textContent = testimonial.text;
        
        const author = document.createElement('p');
        author.className = 'card-text';
        author.innerHTML = `<small class="text-muted">— ${testimonial.author}</small>`;
        
        // Собираем элементы в карточку
        cardBody.appendChild(title);
        cardBody.appendChild(text);
        cardBody.appendChild(author);
        card.appendChild(cardBody);
        col.appendChild(card);
        
        // Добавляем карточку в контейнер
        container.appendChild(col);
    });
}

// Функция для добавления проектов в контейнер
function loadProjects() {
    const container = document.getElementById('projects-container');
    
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

// Загружаем проекты при загрузке страницы
// Загружаем отзывы и проекты при загрузке страницы
window.onload = function() {
 //   AOS.init();
    loadTestimonials();
    loadProjects();
    AOS.init();
};
