import AbstractView from "./abstract.js";

const createNoFilmTemplate = () => {
  return `<p class="board__no-tasks">
    No films
  </p>`;
};

export default class NoFilm extends AbstractView {
  getTemplate() {
    return createNoFilmTemplate();
  }
}
