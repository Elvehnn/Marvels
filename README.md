# Библиотека комиксов

Разработать приложение на React + ReduxToolkit / TypeScript. Приложение представляет собой библиотеку комиксов и должно иметь несколько основных страниц: 
Каталог комиксов, с пагинацией и поиском.
Страница с описанием комикса.
Страница избранных комиксов (доступна после авторизации)
Страница купленных комиксов (доступна после авторизации)


API: [Marvel API](https://developer.marvel.com/).

## Функционал

- На странице поиска есть текстовое поле и кнопки ввода и сброса. По введенной пользователем подстроке производится поиск книг. Триггером к поиску является либо нажатие Enter (когда текстовое поле в фокусе), либо нажатие кнопки поиска.
- Найденные книги отображаются карточками, каждая из которых состоит из изображения обложки книги и названия книги. 
- Над блоком с карточками отображается количество найденных по запросу книг.
- Пагинация реализована по принципу 'load more'. Ниже блока с карточками находится кнопка 'Load more', по клику на нее к уже загруженным книгам подгружаются еще. Шаг пагинации по умолчанию - 20.
- При клике на карточку происходит переход на детальную страницу книги, на которой выводятся ее данные: изображение обложки, название, цена, возможность приобрести для авторизованного пользователя.
- Реализована авторизация (логин и пароль необходимо передавать через перменные окружения). Авторизованному пользователю доступна покупка книг, у которых есть цена. А также просмотр купленных экземпляров.

## Реализация

- В проекте использованы React, Redux, Redux Saga, Typescript, Axios
- Во время запросов показываются лоадеры 
- Ошибки обрабатываются и выводятся на экране
- При верстке использованы компоненты MUI и препроцессор Sass

## Скрипты

### `npm start`

Запускает приложение в dev mode.\
[http://localhost:3000](http://localhost:3000) - открыть для просмотра в браузере.

### `npm build`

Собирает приложение для production mode.\
[http://localhost:3000](http://localhost:3000) - открыть для просмотра в браузере.

