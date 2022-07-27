import { renderPosts, bindPostClickListener } from './render-posts.js';
import { renderPostModal } from './render-modal-post.js';
import { createPost } from './create-post.js';
import { getPostsData } from './api.js';
import { showModalFailRenderPosts } from './show-notifications.js';

getPostsData((posts) => {
  renderPosts(posts);
  bindPostClickListener((postId) => {
    renderPostModal(posts.find((post) => post.id === +postId));
  });
}, showModalFailRenderPosts);

createPost();
