import RankUser from './view/rank-user.js';
import GroupMenu from './view/group-menu.js';
import SortingMenu from './view/sorting-menu.js';
import Board from './view/board.js';
import BoardMain from './view/board-main.js';
import FilmList from './view/film-list.js';
import Film from './view/film.js';
import ButtonLoadMore from './view/button-load-more.js';
import PopupFilmDetails from './view/popup-film-details.js';
import {generateFilm} from './mock/film.js';
import {render} from './utils/utils.js';
import {RenderPosition} from './utils/const.js';

const FILMS_COUNT = 20;
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
    popupComponent.getElement().remove();
    popupComponent.removeElement();
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

  popupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    removePopup();
  });

  return popupComponent;
};

const renderFilm = (filmListElement, film) => {
  const filmComponent = new Film(film);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  const elementsClickedOpenPopup = [
    filmComponent.getElement().querySelector(`.film-card__title`),
    filmComponent.getElement().querySelector(`.film-card__poster`),
    filmComponent.getElement().querySelector(`.film-card__comments`)
  ];
  elementsClickedOpenPopup.forEach((item) => {
    item.addEventListener(`click`, () => {
      render(siteFooterElement, renderPopup(film).getElement(), RenderPosition.AFTERBEGIN);
    });
  });
};

if (filmsWatchingCount) {
  render(siteHeaderElement, new RankUser(filmsWatchingCount).getElement(), RenderPosition.BEFOREEND);
}
const board = new Board();
render(siteMainElement, new GroupMenu(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortingMenu().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, board.getElement(), RenderPosition.BEFOREEND);

const boardMain = new BoardMain();
const filmList = new FilmList();
render(board.getElement(), boardMain.getElement(), RenderPosition.BEFOREEND);
render(boardMain.getElement(), filmList.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < films.slice(0, FILMS_ITERATOR).length; i++) {
  renderFilm(filmList.getElement(), films[i]);
}
const buttonLoadMore = new ButtonLoadMore();
render(boardMain.getElement(), buttonLoadMore.getElement(), RenderPosition.BEFOREEND);


buttonLoadMore.getElement().addEventListener(`click`, () => {
  if (renderFilmCount < FILMS_COUNT) {
    let nextFilms = films.slice(renderFilmCount, renderFilmCount + FILMS_ITERATOR);
    for (let i = 0; i < nextFilms.length; i++) {
      render(filmList.getElement(), new Film(nextFilms[i]).getElement(), RenderPosition.BEFOREEND);
    }
    renderFilmCount += FILMS_ITERATOR;
    if (renderFilmCount >= FILMS_COUNT) {
      buttonLoadMore.getElement().remove();
      buttonLoadMore.removeElement();
    }
  }
});

