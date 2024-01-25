import axios from 'axios';
import { PATH } from '../constants/paths';
import { API_HASH, API_KEY } from '../constants/constants';

export const getVolumesByTitleRequest = async (searchValue: string, options: string) =>
  await axios.get(
    `${PATH.API_URL}?titleStartsWith=${searchValue}${options}&ts=1&apikey=${API_KEY}&hash=${API_HASH}`
  );
export const getVolumeById = async (id: string) =>
  await axios.get(`${PATH.API_URL}/${id}?ts=1&apikey=${API_KEY}&hash=${API_HASH}`);

export const getVolumesByIdsArray = async (ids: string[]) =>
  await axios.all(
    ids.map(async (id) => {
      const response = await axios.get(
        `${PATH.API_URL}/${id}?ts=1&apikey=${API_KEY}&hash=${API_HASH}`
      );
      return response.data.data.results[0];
    })
  );
