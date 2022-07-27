import { renderPosts, bindPostClickListener } from './render-posts.js';
import { renderPostModal } from './render-modal-post.js';
import { createPost } from './create-post.js';
import { getPostsData } from './api.js';
import { showModalFailRenderPosts } from './show-notifications.js';
import { POSTS_FILTER, filterPosts, showFiltersMenu, bindFilterClickListener } from './filter-posts.js';

getPostsData((posts) => {
  showFiltersMenu();
  filterPosts(POSTS_FILTER['filter-default'].filter, posts, renderPosts);
  bindFilterClickListener(posts, renderPosts);
  bindPostClickListener((postId) => {
    renderPostModal(posts.find((post) => post.id === +postId));
  });
}, showModalFailRenderPosts);

createPost();
