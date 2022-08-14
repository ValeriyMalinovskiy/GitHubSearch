import axios from 'axios';
import {IRepo, IUserFull} from '../types';

const gitHubApiUrl = 'https://api.github.com';

export const getAllUsers = async () => {
  const res = await axios.get(`${gitHubApiUrl}/users`);
  return res?.data as IUserFull[];
};

export const getUserRepos = async (userLogin: string) => {
  const res = await axios.get(`${gitHubApiUrl}/users/${userLogin}/repos`);
  return res?.data as IRepo[];
};
