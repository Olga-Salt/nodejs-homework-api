## GoIT Node.js Course Template Homework

Выполните форк этого репозитория для выполнения домашних заданий (2-6)
Форк создаст репозиторий на вашем http://github.com

Добавьте ментора в коллаборацию

Для каждой домашней работы создавайте свою ветку.

- hw02
- hw03
- hw04
- hw05
- hw06

Каждая новая ветка для дз должна делаться с master

После того как вы закончили выполнять домашнее задание в своей ветке, необходимо сделать пулл-реквест (PR). Потом добавить ментора для ревью кода. Только после того как ментор заапрувит PR, вы можете выполнить мердж ветки с домашним заданием в мастер.

Внимательно читайте комментарии ментора. Исправьте замечания и сделайте коммит в ветке с домашним заданием. Изменения подтянуться в PR автоматически после того как вы отправите коммит с исправлениями на github
После исправления снова добавьте ментора на ревью кода.

- При сдаче домашней работы есть ссылка на PR
- JS-код чистый и понятный, для форматирования используется Prettier

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

//

Создай форк репозитория https://github.com/goitacademy/nodejs-homework-template в свой github аккаунт.

Написать REST API для работы с коллекцией контактов. Для работы с REST API используй Postman.

Прочитай внимательно readme в клонированном бойлерплейте, там описан механизм сдачи домашних заданий. Приступай к выполнению ДЗ

Шаг 1
Создай ветку hw02-express из ветки master.

Установи модули командой:

npm i
Следующие модули уже есть в проекте:

express
morgan
cors
Шаг 2
В app.js – веб сервер на express, добавлены прослойки morgan и cors. Начни настраивать раутинг для работы с коллекцией контактов.

REST API должен поддерживать следующие рауты.

@ GET /api/contacts
ничего не получает
вызывает функцию listContacts для работы с json-файлом contacts.json
возвращает массив всех контактов в json-формате со статусом 200
@ GET /api/contacts/:id
Не получает body
Получает параметр id
вызывает функцию getById для работы с json-файлом contacts.json
если такой id есть, возвращает объект контакта в json-формате со статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
@ POST /api/contacts
Получает body в формате {name, email, phone} (все поля обязательны)
Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
@ DELETE /api/contacts/:id
Не получает body
Получает параметр id
вызывает функцию removeContact для работы с json-файлом contacts.json
если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
@ PUT /api/contacts/:id
Получает параметр id
Получает body в json-формате c обновлением любых полей name, email и phone
Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
Шаг 3
Для маршрутов, что принимают данные (POST и PUT), продумайте проверку (валидацию) принимаемых данных. Для валидации принимаемых данных используйте пакет joi

Критерии приема дз #2-6
Создан репозиторий с домашним заданием — REST API приложение
При создании репозитория использован бойлерплейт
Пулл-реквест (PR) с соответствующим дз отправлен ментору в schoology на проверку (ссылка на PR)
Код соответствует техническому заданию проекта
При выполнении кода не возникает необработанных ошибок
Название переменных, свойств и методов начинается со строчной буквы и записываются в нотации CamelCase. Используются английские существительные
Название функции или метода содержит глагол
В коде нет закомментированных участков кода
Проект корректно работает в актуальной LTS-версии Node

Домашнее задание 4
Создайте ветку hw04-auth из ветки master.

Продолжите создание REST API для работы с коллекцией контактов. Добавьте логику аутентификации/авторизации пользователя с помощью JWT.

Шаг 1
В коде создайте схему и модель пользователя для коллекции users.

{
password: {
type: String,
required: [true, 'Password is required'],
},
email: {
type: String,
required: [true, 'Email is required'],
unique: true,
},
subscription: {
type: String,
enum: ["starter", "pro", "business"],
default: "starter"
},
token: {
type: String,
default: null,
},
}
Чтобы каждый пользователь работал и видел только свои контакты в схеме контактов добавьте свойство owner

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }

Примечание: 'user' - название коллекции (в единственном числе), в которой хранятся пользователи.

Шаг 2
Регистрация
Создайте эндпоинт /users/signup

Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.

В случае успешной валидации в модели User создать пользователя по данным которые прошли валидацию. Для засолки паролей используй bcrypt или bcryptjs

Если почта уже используется кем-то другим, вернуть Ошибку Conflict.
В противном случае вернуть Успешный ответ.
Registration request
POST /users/signup
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
Registration validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
Registration conflict error
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
"message": "Email in use"
}
Registration success response
Status: 201 Created
Content-Type: application/json
ResponseBody: {
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}
Логин
Создайте эндпоинт /users/login

В модели User найти пользователя по email.

Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.

В противном случае, сравнить пароль для найденного юзера, если пароли совпадают создать токен, сохранить в текущем юзере и вернуть Успешный ответ.
Если пароль или email неверный, вернуть Ошибку Unauthorized.
Login request
POST /users/login
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
Login validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
Login success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"token": "exampletoken",
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}
Login auth error
Status: 401 Unauthorized
ResponseBody: {
"message": "Email or password is wrong"
}
Шаг 3
Проверка токена
Создайте мидлвар для проверки токена и добавь его ко всем маршрутам, которые должны быть защищены.

Мидлвар берет токен из заголовков Authorization, проверяет токен на валидность.
В случае ошибки вернуть Ошибку Unauthorized.
Если валидация прошла успешно, получить из токена id пользователя. Найти пользователя в базе данных по этому id.
Если пользователь существует и токен совпадает с тем, что находится в базе, записать его данные в req.user и вызвать методnext().
Если пользователя с таким id не существует или токены не совпадают, вернуть Ошибку Unauthorized
Middleware unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
Шаг 4
Логаут
Создайте ендпоинт /users/logout

Добавьте в маршрут мидлвар проверки токена.

В модели User найти пользователя по \_id.
Если пользователя не существует вернуть Ошибку Unauthorized.
В противном случае, удалить токен в текущем юзере и вернуть Успешный ответ.
Logout request
GET /users/logout
Authorization: "Bearer {{token}}"
Logout unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
Logout success response
Status: 204 No Content
Шаг 5
Текущий пользователь - получить данные юзера по токену
Создайте эндпоинт /users/current

Добавьте в маршрут мидлвар проверки токена.

Если пользователя не существует вернуть Ошибку Unauthorized
В противном случае вернуть Успешный ответ
Current user request
GET /users/current
Authorization: "Bearer {{token}}"
Current user unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
Current user success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"email": "example@example.com",
"subscription": "starter"
}
Дополнительное задание - необязательное
Сделать пагинацию для коллекции контактов (GET /contacts?page=1&limit=20).
Сделать фильтрацию контактов по полю избранного (GET /contacts?favorite=true)
Обновление подписки (subscription) пользователя через эндпоинт PATCH /users. Подписка должна иметь одно из следующих значений ['starter', 'pro', 'business']
