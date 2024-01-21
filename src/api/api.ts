import axios from 'axios';
import { PATH } from '../constants/paths';
import { API_KEY } from '../constants/constants';

export const getVolumesByTermsRequest = async (searchString: string, searchOptions: string) => {
  return await axios.get(`${PATH.API_URL}?q=${searchString}${searchOptions}&maxResults=30`);
};

export const getVolumeById = async (id: string) => {
  return await axios.get(`${PATH.API_URL}/${id}?key=${API_KEY}`);
};
