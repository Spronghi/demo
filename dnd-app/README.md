# dnd-app
This is the backend project of the *dnd-app*, an app that helps you to manage dnd 3.5 characters.  
It's made using Fastify, MongoDB and Redis. The app is built like a monolityc application, but it can easly be splitted into microservices because every modules communicate with the other using Redis.

This app has basically four entities:
 - **CHARACTERS**: this is your character, the final result of this app, the one that you will play and play for;
 - **FEATS**: this are the abilities that a character has. It can gives an increment on basic stats or unique ability that a character can or can't do;
 - **CLASSES**: this are something that a character choose to be. An example could be a Fighter, a Rogue or maybe a Psico-supernatural-elf-ranger, it really depends on how much nerd you are.
 - **EFFECTS**: this is the base of this app. A feat, a character or a class can have it, and it's applied to the target character that has choosen that type of effect. An effect can be an *increment* or an *ability*:
   * an increment is made by a number that specify the value of the increment, or maybe a reference to another stats, a target (ex. *stats.cha*) that specify where the increment will be applied, a type and so on;
   * an ability can't be specified by a number itself, it specifies something that a character can or can't do.

## API
The API are really RESTfull, there's a list and a little overview:
 - **/api/characters** the GET, POST, PUT, DELETE, PATCH requests to manage characters;
 - **/api/classes** the GET, POST, PUT, DELETE, PATCH requests to manage classes. Every class has a **characters** array that specify which character has choosen that class, so you can have all the classes that the character with ID *12345* has just by calling */api/classes?characters=12345"*;
 - **/api/feats** the GET, POST, PUT, DELETE, PATCH requests to manage feats. Every feat has a **characters** array that specify which character has choosen that feat, so you can have all the feats that the character with ID *12345* has just by calling */api/feats?characters=12345"*;

To have a complete overview of the API, just visit the [Swagger](http://localhost:3000/documentation/static/index.html) after running the app.

## How and what to run
Here's the list of execution that you can perform with this project.

### Docker
To run container just run

> docker-compose build

> docker-compose up

> https://dnd-app-h.herokuapp.com

### Run no Docker
To start the application cd on root folder

> npm install

> npm run start

### Lint
To run format and code validations

> npm run lint

To perform code and format fix, run

> npm run fix-lint

### Test
To run test suite

> npm install

> npm run test

## Highlighted files
 - [index.js](./index.js)
 - [suite.js](./suite.js)
 - [fastify-redis](./fastify-redis/index.js)
 - [fastify-mongodb](./fastify-mongodb/index.js)
 - [characters/configs](./characters/configs.js)
 - [characters/decorate](./characters/decorate.js)
 - [characters/dependencies](./characters/dependencies.js)
 - [characters/handlers](./characters/handlers.js)
 - [characters/index](./characters/index.js)
 - [characters/schemas](./characters/schemas.js)
 - [characters/service](./characters/service.js)