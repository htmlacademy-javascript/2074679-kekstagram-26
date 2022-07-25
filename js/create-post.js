import { checkIsEscPressed } from './utils.js';
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_IMAGE_SCALE = 100;
const MIN_IMAGE_SCALE = 25;
const IMAGE_SCALE_CHANGE_STEP = 25;
const IMAGE_FILTERS = {
  'effect-chrome': {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'effect-sepia': {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'effect-marvin': {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  'effect-phobos': {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  'effect-heat': {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  }
};

const imageUploadFormElement = document.querySelector('.img-upload__form');
const previewImageElement = imageUploadFormElement.querySelector('.img-upload__preview img');
const postCreateModalElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const modalCloseButtonElement = imageUploadFormElement.querySelector('#upload-cancel');
const imageUploadInputElement = imageUploadFormElement.querySelector('#upload-file');
const hashTagInputElement = imageUploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = imageUploadFormElement.querySelector('.text__description');
const decreaseScaleButtonElement = document.querySelector('.scale__control--smaller');
const increaseScaleButtonElement = document.querySelector('.scale__control--bigger');
const effectsListContainer = document.querySelector('.effects__list');
const sliderContainerElement = document.querySelector('.effect-level');
const imageScaleElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');

const pristine = new Pristine(imageUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

noUiSlider.create(sliderElement, {
  start: 80,
  connect: 'lower',
  step: 1,
  range: {
    'min': 0,
    'max': 100
  }
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

pristine.addValidator(hashTagInputElement, validateHashtags, 'Хештег должен начинаться с символа #, не может быть длиннее 20 символов может содержать буквы и цифры');
pristine.addValidator(hashTagInputElement, validateRepeatingHashtags, 'Хештеги не должны повторяться');
pristine.addValidator(descriptionInputElement, validateCommentMaxLength, `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`);
pristine.addValidator(hashTagInputElement, validateHashtagsCount, `Максимальное количество хештегов не может быть более ${MAX_HASHTAGS_COUNT}`);

const increaseScaleButtonElementClickHandler = () => {
  let scaleValue = Number(imageScaleElement.value.replace('%', ''));
  if(scaleValue === MAX_IMAGE_SCALE) {
    return;
  }
  scaleValue += IMAGE_SCALE_CHANGE_STEP;
  imageElement.style.transform = `scale(${scaleValue / 100})`;
  imageScaleElement.value = `${scaleValue}%`;
};

const decreaseScaleButtonElementClickHandler = () => {
  let scaleValue = Number(imageScaleElement.value.replace('%', ''));
  if(scaleValue === MIN_IMAGE_SCALE) {
    return;
  }
  scaleValue -= IMAGE_SCALE_CHANGE_STEP;
  imageElement.style.transform = `scale(${scaleValue / 100})`;
  imageScaleElement.value = `${scaleValue}%`;
};

const getEffectParams = (effect) => IMAGE_FILTERS[effect];

const changeImageStyle = (effect) => {
  imageElement.classList.add(`effects__preview--${effect.replace('effect-', '')}`);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: getEffectParams(effect).min,
      max: getEffectParams(effect).max,
    },
    step: getEffectParams(effect).step,
    start: getEffectParams(effect).max
  });
  sliderElement.noUiSlider.on('update', () => {
    const effectStyle = getEffectParams(effect).style;
    const unitValue = getEffectParams(effect).unit;
    let sliderValue = sliderElement.noUiSlider.get();
    if(unitValue) {
      sliderValue += unitValue;
    }
    imageElement.style.filter = `${effectStyle}(${sliderValue})`;
  });
};

const effectListClickHandler = (evt) => {
  imageElement.removeAttribute('class');
  imageElement.style.removeProperty('filter');
  if(evt.target.id !== 'effect-none') {
    sliderContainerElement.classList.remove('hidden');
    changeImageStyle(evt.target.id);
  } else {
    sliderContainerElement.classList.add('hidden');
  }
};

const closePostCreateModal = () => {
  postCreateModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadFormElement.reset();
  previewImageElement.removeAttribute('style');
  previewImageElement.removeAttribute('class');
  sliderContainerElement.classList.add('hidden');
  pristine.destroy();
  modalCloseButtonElement.removeEventListener('click', closePostCreateModal);
  window.removeEventListener('keydown', escPressHandler);
  increaseScaleButtonElement.removeEventListener('click', increaseScaleButtonElementClickHandler);
  decreaseScaleButtonElement.removeEventListener('click', decreaseScaleButtonElementClickHandler);
  effectsListContainer.removeEventListener('change', effectListClickHandler);
};

function escPressHandler (evt) {
  if(checkIsEscPressed(evt)) {
    if(evt.target === hashTagInputElement || evt.target === descriptionInputElement) {
      return;
    }
    closePostCreateModal();
  }
}

const renderImagePreview = (evt) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    const imagePreviewThumbnailElements = document.querySelectorAll('.effects__preview');
    previewImageElement.src = fileReader.result;
    imagePreviewThumbnailElements.forEach((thumbnail) => {
      thumbnail.style.backgroundImage = `url('${fileReader.result}')`;
    });
  };
  fileReader.readAsDataURL(evt.target.files[0]);
};

const imageUploadHandler = (evt) => {
  postCreateModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderImagePreview(evt);
  modalCloseButtonElement.addEventListener('click', closePostCreateModal);
  window.addEventListener('keydown', escPressHandler);
  increaseScaleButtonElement.addEventListener('click', increaseScaleButtonElementClickHandler);
  decreaseScaleButtonElement.addEventListener('click', decreaseScaleButtonElementClickHandler);
  effectsListContainer.addEventListener('change', effectListClickHandler);
};

imageUploadFormElement.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

export const createPost = () => imageUploadInputElement.addEventListener('change', imageUploadHandler);
