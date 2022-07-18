const postsContainer = document.querySelector('.pictures');

const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPosts = (posts) => {
  const postFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const newPost = postTemplate.cloneNode(true);
    newPost.querySelector('.picture__img').src = post.url;
    newPost.querySelector('.picture__comments').textContent = post.comments.length;
    newPost.querySelector('.picture__likes').textContent = post.likes;
    postFragment.append(newPost);
  });

  postsContainer.append(postFragment);
};

export { renderPosts };
