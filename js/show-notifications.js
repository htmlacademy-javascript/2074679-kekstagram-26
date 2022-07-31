import { checkIsEscPressed } from './utils.js';

const MODAL_TEMPLATES = {
  success: {
    name: 'success'
  },
  error: {
    name: 'error'
  }
};

let activeModal;

const hideModal = () => {
  document.body.removeChild(activeModal);
  activeModal.removeEventListener('click', modalClickHandler);
  window.removeEventListener('keydown', escPressHandler, true);
};

function modalClickHandler (evt) {
  const modalCloseButtonElement = activeModal.querySelector('.close-modal__button');
  if(evt.target === activeModal || evt.target === modalCloseButtonElement) {
    hideModal();
  }
}

const showModal = (modalTemplate) => {
  activeModal = document.querySelector(`#${modalTemplate.name}`).content.querySelector(`.${modalTemplate.name}`).cloneNode(true);
  document.body.append(activeModal);
  activeModal.addEventListener('click', modalClickHandler);
  window.addEventListener('keydown', escPressHandler, true);
};

export const showModalSuccessFormSubmitted = () => {
  showModal(MODAL_TEMPLATES.success);
};

export const showModalFailFormSubmitted = () => {
  showModal(MODAL_TEMPLATES.error);
};

function escPressHandler (evt) {
  if(checkIsEscPressed(evt)) {
    evt.stopImmediatePropagation();
    hideModal();
  }
}

export const showModalFailRenderPosts = () => {
  const renderErrorModalTemplate = document.querySelector('#render-error').content.querySelector('.error');
  document.body.appendChild(renderErrorModalTemplate);
};
