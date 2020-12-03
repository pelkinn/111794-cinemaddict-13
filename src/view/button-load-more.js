import {createElement} from '../utils/utils';

const createButtonLoadMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ButtonLoadMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonLoadMoreTemplate();
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
