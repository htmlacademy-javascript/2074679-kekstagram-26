import { checkIsEscPressed } from './utils.js';

const SHOW_COMMENTS_AMOUNT = 5;

const postContainer = document.querySelector('.big-picture');
const hideModalButton = postContainer.querySelector('#picture-cancel');
const postModalOverlay = document.querySelector('.overlay');
const commentsContainer = postContainer.querySelector('.social__comments');
const commentsCountElement = postContainer.querySelector('.social__comment-count');
const commentsLoadButton = postContainer.querySelector('.comments-loader');

let renderedCommentsCount = 0;
let postComments;

const renderComments = () => {
  let commentList = '';
  const commentsToRender = postComments.slice(renderedCommentsCount, renderedCommentsCount + SHOW_COMMENTS_AMOUNT);
  renderedCommentsCount += commentsToRender.length;
  if (postComments.length === renderedCommentsCount) {
    commentsLoadButton.classList.add('hidden');
  }
  commentsToRender.forEach((comment) => {
    commentList += `
    <li class="social__comment">
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>
    `;
  });
  commentsContainer.insertAdjacentHTML('beforeend', commentList);
  commentsCountElement.innerHTML = `${renderedCommentsCount} из ${postComments.length} комментариев`;
};

const hidePostModal = () => {
  renderedCommentsCount = 0;
  commentsCountElement.innerHTML = '';
  postContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hideModalButton.removeEventListener('click', hidePostModal);
  window.removeEventListener('keydown', escPressHandler);
  postModalOverlay.removeEventListener('click', postModalOverlayClickHandler);
  commentsLoadButton.removeEventListener('click', renderComments);
};

function postModalOverlayClickHandler (evt) {
  if(evt.target === postModalOverlay) {
    return hidePostModal();
  }
}

function escPressHandler (evt) {
  if(checkIsEscPressed(evt)){
    hidePostModal();
  }
}

export const renderPostModal = (post) => {
  postComments = post.comments;
  postContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  postContainer.querySelector('.big-picture__img').querySelector('img').src = post.url;
  postContainer.querySelector('.likes-count').textContent = post.likes;
  postContainer.querySelector('.social__caption').textContent = post.description;
  commentsContainer.innerHTML = '';
  if (post.comments.length > SHOW_COMMENTS_AMOUNT) {
    commentsLoadButton.classList.remove('hidden');
    commentsLoadButton.addEventListener('click', renderComments);
  }
  renderComments();
  window.addEventListener('keydown', escPressHandler);
  hideModalButton.addEventListener('click', hidePostModal);
  postModalOverlay.addEventListener('click', postModalOverlayClickHandler);
};
