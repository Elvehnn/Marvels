# Самостоятельный проект.

Разработать React-приложение поиска книг с помощью Google Books API. Документация: https://developers.google.com/books/docs/v1/using.
Для авторизации запросов к API выбрать способ с предоставлением API key (https://developers.google.com/books/docs/v1/using#APIKey).

### [Деплой](https://google-books-search-v2.netlify.app/)

## Функционал

- Должны быть текстовое поле и кнопка поиска. По введенной пользователем подстроке производится поиск книг. Триггером к поиску является либо нажатие Enter (когда текстовое поле в фокусе), либо нажатие кнопки поиска.
- Фильтрация по категориям. Ниже текстового поля располагается селект с категориями: all, art, biography, computers, history, medical, poetry. Если выбрано "all" (выбрано изначально), то поиск производится по всем категориям.
- Сортировка. Рядом с селектом категорий находится селект с вариантами сортировки: relevance (выбран изначально), newest.
- Найденные книги отображаются карточками, каждая из которых состоит из изображения обложки книги, названия книги, названия категории и имен авторов. Если для книги приходит несколько категорий, то отображается только первая. Авторы отображаются все. Если не приходит какой-либо части данных, то вместо нее просто пустое место.
- Над блоком с карточками отображается количество найденных по запросу книг.
- Пагинация реализована по принципу 'load more'. Ниже блока с карточками находится кнопка 'Load more', по клику на нее к уже загруженным книгам подгружаются еще. Шаг пагинации - 30.
- При клике на карточку происходит переход на детальную страницу книги, на которой выводятся ее данные: изображение обложки, название, все категории, все авторы, описание.

### Примерный вид приложения

![image](https://user-images.githubusercontent.com/70837634/177598778-67572cda-2c5f-445c-a611-a5ba19931552.png)
![image](https://user-images.githubusercontent.com/70837634/177598809-6a79d1d0-6777-4b0e-a49b-61a33a0625d0.png)

## Реализация

- Использование React, Redux, Redux Saga, Typescript, Axios, React Testing Library
- Во время запросов показываются лоадеры и дизейблятся кнопки
- Ошибки обрабатываются и выводятся в удобном формате
- При верстке использованы компоненты MUI и препроцессор Sass
- Unit-тесты на некоторые компоненты
- Возможен запуск в docker-контейнере (см. инструкцию ниже)

## Скрипты

### `npm start`

Запускает приложение в dev mode.\
[http://localhost:3000](http://localhost:3000) - открыть для просмотра в браузере.

## Запуск в Docker container

### `docker-compose up`

Запустит nginx и клиентский сервис. В будущем будет добавлен SSR\
[http://localhost:3000](http://localhost:3000) - открыть для просмотра в браузере.
