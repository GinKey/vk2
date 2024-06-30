# VK Cinema

VK Cinema - это веб-приложение для поиска и фильтрации фильмов с использованием API. Приложение позволяет пользователям искать фильмы, фильтровать их по жанру, рейтингу и году выпуска, а также просматривать подробную информацию о фильме.

## Начало работы

Эти инструкции помогут вам запустить проект на локальной машине для целей разработки и тестирования.

### Предварительные требования

Убедитесь, что у вас установлены следующие программные компоненты:

- [Node.js](https://nodejs.org/en/download/) (версия 12 или выше)
- [npm](https://www.npmjs.com/get-npm) (обычно устанавливается вместе с Node.js)

### Установка

1. Клонируйте репозиторий на локальную машину:

    ```sh
    git clone https://github.com/GinKey/vk2.git
    ```

2. Перейдите в директорию проекта:

    ```sh
    cd vk2
    ```

3. Установите зависимости:

    ```sh
    npm install
    ```
### Настройка API ключа

Приложение использует API ключ для доступа к API. Убедитесь, что у вас есть действующий API ключ. Бесплатный ключ предоставляет 200 тысяч запросов. Чтобы заменить ключ на ваш собственный, выполните следующие шаги:

1. Получите API ключ на сайте https://kinopoisk.dev.

2.  Скопируйте файл `.env.default` в `.env`:

    ```sh
    cp .env.default .env
    ```
    Откройте файл `.env` и добавьте в него ваш API ключ:

    ```env
    REACT_APP_API_KEY=ваш_апи_ключ
    ```

3. Убедитесь, что файл `.env` добавлен в `.gitignore`, чтобы он не был закоммичен в репозиторий:

    ```gitignore
    .env
    ```
   
### Запуск приложения

1. Запустите сервер разработки:

    ```sh
    npm start
    ```

2. Откройте браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000), чтобы увидеть приложение.

## Использование

### Главная страница

На главной странице вы можете:
- Использовать фильтры для поиска фильмов по жанру, рейтингу и году выпуска.
- Нажимать на кнопку "Apply Filters", чтобы применить выбранные фильтры.
- Просматривать список фильмов и переходить на страницу с подробной информацией о фильме, нажав на название фильма.

### Страница деталей фильма

На странице деталей фильма отображается:
- Постер фильма.
- Название фильма.
- Описание фильма.
- Год выпуска.
- Рейтинг.
- Дата премьеры.
- Жанры фильма.

## Структура проекта

- `src/`
    - `components/`
        - `MovieList.js` - Компонент для отображения списка фильмов.
        - `MovieDetails.js` - Компонент для отображения деталей фильма.
        - `Logo.js` - Компонент для отображения логотипа.
    - `services/`
        - `api.js` - Модуль для взаимодействия с API.
    - `App.js` - Основной компонент приложения.
    - `index.js` - Точка входа в приложение.
    - `styles.css` - Основные стили для приложения.
    - `MovieDetails.css` - Стили для страницы деталей фильма.

## Развертывание

Для развертывания проекта на продакшн сервере выполните следующую команду:

```sh
npm run build

