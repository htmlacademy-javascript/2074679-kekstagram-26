import { checkIsEscPressed } from './utils.js';
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const imageUploadForm = document.querySelector('.img-upload__form');
const postEditorModal = imageUploadForm.querySelector('.img-upload__overlay');
const modalCloseButton = imageUploadForm.querySelector('#upload-cancel');
const imageUploadInput = imageUploadForm.querySelector('#upload-file');
const hashTagInput = imageUploadForm.querySelector('.text__hashtags');
const descriptionInput = imageUploadForm.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const transformHashtagsToArray = (hashtags) => hashtags.replace(/ +/,' ').trim().toLowerCase().split(' ');

const validateHashtags = (hashtags) => {
  if(!hashtags) {
    return true;
  }
  hashtags = transformHashtagsToArray(hashtags);
  return hashtags.every((hashtag) => HASHTAG_REGEXP.test(hashtag));
};

const validateRepeatingHashtags = (hashtags) => {
  hashtags = transformHashtagsToArray(hashtags);
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagsCount = (hashtags) => transformHashtagsToArray(hashtags).length <= MAX_HASHTAGS_COUNT;

const validateCommentMaxLength = (comment) => comment.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashTagInput, validateHashtags, 'Хештег должен начинаться с символа #, не может быть длиннее 20 символов может содержать буквы и цифры');
pristine.addValidator(hashTagInput, validateRepeatingHashtags, 'Хештеги не должны повторяться');
pristine.addValidator(descriptionInput, validateCommentMaxLength, `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`);
pristine.addValidator(hashTagInput, validateHashtagsCount, `Максимальное количество хештегов не может быть более ${MAX_HASHTAGS_COUNT}`);

const closePostEditorModal = () => {
  postEditorModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  pristine.destroy();
  modalCloseButton.removeEventListener('click', closePostEditorModal);
  window.removeEventListener('keydown', handleEscPress);
};

function handleEscPress (evt) {
  if(checkIsEscPressed(evt)) {
    if(evt.target === hashTagInput || evt.target === descriptionInput) {
      return;
    }
    closePostEditorModal();
  }
}

const handleLoadImage = () => {
  postEditorModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  modalCloseButton.addEventListener('click', closePostEditorModal);
  window.addEventListener('keydown', handleEscPress);
};

imageUploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
  hashTagInput.value = hashTagInput.value.trim().toLowerCase();
});

export const createPost = () => imageUploadInput.addEventListener('change', handleLoadImage);
