import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38920750-ce35b8fd2527c3f11d87386ea';

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
