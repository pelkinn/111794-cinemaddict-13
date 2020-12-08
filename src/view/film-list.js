import AbstractView from './abstract';

const createBoardMainTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmList extends AbstractView {
  getTemplate() {
    return createBoardMainTemplate();
  }
}
