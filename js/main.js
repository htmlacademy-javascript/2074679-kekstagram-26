import {generateRandomPosts} from './generate-posts.js';
import {renderPosts} from './render-posts.js';

renderPosts(generateRandomPosts(25));
