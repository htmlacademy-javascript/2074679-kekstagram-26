const postsContainerElement = document.querySelector('.pictures');
const postTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

export const renderPosts = (posts) => {
  document.querySelectorAll('.picture').forEach((post) => post.remove());
  const postFragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const newPost = postTemplateElement.cloneNode(true);
    newPost.querySelector('.picture__img').src = post.url;
    newPost.querySelector('.picture__comments').textContent = post.comments.length;
    newPost.querySelector('.picture__likes').textContent = post.likes;
    newPost.dataset.postId = post.id;
    postFragment.append(newPost);
  });
  postsContainerElement.append(postFragment);
};

export const bindPostClickListener = (callback) => {
  postsContainerElement.addEventListener('click', (evt) => {
    const post = evt.target.closest('.picture');
    if (post) {
      callback(post.dataset.postId);
    }
  });
};
