import { checkIsEscPressed } from './utils.js';
import { sendPostData } from './api.js';
import { showModalSuccessFormSubmitted, showModalFailFormSubmitted } from './show-notifications.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_AMOUNT = 5;
const HASHTAG_REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_IMAGE_SCALE = 100;
const MIN_IMAGE_SCALE = 25;
const IMAGE_SCALE_CHANGE_STEP = 25;
const IMAGE_EFFECTS = {
  'effect-none': {
    name: 'none'
  },
  'effect-chrome': {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1
  },
  'effect-sepia': {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1
  },
  'effect-marvin': {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  'effect-phobos': {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  'effect-heat': {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1
  }
};

const imageUploadFormElement = document.querySelector('.img-upload__form');
const formSubmitButtonElement = imageUploadFormElement.querySelector('.img-upload__submit');
const postCreateModalElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const postModalCloseButtonElement = imageUploadFormElement.querySelector('#upload-cancel');
const imageUploadInputElement = imageUploadFormElement.querySelector('#upload-file');
const hashTagInputElement = imageUploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = imageUploadFormElement.querySelector('.text__description');
const changeImageScaleContainerElement = imageUploadFormElement.querySelector('.img-upload__scale');
const effectsListContainer = imageUploadFormElement.querySelector('.effects__list');
const sliderContainerElement = imageUploadFormElement.querySelector('.effect-level');
const effectLevelInputElement = imageUploadFormElement.querySelector('.effect-level__value');
const imageScaleElement = imageUploadFormElement.querySelector('.scale__control--value');
const imageElement = imageUploadFormElement.querySelector('.img-upload__preview img');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  start: 80,
  connect: 'lower',
  step: 1,
  range: {
    'min': 0,
    'max': 100
  }
});

const pristine = new Pristine(imageUploadFormElement, {
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

const validateHashtagsCount = (hashtags) => transformHashtagsToArray(hashtags).length <= MAX_HASHTAGS_AMOUNT;

const validateCommentMaxLength = (comment) => comment.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashTagInputElement, validateHashtags, 'Хештег должен начинаться с символа #, не может быть длиннее 20 символов может содержать буквы и цифры');
pristine.addValidator(hashTagInputElement, validateRepeatingHashtags, 'Хештеги не должны повторяться');
pristine.addValidator(descriptionInputElement, validateCommentMaxLength, `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`);
pristine.addValidator(hashTagInputElement, validateHashtagsCount, `Максимальное количество хештегов не может быть более ${MAX_HASHTAGS_AMOUNT}`);

const changeImageScaleClickHandler = (evt) => {
  let scaleValue = +(imageScaleElement.value.replace('%', ''));
  if(evt.target.closest('.scale__control--smaller') && scaleValue > MIN_IMAGE_SCALE) {
    scaleValue -= IMAGE_SCALE_CHANGE_STEP;
  }
  if(evt.target.closest('.scale__control--bigger') && scaleValue < MAX_IMAGE_SCALE) {
    scaleValue += IMAGE_SCALE_CHANGE_STEP;
  }
  imageElement.style.transform = `scale(${scaleValue / 100})`;
  imageScaleElement.value = `${scaleValue}%`;
};

const changeImageStyle = (effect) => {
  imageElement.classList.add(`effects__preview--${IMAGE_EFFECTS[effect].name}`);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: IMAGE_EFFECTS[effect].min,
      max: IMAGE_EFFECTS[effect].max,
    },
    step: IMAGE_EFFECTS[effect].step,
    start: IMAGE_EFFECTS[effect].max
  });
  sliderElement.noUiSlider.on('update', () => {
    const effectStyle = IMAGE_EFFECTS[effect].style;
    const unitValue = IMAGE_EFFECTS[effect].unit;
    let sliderValue = sliderElement.noUiSlider.get();
    effectLevelInputElement.value = sliderValue;
    if(unitValue) {
      sliderValue += unitValue;
    }
    imageElement.style.filter = `${effectStyle}(${sliderValue})`;
  });
};

const effectListClickHandler = (evt) => {
  imageElement.classList = '';
  imageElement.style.filter = '';
  if(evt.target.value !== IMAGE_EFFECTS['effect-none'].name) {
    sliderContainerElement.classList.remove('hidden');
    changeImageStyle(evt.target.id);
  } else {
    sliderContainerElement.classList.add('hidden');
  }
};

const hidePostCreateModalHandler = () => {
  postCreateModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadFormElement.reset();
  imageElement.style = '';
  imageElement.classList = '';
  sliderContainerElement.classList.add('hidden');
  pristine.reset();
  postModalCloseButtonElement.removeEventListener('click', hidePostCreateModalHandler);
  window.removeEventListener('keydown', escPressHandler);
  changeImageScaleContainerElement.removeEventListener('click', changeImageScaleClickHandler);
  effectsListContainer.removeEventListener('change', effectListClickHandler);
  imageUploadFormElement.removeEventListener('submit', uploadFormSubmitHandler);
};

function escPressHandler (evt) {
  if(checkIsEscPressed(evt)) {
    if(evt.target === hashTagInputElement || evt.target === descriptionInputElement) {
      return;
    }
    hidePostCreateModalHandler();
  }
}

const renderImagePreview = (evt) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    const imagePreviewThumbnailElements = document.querySelectorAll('.effects__preview');
    imageElement.src = fileReader.result;
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
  postModalCloseButtonElement.addEventListener('click', hidePostCreateModalHandler);
  window.addEventListener('keydown', escPressHandler);
  changeImageScaleContainerElement.addEventListener('click', changeImageScaleClickHandler);
  effectsListContainer.addEventListener('change', effectListClickHandler);
  imageUploadFormElement.addEventListener('submit', uploadFormSubmitHandler);
};

function uploadFormSubmitHandler (evt) {
  evt.preventDefault();
  if(pristine.validate()) {
    formSubmitButtonElement.disabled = true;
    sendPostData(
      () => {
        formSubmitButtonElement.disabled = false;
        showModalSuccessFormSubmitted();
        hidePostCreateModalHandler();
      },
      () => {
        formSubmitButtonElement.disabled = false;
        showModalFailFormSubmitted();
      },
      new FormData(evt.target)
    );
  }
}

export const createPost = () => imageUploadInputElement.addEventListener('change', imageUploadHandler);
