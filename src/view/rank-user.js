import {RankUserList} from '../utils/const.js';
import {createElement} from '../utils/utils';

const getRank = (count) => {
  let i = ``;
  if (count >= 1 && count <= 10) {
    i = 0;
  } else if (count >= 11 && count <= 20) {
    i = 1;
  } else if (count > 20) {
    i = 2;
  }
  return RankUserList[i];
};

const createRankUserTemplate = (count) => {
  return `<section class="header__profile profile">
      <p class="profile__rating">${getRank(count)}</p>
      <img class="profile__avatar" src="./images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class RankUser {
  constructor(count) {
    this._element = null;
    this._countFilms = count;
  }

  getTemplate() {
    return createRankUserTemplate(this._countFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    // console.log(this._element);
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
