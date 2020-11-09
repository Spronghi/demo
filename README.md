# Overview
This is my dream project! A web application with high usability in mind. The goal is to build a simple, user friendly management system for Dungeons and Dragons 3.5 characters, campaigns and fights. The frontend is written using Nuxt.js and Vuetify; the backend is micro services oriented and is written in javascript using Node.js and Fastify.

PS. Sorry if some libraries are deprecated, but this project is a little bit old.

## Current state
The idea was nice but I didn't had a lot of time to dedicate to this project. I implemented a character visualizer that calculate a character bonus, feats, checks and skills, nice I think!

## Start with docker compose
I built a *docker-compose.yml* file to run the project easly. It initializes the database, starts the backend and the frontend so you can navigate with easy.  

To run the project just run:

```bash
docker-compose build  
docker-compose up
```

The backend will be available at [localhost:3000](http://localhost:3000/), Swagger will be available at [localhost:3000/documentation](http://localhost:3000/documentation) and frontend will be available at [localhost:8080](http://localhost:8080/).

## Review the code
In every root folder there is a **README** file that explains how to execute that part of the project lonely and the purpose of that part of the project. In every **README** file there is a list of files that I highlighted and commented by myself to give you an idea of my coding style.  

I hopes you like it!
