import {RankUserList} from '../utils/const.js';
import AbstractView from './abstract';

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

export default class RankUser extends AbstractView {
  constructor(count) {
    super();
    this._countFilms = count;
  }

  getTemplate() {
    return createRankUserTemplate(this._countFilms);
  }
}
