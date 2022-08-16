import {Dispatch, SetStateAction, useState} from 'react';
import {findUser} from '../../../api/requestHandler';
import {IUser} from '../../../types';

const useSearchBar = (setUsers: Dispatch<SetStateAction<IUser[]>>) => {
  const [input, setInput] = useState<string>('');
  const updateInput = async (value: string) => {
    setInput(value);
    try {
      const res = await findUser(value);
      if (res?.items) {
        const mappedUsers: IUser[] = res.items.map(u => {
          return {...u};
        });
        setUsers(mappedUsers);
      }
    } catch (err) {
      console.error('Error on searching user', err);
    }
  };
  return {input, updateInput};
};

export default useSearchBar;
