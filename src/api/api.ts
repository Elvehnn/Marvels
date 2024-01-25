import axios, { AxiosResponse } from 'axios';
import { PATH } from '../constants/paths';
import { API_HASH, API_KEY } from '../constants/constants';
import { Book } from '@/constants/interfaces';

export const getVolumesByTitleRequest = async (searchValue: string, options: string) => {
  const response = await axios.get(
    `${PATH.API_URL}?titleStartsWith=${searchValue}${options}&ts=1&apikey=${API_KEY}&hash=${API_HASH}`
  );

  console.log(response);
  return response;
};

export const getVolumeById = async (id: string) => {
  const response = await axios.get(`${PATH.API_URL}/${id}?ts=1&apikey=${API_KEY}&hash=${API_HASH}`);

  return response;
};

export const getVolumesByIdsArray = async (ids: string[]) => {
  const responsesArray = await axios.all(
    ids.map(async (id) => {
      const response = await axios.get(
        `${PATH.API_URL}/${id}?ts=1&apikey=${API_KEY}&hash=${API_HASH}`
      );
      return response.data.data.results[0];
    })
  );

  console.log(responsesArray);

  return responsesArray;
};
