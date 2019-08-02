import api from './AxiosConfig';
import queryString from 'query-string';

const getNews = (params) => {
  return api.get(`wall.php?${queryString.stringify(params)}`);
};

const getTop = () => {
  return api.get('wall.php?func=query&device=iphone&order=download&page=1');
};

export default {
  getNews,
  getTop,
};