import RankUser from './view/rank-user.js';
import GroupMenu from './view/group-menu.js';
import SortingMenu from './view/sorting-menu.js';
import Board from './view/board.js';
import BoardMain from './view/board-main.js';
import FilmList from './view/film-list.js';
import Film from './view/film.js';
import ButtonLoadMore from './view/button-load-more.js';
import PopupFilmDetails from './view/popup-film-details.js';
import NoFilm from './view/no-film.js';
import {generateFilm} from './mock/film.js';
import {render, RenderPosition, remove} from './utils/render.js';

const FILMS_COUNT = 25;
const FILMS_ITERATOR = 5;
let renderFilmCount = FILMS_ITERATOR;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filmsWatchingCount = films.filter(({isWatch}) => isWatch).length;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const renderPopup = (film) => {
  const popupComponent = new PopupFilmDetails(film);
  const body = document.getElementsByTagName(`body`)[0];
  body.classList.add(`hide-overflow`);
  const removePopup = () => {
    remove(popupComponent);
    body.classList.remove(`hide-overflow`);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  document.addEventListener(`keydown`, onEscKeyDown);

  popupComponent.setClosePopupClickHandler(() => {
    removePopup();
  });

  return popupComponent;
};

const renderFilm = (filmListElement, film) => {
  const filmComponent = new Film(film);
  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
  filmComponent.setOpenPopupClickHandler(() => {
    render(siteFooterElement, renderPopup(film), RenderPosition.AFTERBEGIN);
  });
};

if (filmsWatchingCount) {
  render(siteHeaderElement, new RankUser(filmsWatchingCount), RenderPosition.BEFOREEND);
}
const board = new Board();
render(siteMainElement, new GroupMenu(films), RenderPosition.BEFOREEND);
render(siteMainElement, new SortingMenu(), RenderPosition.BEFOREEND);
render(siteMainElement, board, RenderPosition.BEFOREEND);

const boardMain = new BoardMain();
const filmList = new FilmList();
render(board, boardMain, RenderPosition.BEFOREEND);
render(boardMain, filmList, RenderPosition.BEFOREEND);

for (let i = 0; i < films.slice(0, FILMS_ITERATOR).length; i++) {
  renderFilm(filmList, films[i]);
}

if (films.length > FILMS_ITERATOR) {
  const buttonLoadMore = new ButtonLoadMore();
  render(boardMain, buttonLoadMore, RenderPosition.BEFOREEND);


  buttonLoadMore.setClickHandler(() => {
    if (renderFilmCount < FILMS_COUNT) {
      let nextFilms = films.slice(renderFilmCount, renderFilmCount + FILMS_ITERATOR);
      for (let i = 0; i < nextFilms.length; i++) {
        renderFilm(filmList, nextFilms[i]);
      }
      renderFilmCount += FILMS_ITERATOR;
      if (renderFilmCount >= FILMS_COUNT) {
        remove(buttonLoadMore);
      }
    }
  });
}


