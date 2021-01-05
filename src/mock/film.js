
import {getRandomInteger, getRandomFloat, generateUniqueValues, generateValue, getRandomBool} from '@/utils/common.js';
import {generateDuration, generateDate, generateComments, generateId} from '@/utils/film.js';
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

export const generateFilm = () => {
  return {
    id: generateId(),
    title: generateValue(FILM_TITLES),
    poster: generateValue(FILM_POSTERS),
    snippet: generateValue(FILM_SNIPPETS),
    rating: getRandomFloat(0, 9),
    yearCreated: getRandomInteger(1990, 2020),
    duration: generateDuration(),
    genre: generateUniqueValues(FILM_GENRES),
    comments: generateComments(FILM_COMMENTS),
    originalTitle: generateValue(FILM_TITLES),
    director: generateValue(FILM_DIRECTORS),
    screenwriters: generateUniqueValues(FILM_SCREENWRITERS),
    actors: generateUniqueValues(FILM_ACTORS),
    releaseDate: generateDate(),
    country: generateValue(FILM_COUNTRIES),
    description: generateValue(FILM_DESCRIPTIONS),
    ageRating: getRandomFloat(0, 18),
    inQueueForViewing: getRandomBool(),
    isWatch: getRandomBool(),
    favorite: getRandomBool()
  };
};
