import { checkIsEscPressed } from './utils.js';

const hideModalButton = document.querySelector('#picture-cancel');
const bigPictureContainer = document.querySelector('.big-picture');

const hideModalPost = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hideModalButton.removeEventListener('click', hideModalPost);
  window.removeEventListener('keydown', handleEscPress);
};

function handleEscPress (evt) {
  if(checkIsEscPressed(evt)){
    hideModalPost();
  }
}

const renderComments = (comments) => {
  const commentsContainer = bigPictureContainer.querySelector('.social__comments');
  const existMockComments = commentsContainer.querySelectorAll('.social__comment');
  const commentTemplate = existMockComments[0];
  existMockComments.forEach((comment) => comment.remove()); // deleting default comments in html template
  const newComments = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    newComments.append(newComment);
  });
  commentsContainer.append(newComments);
};

export const renderModalPost = (post) => {
  bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureContainer.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPictureContainer.querySelector('.likes-count').textContent = post.likes;
  bigPictureContainer.querySelector('.comments-count').textContent = post.comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = post.description;
  renderComments(post.comments);

  window.addEventListener('keydown', handleEscPress);
  hideModalButton.addEventListener('click', hideModalPost);
};
