// import api from './AxiosConfig';
import queryString from 'query-string';

// const getNews = (params) => {
//   return api.get(`wall.php?${queryString.stringify(params)}`);
// };

// const getCategories = (params) => {
//   return api.get(`wall.php?${queryString.stringify(params)}`);
// };

// const getTop = () => {
//   return api.get('wall.php?func=query&device=iphone&order=download&page=1');
// };


const getNews = async (params) => {
  try {
    // eslint-disable-next-line no-undef
    let response = await fetch(
      `http://149.28.229.28/api/wallpapers/wall.php?${queryString.stringify(params)}`,
    );
    let responseJson = await response.text();
    return JSON.parse(responseJson.replace(/^\s+|\s+$/g, ''));
  } catch (error) {
    // console.log(error);
  }
};

const getCategories = async (params) => {
  try {
    // eslint-disable-next-line no-undef
    let response = await fetch(
      `http://149.28.229.28/api/wallpapers/wall.php?${queryString.stringify(params)}`,
    );
    let responseJson = await response.text();
    return JSON.parse(responseJson.replace(/^\s+|\s+$/g, ''));
  } catch (error) {
    // console.log(error);
  }
};

const getTop = async (params) => {
  try {
    // eslint-disable-next-line no-undef
    let response = await fetch(
      `http://149.28.229.28/api/wallpapers/wall.php?${queryString.stringify(params)}`,
    );
    let responseJson = await response.text();
    return JSON.parse(responseJson.replace(/^\s+|\s+$/g, ''));
  } catch (error) {
    // console.log(error);
  }
};



export default {
  getNews,
  getTop,
  getCategories,
};