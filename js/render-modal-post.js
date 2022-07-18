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

const getPostComments = (comments) => {
  let commentList = '';
  comments.forEach((comment) => {
    commentList += `
    <li class="social__comment">
    <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
    <p class="social__text">${comment.message}</p>
    </li>
    `;
  });
  bigPictureContainer.querySelector('.social__comments').innerHTML = commentList;
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
  getPostComments(post.comments);

  window.addEventListener('keydown', handleEscPress);
  hideModalButton.addEventListener('click', hideModalPost);
};
