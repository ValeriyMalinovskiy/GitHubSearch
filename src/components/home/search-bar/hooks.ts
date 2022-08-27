import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {findUser} from '../../../api/requestHandler';
import {IUser} from '../../reusable/types';
import {loadRepos} from '../../reusable/helpers';

const useSearchBar = (
  setSearchResults: Dispatch<SetStateAction<IUser[]>>,
  setShowResults: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (input) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
    const delaySearch = setTimeout(() => {
      if (input) {
        search(input);
      }
    }, 1000);
    return () => clearTimeout(delaySearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const search = async (value: string) => {
    setLoading(true);
    try {
      const res = await findUser(value);
      if (res?.items) {
        const mappedUsers: IUser[] = res.items.map(u => {
          return {...u};
        });
        const usersMainInfoArr = await loadRepos(mappedUsers);
        setSearchResults(usersMainInfoArr);
      }
    } catch (err) {
      console.error('Error on searching user', err);
    } finally {
      setLoading(false);
    }
  };

  return {input, setInput};
};

export default useSearchBar;
