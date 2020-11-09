# dnd-app-frontend
A mind-blowing dnd 3.5 frontend project made with [Nuxt.js](https://nuxtjs.org)

It basically has three pages: characters, classes and feats.
  - *CHARACTERS*: it's the page where all the characters are located;
  - *FEATS*: it's the page where all the stored feats are located. A **feat** is a feature that a character can take at a certain point if some prerequisites are fullfilled. It usually gives an increment on basic stats (+2 INT untyped) or an ability to do something (you can super-jump three times per day);
  - *CLASSES*: it's the page where all the classes are stored. A **class** determinate basically how your character act and how it behaves and do the things. It has a progress (level 1, 2, 3, 4, etc..) and some bonus or ability that (usually) every level gives to the character.

## Docker
There is a docker-compose file that run the frontend and will expect to find the backend on **http://dnd-app/**.  

To execute it just run:

```bash
docker-compose build  
docker-compose up
```

## Highlighted files
 - [Increment.vue](./components/Increment.vue)
 - [Minimized.vue](./components/Minimized.vue)
 - [Pinned.vue](./components/Pinned.vue)
 - [CharacterFeats.vue](./components/character/CharacterFeats.vue)