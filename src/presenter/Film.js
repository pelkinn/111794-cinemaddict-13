import FilmView from '@/view/film.js';
import PopupFilmDetailsView from '@/view/popup-film-details';
import {render, RenderPosition, remove, replace} from '@/utils/render.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

const siteBody = document.querySelector(`body`);

export default class Film {
  constructor(filmListContainer, changeData, _changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = _changeMode;
    this._mode = Mode.DEFAULT;

    this._popupFilmDetailsComponent = null;
    this._filmComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._addToWatchlist = this._addToWatchlist.bind(this);
    this._markAsViewed = this._markAsViewed.bind(this);
    this._addToFavorite = this._addToFavorite.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmComponent;
    const prevPopupFilmDetails = this._popupFilmDetailsComponent;

    this._filmComponent = new FilmView(film);
    this._popupFilmDetailsComponent = new PopupFilmDetailsView(film);

    this._filmComponent.setOpenPopupClickHandler(this._openPopup);
    this._filmComponent.setAddToWatchlistClickHandler(this._addToWatchlist);
    this._filmComponent.setMarkAsViewedClickHandler(this._markAsViewed);
    this._filmComponent.setAddToFavoritesClickHandler(this._addToFavorite);

    if (prevFilmComponent === null || prevPopupFilmDetails === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (siteBody.contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (siteBody.contains(prevPopupFilmDetails.getElement())) {
      replace(this._popupFilmDetailsComponent, prevPopupFilmDetails);
      this._popupFilmDetailsComponent.setClosePopupClickHandler(this._closePopup);
    }

    remove(prevFilmComponent);
    remove(prevPopupFilmDetails);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupFilmDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _openPopup() {
    render(siteBody, this._popupFilmDetailsComponent, RenderPosition.BEFOREEND);
    this._popupFilmDetailsComponent.setClosePopupClickHandler(this._closePopup);
    this._popupFilmDetailsComponent.setAddToWatchlistClickHandler(this._addToWatchlist);
    this._popupFilmDetailsComponent.setMarkAsViewedClickHandler(this._markAsViewed);
    this._popupFilmDetailsComponent.setAddToFavoritesClickHandler(this._addToFavorite);
    siteBody.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.POPUP;
  }


  _closePopup() {
    remove(this._popupFilmDetailsComponent);
    siteBody.classList.remove(`hide-overflow`);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _addToWatchlist() {
    this._changeData(Object.assign(
        {},
        this._film,
        {
          inQueueForViewing: !this._film.inQueueForViewing
        }
    ));
  }

  _markAsViewed() {
    this._changeData(Object.assign(
        {},
        this._film,
        {
          isWatch: !this._film.isWatch
        }
    ));
  }

  _addToFavorite() {
    this._changeData(Object.assign(
        {},
        this._film,
        {
          favorite: !this._film.favorite
        }
    ));
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }
}
