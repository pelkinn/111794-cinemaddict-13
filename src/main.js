import RankUserPresenter from '@/presenter/rank-user.js';
import {generateFilm} from '@/mock/film.js';
import FilmsListPresenter from '@/presenter/films-list.js';


const FILMS_COUNT = 25;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const filmsBoardPresenter = new FilmsListPresenter(siteMainElement);
const rakUserPresenter = new RankUserPresenter(siteHeaderElement);

filmsBoardPresenter.init(films);
rakUserPresenter.init(films);
