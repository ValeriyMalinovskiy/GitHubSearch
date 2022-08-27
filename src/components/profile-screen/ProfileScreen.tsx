import {useRoute} from '@react-navigation/native';
import React, {FC} from 'react';
import {Text} from 'react-native';
import {TProfileScreenRouteProp} from '../../navigation/RouteProps';

const ProfileScreen: FC = () => {
  const route = useRoute<TProfileScreenRouteProp>();
  const {
    params: {login},
  } = route;
  return <Text>{login}</Text>;
};

export default ProfileScreen;
