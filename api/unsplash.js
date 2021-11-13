import axios from 'axios';

const QUERY = 'tech';
const ORIENTATION = 'portrait';

export default axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  params: {
    client_id: 'D49erP7YBtzE4KTh1DvZ5qjEZrTZ-ouoJegowXl5w38',
    query: QUERY,
    orientation: ORIENTATION,
    per_page: 7,
  },
});
