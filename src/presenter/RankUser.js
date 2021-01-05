import RankUserView from '@/view/rank-user.js';
import {render, RenderPosition, remove} from '@/utils/render.js';

export default class RankUser {
  constructor(container) {
    this._container = container;
  }

  init(films) {
    this._filmsWatchingCount = 0;
    this._films = films;
    this._getCountWatchedFilms();
    this._rankUserComponent = new RankUserView(this._filmsWatchingCount);
    if (this._filmsWatchingCount > 0) {

      render(this._container, this._rankUserComponent, RenderPosition.BEFOREEND);
    }
  }

  _getCountWatchedFilms() {
    this._filmsWatchingCount = this._films.filter(({isWatch}) => isWatch).length;
  }
}
