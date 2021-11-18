import faker from 'faker';
const f = faker.seed(1);

const IMAGES = [
  {
    id: 1,
    uri: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    country: 'Iceland',
  },
  {
    id: 2,
    uri: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=465&q=80',
    country: 'Spain',
  },
  {
    id: 3,
    uri: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=383&q=80',
    country: 'Italy',
  },
  {
    id: 4,
    uri: 'https://images.unsplash.com/photo-1576485375217-d6a95e34d043?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    country: 'South Africa',
  },
  {
    id: 5,
    uri: 'https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    country: 'Japan',
  },
];

const AVATARS = [...Array(6).keys()].map(faker.internet.avatar);

export { IMAGES, AVATARS };
