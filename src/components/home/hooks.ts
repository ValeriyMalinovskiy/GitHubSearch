import {useState} from 'react';
import {useAsyncEffect} from 'use-async-effect';
import {getAllUsers, getUserRepos} from '../../api/requestHandler';
import {IUser} from '../../types';

const useHomeScreen = () => {
  const [usersMain, setUsersMain] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setLoading(true);
    try {
      const iUsers = await getAllUsers();
      if (iUsers) {
        const queue = iUsers.map(u => getUserRepos(u.login));
        const iRepos = await Promise.all(queue);
        const usersMainInfoArr = iUsers.map(user => {
          const userRepos =
            iRepos.filter(
              repoArr => repoArr && user.login === repoArr[0]?.owner?.login,
            )[0] || [];
          return {
            avatar_url: user.avatar_url,
            email: user.email,
            location: user.location,
            login: user.login,
            created_at: user.created_at,
            followers: user.followers,
            following: user.following,
            public_repos: userRepos.length,
            repos: userRepos,
          };
        });
        setUsersMain(usersMainInfoArr);
      }
    } catch (err) {
      console.error('Error on retrieving data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {usersMain, loading};
};

export default useHomeScreen;
