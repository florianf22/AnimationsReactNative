import faker from 'faker';

const IMAGES = [
  'https://i.ibb.co/zFpBstg/andy-holmes-D6-Tq-Ia-t-WRY-unsplash.jpg',
  'https://i.ibb.co/CKfD8KT/new-2.jpg',
  'https://i.ibb.co/kJkmkmz/3.jpg',
  'https://i.ibb.co/H45mSvV/new-1.jpg',
  'https://i.ibb.co/BqhLwG5/new-3.jpg',
];

const info = [...Array(5).keys()].map((_, index) => ({
  id: index,
  title: faker.lorem.words(3),
  subTitle: faker.lorem.sentences(4),
  fullName: faker.name.findName(),
  position: faker.name.jobTitle(),
  shots: faker.random.number(),
  followers: faker.random.number(),
  following: faker.random.number(),
  avatar: faker.image.avatar(),
  image: IMAGES[index],
}));

console.log(info);

export default info;
