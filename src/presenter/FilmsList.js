import GroupMenuView from '@/view/group-menu.js';
import SortingMenuView from '@/view/sorting-menu.js';
import BoardView from '@/view/board.js';
import BoardMainView from '@/view/board-main.js';
import FilmListView from '@/view/film-list.js';
import ButtonLoadMoreView from '@/view/button-load-more.js';
import NoFilmView from '@/view/no-film.js';
import FilmPresenter from '@/presenter/Film.js';
import PopupFilmDetailsView from '@/view/popup-film-details.js';
import {render, RenderPosition, remove} from '@/utils/render.js';
import {updateItem} from '@/utils/common.js';

const FILMS_ITERATOR = 5;

export default class FilmsList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILMS_ITERATOR;
    this._filmPresenter = {};

    this._sortingMenuComponent = new SortingMenuView();
    this._boardComponent = new BoardView();
    this._boardMainComponent = new BoardMainView();
    this._filmsListComponent = new FilmListView();
    this._buttonLoadMoreComponent = new ButtonLoadMoreView();
    this._noFilmComponent = new NoFilmView();

    this._handleButtonLoadMoreClick = this._handleButtonLoadMoreClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handlePopupVisibleChange = this._handlePopupVisibleChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._groupMenuComponent = new GroupMenuView(this._films);
    this._renderBoard();
  }

  _handleFilmChange(updateFilm) {
    this._films = updateItem(this._films, updateFilm);
    this._filmPresenter[updateFilm.id].init(updateFilm);
  }

  _handlePopupVisibleChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderGroupMenu() {
    render(this._boardContainer, this._groupMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderSortingMenu() {
    render(this._boardContainer, this._sortingMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderBoardContainer() {
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._boardMainComponent, RenderPosition.BEFOREEND);
    render(this._boardMainComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((item) => render(this._renderFilm(item)));
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_ITERATOR));

    if (this._films.length > FILMS_ITERATOR) {
      this._renderButtonLoadMore();
    }
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsListComponent, this._handleFilmChange, this._handlePopupVisibleChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleButtonLoadMoreClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILMS_ITERATOR);
    this._renderedFilmCount += FILMS_ITERATOR;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._buttonLoadMoreComponent);
    }
  }

  _renderButtonLoadMore() {
    render(this._boardMainComponent, this._buttonLoadMoreComponent, RenderPosition.BEFOREEND);
    this._buttonLoadMoreComponent.setClickHandler(this._handleButtonLoadMoreClick);
  }

  _renderNoFilms() {
    render(this._boardContainer, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    this._renderGroupMenu();

    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }
    this._renderSortingMenu();
    this._renderBoardContainer();
    this._renderFilmsList();
  }
}
