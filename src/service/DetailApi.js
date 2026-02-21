// import api from './AxiosConfig';
import queryString from 'query-string';

// const getDetail = (params) => {
//   return api.get(`wall.php?${queryString.stringify(params)}`);
// };

const getDetail = async (params) => {
  try {
    // eslint-disable-next-line no-undef
    let response = await fetch(
      `http://149.28.229.28/api/wallpapers/wall.php?${queryString.stringify(params)}`,
    );
    let responseJson = await response.text();
    return JSON.parse(responseJson.replace(/^\s+|\s+$/g, ''));
  } catch (error) {
    console.error(error);
  }
};

export default {
  getDetail,
};