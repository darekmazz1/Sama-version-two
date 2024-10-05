import axios from 'axios';

// const ULR_BACKEND = 'http://localhost:1337/api/';
const ULR_BACKEND = 'https://kind-courtesy-production.up.railway.app/api/';

export const GetInformation = async ({ url }) => {
  if (!url) return;
  try {
    const response = await axios.get(`${ULR_BACKEND}${url}`);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
