import {createRankUserTemplate} from './view/rank-user.js';
import {createGroupMenuTemplate} from './view/group-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createBoardMainTemplate} from './view/board-main.js';
import {createFilmTemplate} from './view/film.js';
import {createButtonLoadMoreTemplate} from './view/button-load-more.js';
import {createPopupFilmDetailsTemplate} from './view/popup-film-details.js';
import {generateFilm} from './mock/film.js';

const FILMS_COUNT = 20;
const FILMS_ITERATOR = 5;
let index = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filmsWatchingCount = films.filter(({isWatch}) => isWatch).length;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

if (filmsWatchingCount) {
  render(siteHeaderElement, createRankUserTemplate(filmsWatchingCount), `beforeend`);
}
render(siteMainElement, createGroupMenuTemplate(films), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const filmsBoard = document.querySelector(`.films`);
render(filmsBoard, createBoardMainTemplate(), `beforeend`);

const filmsBoardMain = filmsBoard.querySelector(`.films-list`);
const filmsBoardMainContainer = filmsBoardMain.querySelector(`.films-list__container`);

for (let i = 0; i < films.slice(0, FILMS_ITERATOR).length; i++) {
  render(filmsBoardMainContainer, createFilmTemplate(films[i]), `beforeend`);
}
render(filmsBoardMain, createButtonLoadMoreTemplate(), `beforeend`);
// render(siteFooterElement, createPopupFilmDetailsTemplate(films[0]), `afterend`);

const buttonLoadMoreFilms = document.querySelector(`.films-list__show-more`);
buttonLoadMoreFilms.addEventListener(`click`, () => {
  if (index < FILMS_COUNT) {
    let nextFilms = films.slice(index, index + FILMS_ITERATOR);
    for (let i = 0; i < nextFilms.length; i++) {
      render(filmsBoardMainContainer, createFilmTemplate(nextFilms[i]), `beforeend`);
    }
    index += FILMS_ITERATOR;
    if (index >= FILMS_COUNT) {
      buttonLoadMoreFilms.style.display = `none`;
    }
  }
});

