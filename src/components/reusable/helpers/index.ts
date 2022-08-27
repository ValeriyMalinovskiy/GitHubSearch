import {IUser} from '../types';
import {getUserRepos} from '../../../api/requestHandler';

export const loadRepos = async (iUsers: IUser[]) => {
  const queue = iUsers.map(u => getUserRepos(u.login));
  const iRepos = await Promise.all(queue);
  const mappedResults = iUsers.map(user => {
    const userRepos =
      iRepos.filter(
        repoArr => repoArr && user.login === repoArr[0]?.owner?.login,
      )[0] || [];
    return {...user, public_repos: userRepos.length, repos: userRepos};
  });
  return mappedResults;
};
