import {createRankUserTemplate} from './view/rank-user.js';
import {createNavMenuTemplate} from './view/nav-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createBoardMainTemplate} from './view/board-main.js';
import {createFilmTemplate} from './view/film.js';
import {createButtonLoadMoreTemplate} from './view/button-load-more.js';
import {createPopupFilmDetailsTemplate} from './view/popup-film-details';

const FILMS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createRankUserTemplate(), `beforeend`);
render(siteMainElement, createNavMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const filmsBoard = document.querySelector(`.films`);
render(filmsBoard, createBoardMainTemplate(), `beforeend`);

const filmsBoardMain = filmsBoard.querySelector(`.films-list`);
const filmsBoardMainContainer = filmsBoardMain.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsBoardMainContainer, createFilmTemplate(), `beforeend`);
}
render(filmsBoardMain, createButtonLoadMoreTemplate(), `beforeend`);
render(siteFooterElement, createPopupFilmDetailsTemplate(), `afterend`);

