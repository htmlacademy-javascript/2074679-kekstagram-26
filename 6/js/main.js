import {generateRandomPosts} from './generate-posts.js';
import {renderPosts, bindPostClickListener} from './render-posts.js';
import {renderModalPost} from './render-modal-post.js';

const posts = generateRandomPosts(25);

renderPosts(posts);

bindPostClickListener((postId) => {
  renderModalPost(posts.find((post) => post.id === +postId));
});
