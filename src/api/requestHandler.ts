import axios, {AxiosRequestConfig} from 'axios';
import {IRepo, IUserFull, IUserResults} from '../components/reusable/types';

const gitHubApiUrl = 'https://api.github.com';

export const getAllUsers = async () => {
  const res = await axios.get(`${gitHubApiUrl}/users`);
  return res?.data as IUserFull[];
};

export const getUserRepos = async (userLogin: string) => {
  const res = await axios.get(`${gitHubApiUrl}/users/${userLogin}/repos`);
  return res?.data as IRepo[];
};

export const findUser = async (q: string) => {
  const config: AxiosRequestConfig = {params: {q}};
  const res = await axios.get(`${gitHubApiUrl}/search/users`, config);
  return res?.data as IUserResults;
};
