import {generateRandomPosts} from './generate-posts.js';
import {renderPosts, bindPostClickListener} from './render-posts.js';
import {renderPostModal} from './render-modal-post.js';
import {createPost} from './create-post.js';

const posts = generateRandomPosts(25);

renderPosts(posts);

bindPostClickListener((postId) => {
  renderPostModal(posts.find((post) => post.id === +postId));
});

createPost();
