const SERVER_API_HOST = 'https://26.javascript.pages.academy/kekstagram';

export const getPostsData = (onSuccess, onFail) => {
  fetch(`${SERVER_API_HOST}/data`)
    .then((response) => response.json())
    .then((posts) => onSuccess(posts))
    .catch(() => {
      onFail();
    });
};

export const sendPostData = (onSuccess, onFail, body) => {
  fetch(SERVER_API_HOST,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    }).catch(() => {
      onFail();
    });
};
