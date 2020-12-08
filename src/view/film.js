import AbstractView from "./abstract.js";

const getStringValues = (items) => {
  return items.join(`, `);
};

const createFilmTemplate = ({title, poster, snippet, rating, yearCreated, duration, genre, comments, inQueueForViewing, isWatch, favorite}) => {
  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${yearCreated}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${getStringValues(genre)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${snippet}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inQueueForViewing ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatch ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};


export default class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  setOpenPopupClickHandler(callback) {
    this._callback.click = callback;
    const elementsClickedOpenPopup = [
      this.getElement().querySelector(`.film-card__title`),
      this.getElement().querySelector(`.film-card__poster`),
      this.getElement().querySelector(`.film-card__comments`)
    ];

    elementsClickedOpenPopup.forEach((item) => {
      item.addEventListener(`click`, this._clickHandler);
    });
  }
}
