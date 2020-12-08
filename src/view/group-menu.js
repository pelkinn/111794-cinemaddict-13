import AbstractView from './abstract';

const getCount = (items, field) => {
  return items.filter((item) => item[field]).length;
};

const createGroupMenuTemplate = (data) => {
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getCount(data, `isWatch`)}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getCount(data, `inQueueForViewing`)}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getCount(data, `favorite`)}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class GroupMenu extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createGroupMenuTemplate(this._film);
  }
}
