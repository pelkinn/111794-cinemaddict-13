const dayjs = require(`dayjs`);
import {getRandomInteger} from './common';

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

export const generateComments = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);
  return data.slice(0, randomIndex);
};

export const generateId = () => {
  return Date.now() + parseInt(Math.random() * 10000, 10);
};

export const sortByDate = (a, b) => {
  return b.yearCreated - a.yearCreated;
};

export const sortByRating = (a, b) => {
  return b.rating - a.rating;
};
