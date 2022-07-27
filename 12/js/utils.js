const ESC_KEY = 'Escape';
const DEBOUNCE_DELAY = 500;

export const checkIsEscPressed = (evt) => evt.key === ESC_KEY;

export const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), DEBOUNCE_DELAY);
  };
};
