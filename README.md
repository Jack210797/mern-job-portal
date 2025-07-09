# MERN Job Portal 🚀

Проект "Job Portal" — это полноценное веб‑приложение на MERN‑стеке (MongoDB, Express, React, Node.js), предоставляющее функциональность для соискателей и рекрутеров.

---

## 🔍 Возможности

### Для соискателей (Applicants)

- Регистрация и вход пользователей
- Просмотр и редактирование профиля
- Поиск вакансий (фильтрация по ключевым словам, местоположению)
- Отправка откликов на вакансии
- Просмотр откликов и статуса подачи

### Для рекрутеров (Recruiters)

- Регистрация и вход (разделение ролей)
- Создание, редактирование и удаление вакансий
- Просмотр откликов соискателей
- Управление вакансиями и откликами

### Общие функции

- Аутентификация (JWT + защита роутов)
- Валидация форм и обработка ошибок
- REST‑API на Node.js + Express
- Frontend на React с Redux
- Хранение данных в MongoDB

---

### 🧩 Структура проекта

mern-job-portal/
├── server/ # Backend (Node.js + Express)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ └── server.js
│
├── client/ # Frontend (React + Redux)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ ├── services/
│ │ └── App.js
│
├── .gitignore
└── README.md

### Используемые технологии

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Frontend: React, Redux Toolkit, React Router, Axios
- UI: Material‑UI / Bootstrap / Tailwind CSS (указать ваш выбор)
- Инструменты: ESLint, Prettier, concurrently
