import AbstractView from "./abstract.js";

const createNoFilmTemplate = () => {
  return `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`;
};

export default class NoFilm extends AbstractView {
  getTemplate() {
    return createNoFilmTemplate();
  }
}
