import {createElement} from '../utils/utils';

const createBoardMainTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardMainTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}