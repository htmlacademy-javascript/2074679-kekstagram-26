///Task 4.15 - more details
const COMMENTATOR_NAMES = [
  {
    id: 5,
    name: 'Михаил'
  },
  {
    id: 8,
    name: 'Владимир'
  },
  {
    id: 16,
    name: 'Мария'
  },
  {
    id: 29,
    name: 'Константин'
  },
  {
    id: 23,
    name: 'Татьяна'
  },
  {
    id: 12,
    name: 'Наталья'
  },
  {
    id: 87,
    name: 'Анастасия'
  },
  {
    id: 52,
    name: 'Виктория'
  },
  {
    id: 10,
    name: 'Алексей'
  },
  {
    id: 46,
    name: 'Степан'
  }
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_DESCRIPTION = [
  'Lorem ipsum dolor sit amet.',
  'Lorem, ipsum.',
  'Lorem ipsum dolor sit.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  'Lorem.',
  'Lorem ipsum dolor sit amet consectetur.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores.'
];

//Function to generate random integer inclusive
const getRandomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Function to check text for max length
//const checkCommentMaxLength = (text, maxLength) => text.length <= maxLength;

const getRandomElementFromArray = (array) => array[getRandomNumberFromRange(0, array.length-1)];

const getManyRandomElementsFromArray = (array, quantity) => {
  const randomElements = [];
  for(let i = 0; i < quantity; i++) {
    randomElements[i] = getRandomElementFromArray(array);
  }
  return randomElements;
};

const createRandomCommentsMap = (commentsQuantity = 100) => {
  const randomCommentsMap = [];
  for(let i = 0; i < commentsQuantity; i++) {
    const randomCommentator = getRandomElementFromArray(COMMENTATOR_NAMES);
    const randomComment = getRandomElementFromArray(COMMENTS);
    randomCommentsMap.push({
      id: i+1,
      avatar: `img/avatar-${randomCommentator.id}.svg`,
      message: randomComment,
      name: randomCommentator.name
    });
  }
  return randomCommentsMap;
};

const createRandomPhotosMap = (photosQuantity = 25) => {
  const randomPhotosMap = [];
  const randomCommentsMap = createRandomCommentsMap();
  for(let i = 0; i <= photosQuantity-1; i++) {
    const commentsQuantityForPhoto = getRandomNumberFromRange(1, 7); // quntity of comment for 1 post photo
    randomPhotosMap.push({
      id: i+1,
      url: `photos/{{${i+1}}}.jpg`,
      description: getRandomElementFromArray(PHOTO_DESCRIPTION),
      likes: getRandomNumberFromRange(15,200),
      comments: getManyRandomElementsFromArray(randomCommentsMap, commentsQuantityForPhoto)
    });
  }
  return randomPhotosMap;
};

createRandomPhotosMap(25);
