import {Dispatch, SetStateAction, useCallback, useState} from 'react';
import {useAsyncEffect} from 'use-async-effect';
import {getAllUsers} from '../../api/requestHandler';
import {TStackNavProp} from '../../navigation/NavigationProps';
import {IUser} from '../reusable/types';
import {loadRepos} from '../reusable/helpers';

const useHomeScreen = (
  navigation: TStackNavProp,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const [defaultUsers, setDefaultUsers] = useState<IUser[]>([]);
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const goToProfileScreen = useCallback(
    (userMainInfo: IUser) => () =>
      navigation.navigate('ProfileScreen', {login: userMainInfo.login}),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useAsyncEffect(async () => {
    setLoading(true);
    try {
      const iUsers = await getAllUsers();
      if (iUsers) {
        const usersMainInfoArr = await loadRepos(iUsers);
        setDefaultUsers(usersMainInfoArr);
      }
    } catch (err) {
      console.error('Error on retrieving data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    defaultUsers,
    goToProfileScreen,
    searchResults,
    setSearchResults,
    setShowResults,
    showResults,
  };
};

export default useHomeScreen;
