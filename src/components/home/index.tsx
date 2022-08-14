import {useNavigation} from '@react-navigation/native';
import React, {FC, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {TStackNavProp} from '../../navigation/NavigationProps';
import {IUser} from '../../types';
import useHomeScreen from './hooks';
import createStyleSheet from './styles';

const Home: FC = () => {
  const navigation = useNavigation<TStackNavProp>();
  const {usersMain, loading} = useHomeScreen();
  const {width} = useWindowDimensions();
  const styles = createStyleSheet(width);

  const goToProfileScreen = useCallback(
    (userMainInfo: IUser) => () =>
      navigation.navigate('ProfileScreen', {login: userMainInfo.login}),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderItem: ListRenderItem<IUser> = ({item}) => {
    const openProfile = goToProfileScreen(item);
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={openProfile}>
        <Image style={styles.avatarImage} source={{uri: item.avatar_url}} />
        <View style={styles.mainInfo}>
          <View style={styles.loginContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {item.login}
            </Text>
          </View>
          <View style={styles.reposContainer}>
            <Text
              style={styles.text}
              numberOfLines={1}
              ellipsizeMode="tail">{`Repo: ${item.public_repos}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.list}>
          <FlatList
            data={usersMain}
            renderItem={renderItem}
            keyExtractor={item => item.login}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
