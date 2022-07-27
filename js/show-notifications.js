import { checkIsEscPressed } from './utils.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const successModalCloseButtonElement = successModalTemplate.querySelector('.success__button');
const errorModalCloseButtonElement = errorModalTemplate.querySelector('.error__button');

let activeModal;

const hideModal = () => {
  document.body.removeChild(activeModal);
  window.removeEventListener('keydown', escPressHandler, true);
  window.removeEventListener('click', outsideModalClickHandler);
};

function outsideModalClickHandler (evt) {
  if (evt.target === activeModal) {
    hideModal();
  }
}

function escPressHandler(evt) {
  if (checkIsEscPressed(evt)) {
    evt.stopImmediatePropagation();
    hideModal();
  }
}

const bindCommonListeners = () => {
  window.addEventListener('keydown', escPressHandler, true);
  window.addEventListener('click', outsideModalClickHandler);
};

export const showModalSuccessFormSubmitted = () => {
  activeModal = successModalTemplate;
  document.body.appendChild(successModalTemplate);
  successModalTemplate.style.zIndex = 100;
  successModalCloseButtonElement.addEventListener('click', hideModal, { once: true });
  bindCommonListeners();
};

export const showModalFailFormSubmitted = () => {
  activeModal = errorModalTemplate;
  document.body.appendChild(errorModalTemplate);
  errorModalTemplate.style.zIndex = 100;
  errorModalCloseButtonElement.addEventListener('click', hideModal, { once: true });
  bindCommonListeners();
};

export const showModalFailRenderPosts = () => {
  const renderErrorModalTemplate = document.querySelector('#render-error').content.querySelector('.error');
  document.body.appendChild(renderErrorModalTemplate);
  renderErrorModalTemplate.style.zIndex = 100;
};
