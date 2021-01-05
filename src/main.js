import RankUserPresenter from '@/presenter/RankUser.js';
import {generateFilm} from '@/mock/film.js';
import FilmsListPresenter from '@/presenter/FilmsList';


const FILMS_COUNT = 25;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const filmsBoardPresenter = new FilmsListPresenter(siteMainElement);
const rakUserPresenter = new RankUserPresenter(siteHeaderElement);

filmsBoardPresenter.init(films);
rakUserPresenter.init(films);
