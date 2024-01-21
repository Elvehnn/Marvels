import axios from 'axios';
import { PATH } from '../constants/paths';
import { API_HASH, API_KEY } from '../constants/constants';

export const getVolumesByTermsRequest = async (searchString: string, searchOptions: string) => {
  const response = await axios.get(`${PATH.API_URL}?ts=1&apikey=${API_KEY}&hash=${API_HASH}`);

  console.log(response);
  return response;
};

export const getVolumeById = async (id: string) => {
  const response = await axios.get(`${PATH.API_URL}/${id}?ts=1&apikey=${API_KEY}&hash=${API_HASH}`);
  console.log(response);
  return response;
};
