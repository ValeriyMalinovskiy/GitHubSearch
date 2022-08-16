import {useCallback, useState} from 'react';
import {useAsyncEffect} from 'use-async-effect';
import {getAllUsers, getUserRepos} from '../../api/requestHandler';
import {TStackNavProp} from '../../navigation/NavigationProps';
import {IUser} from '../../types';

const loadRepos = async (iUsers: IUser[]) => {
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

const useHomeScreen = (navigation: TStackNavProp) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const goToProfileScreen = useCallback(
    (userMainInfo: IUser) => () =>
      navigation.navigate('ProfileScreen', {login: userMainInfo.login}),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useAsyncEffect(async () => {
    console.log('running useAsyncEff');
    setLoading(true);
    try {
      const iUsers = await getAllUsers();
      if (iUsers) {
        const usersMainInfoArr = await loadRepos(iUsers);
        setUsers(usersMainInfoArr);
      }
    } catch (err) {
      console.error('Error on retrieving data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {users, loading, goToProfileScreen, setUsers};
};

export default useHomeScreen;
