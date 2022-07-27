import { checkIsEscPressed } from './utils.js';

const successModalElement = document.querySelector('#success').content.querySelector('.success');
const successModalCloseButtonElement = successModalElement.querySelector('.success__button');
const errorModalElement = document.querySelector('#error').content.querySelector('.error');
const errorModalCloseButtonElement = errorModalElement.querySelector('.error__button');

export const showModalSuccessFormSubmitted = () => {
  if(!document.querySelector('.success')) {
    document.body.append(successModalElement);
  } else {
    successModalElement.classList.remove('hidden');
  }
  successModalCloseButtonElement.addEventListener('click', hideModal, {once: true});
  window.addEventListener('keydown', escPressHandler, true);
  successModalElement.addEventListener('click', outsideModalClickHandler);
};

export const showModalFailFormSubmitted = () => {
  if(!document.querySelector('.error')) {
    document.body.append(errorModalElement);
  } else {
    errorModalElement.classList.remove('hidden');
  }
  errorModalCloseButtonElement.addEventListener('click', hideModal, {once: true});
  window.addEventListener('keydown', escPressHandler, true);
  errorModalElement.addEventListener('click', outsideModalClickHandler);
};

function hideModal () {
  const modalWindowNotification = document.querySelector('.notification');
  modalWindowNotification.classList.add('hidden');
  window.removeEventListener('keydown', escPressHandler, true);
  successModalElement.removeEventListener('click', outsideModalClickHandler);
  errorModalElement.removeEventListener('click', outsideModalClickHandler);
  successModalCloseButtonElement.removeEventListener('click', hideModal, {once: true});
  errorModalCloseButtonElement.removeEventListener('click', hideModal, {once: true});
}

function escPressHandler (evt) {
  if(checkIsEscPressed(evt)){
    hideModal();
    evt.stopImmediatePropagation();
  }
}

function outsideModalClickHandler (evt) {
  if(!evt.target.closest('.error__inner') && !evt.target.closest('.success__inner')) {
    hideModal();
  }
}

export const showModalFailRenderPosts = () => {
  const renderErrorModalTemplate = document.querySelector('#render-error').content.querySelector('.error');
  document.body.appendChild(renderErrorModalTemplate);
};
