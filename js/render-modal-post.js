import { checkIsEscPressed } from './utils.js';

const SHOW_COMMENTS_AMOUNT = 5;

const postContainerElement = document.querySelector('.big-picture');
const hideModalButtonElement = postContainerElement.querySelector('#picture-cancel');
const commentsContainerElement = postContainerElement.querySelector('.social__comments');
const commentsCountElement = postContainerElement.querySelector('.social__comment-count');
const commentsLoadButtonElement = postContainerElement.querySelector('.comments-loader');

let renderedCommentsCount = 0;
let postComments;

const renderCommentsHandler = () => {
  const commentTemplateElement = document.querySelector('#comment').content;
  const commentsToRender = postComments.slice(renderedCommentsCount, renderedCommentsCount + SHOW_COMMENTS_AMOUNT);
  renderedCommentsCount += commentsToRender.length;
  if (postComments.length === renderedCommentsCount) {
    commentsLoadButtonElement.classList.add('hidden');
  }
  const newComments = document.createDocumentFragment();
  commentsToRender.forEach((comment) => {
    const newComment = commentTemplateElement.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    newComments.append(newComment);
  });
  commentsContainerElement.append(newComments);
  commentsCountElement.textContent = `${renderedCommentsCount} из ${postComments.length} комментариев`;
};

const hidePostModalHandler = () => {
  renderedCommentsCount = 0;
  commentsCountElement.textContent = '';
  postContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hideModalButtonElement.removeEventListener('click', hidePostModalHandler);
  window.removeEventListener('keydown', escPressHandler);
  commentsLoadButtonElement.removeEventListener('click', renderCommentsHandler);
};

function escPressHandler (evt) {
  if(checkIsEscPressed(evt)){
    hidePostModalHandler();
  }
}

export const renderPostModal = (post) => {
  postComments = post.comments;
  const renderedComments = commentsContainerElement.querySelectorAll('.social__comment');
  renderedComments.forEach((comment) => comment.remove());
  postContainerElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  postContainerElement.querySelector('.big-picture__img').querySelector('img').src = post.url;
  postContainerElement.querySelector('.likes-count').textContent = post.likes;
  postContainerElement.querySelector('.social__caption').textContent = post.description;
  if (post.comments.length > SHOW_COMMENTS_AMOUNT) {
    commentsLoadButtonElement.classList.remove('hidden');
    commentsLoadButtonElement.addEventListener('click', renderCommentsHandler);
  }
  renderCommentsHandler();
  window.addEventListener('keydown', escPressHandler);
  hideModalButtonElement.addEventListener('click', hidePostModalHandler);
};
