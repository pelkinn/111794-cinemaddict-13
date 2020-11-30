const dayjs = require(`dayjs`);

import {
  FILM_TITLES,
  FILM_SNIPPETS,
  FILM_POSTERS,
  FILM_GENRES,
  FILM_DIRECTORS,
  FILM_SCREENWRITERS,
  FILM_ACTORS,
  FILM_COUNTRIES,
  FILM_DESCRIPTIONS,
  FILM_COMMENTS
} from './const.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (a = 0, b = 10) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return (lower + Math.random() * (upper - lower + 1)).toFixed(1);
};

export const generateValue = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);

  return items[randomIndex];
};

export const generateUniqueValues = (items) => {
  const str = [];
  for (let i = 0; i < getRandomInteger(1, items.length - 1); i++) {
    str.push(items[Math.floor(Math.random() * items.length)]);
  }
  const unique = new Set(str);

  return Array.from(unique);
};

export const generateDuration = () => {

  const randomDuration = `${getRandomInteger(1, 3)}h ${getRandomInteger(0, 59)}m`;

  return randomDuration;
};

export const generateDate = () => {
  const date = dayjs(`1950`)
    .add(getRandomInteger(0, 12), `month`)
    .add(getRandomInteger(0, 80), `year`);

  return date.format(`d MMMM YYYY`);
};

export const generateComments = () => {
  const randomIndex = getRandomInteger(0, FILM_COMMENTS.length - 1);
  return FILM_COMMENTS.slice(0, randomIndex);
};

export const getRandomBool = () => {
  return !!getRandomInteger();
};

export const generateFilm = () => {
  return {
    title: generateValue(FILM_TITLES),
    poster: generateValue(FILM_POSTERS),
    snippet: generateValue(FILM_SNIPPETS),
    rating: getRandomFloat(0, 9),
    yearCreated: getRandomInteger(1990, 2020),
    duration: generateDuration(),
    genre: generateUniqueValues(FILM_GENRES),
    comments: generateComments(),
    originalTitle: generateValue(FILM_TITLES),
    director: generateValue(FILM_DIRECTORS),
    screenwriter: generateUniqueValues(FILM_SCREENWRITERS),
    actor: generateUniqueValues(FILM_ACTORS),
    releaseDate: generateDate(),
    country: generateValue(FILM_COUNTRIES),
    description: generateValue(FILM_DESCRIPTIONS),
    ageRating: getRandomFloat(0, 18),
    inQueueForViewing: getRandomBool(),
    isWatch: getRandomBool(),
    favorite: getRandomBool()
  };
};
