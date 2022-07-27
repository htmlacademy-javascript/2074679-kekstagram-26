import { debounce } from './utils.js';

const RANDOM_POSTS_AMOUNT = 10;

export const POSTS_FILTER = {
  'filter-default': {
    filter: 'default'
  },
  'filter-random': {
    filter: 'random'
  },
  'filter-discussed': {
    filter: 'discussed'
  }
};

let activeFilter;

const filterMenuContainerElement = document.querySelector('.img-filters');
const filterMunuFormElement = document.querySelector('.img-filters__form');

export const showFiltersMenu = () => filterMenuContainerElement.classList.remove('img-filters--inactive');

const getRandomPosts = (posts) => posts.slice().sort(() => Math.random()-0.5).slice(0, RANDOM_POSTS_AMOUNT);

const getDiscussedPosts = (posts) => posts.slice().sort((postA, postB) => postB.comments.length - postA.comments.length);

export const filterPosts = (filter, posts, onFilterComplete) => {
  if(filter === activeFilter) {
    return;
  }
  activeFilter = filter;
  let filteredPosts;

  switch(filter) {
    case POSTS_FILTER['filter-random'].filter:
      filteredPosts = getRandomPosts(posts);
      break;
    case POSTS_FILTER['filter-discussed'].filter:
      filteredPosts = getDiscussedPosts(posts);
      break;
    case POSTS_FILTER['filter-default'].filter:
      filteredPosts = posts;
      break;
  }

  onFilterComplete(filteredPosts);
};

const changeFilterHandler = debounce(filterPosts);

export const bindFilterClickListener = (posts, onFilterComplete) => {
  filterMunuFormElement.addEventListener('click', (evt) => {
    const filter = POSTS_FILTER[evt.target.id].filter;
    if(filter) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      changeFilterHandler(filter, posts, onFilterComplete);
    }
  });
};
