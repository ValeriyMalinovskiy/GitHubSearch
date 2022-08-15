import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TextInput,
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
  const {usersMain, loading, goToProfileScreen, input, setInput} =
    useHomeScreen(navigation);
  const {width} = useWindowDimensions();
  const styles = createStyleSheet(width);

  const renderItem: ListRenderItem<IUser> = ({item, index}) => {
    const openProfile = goToProfileScreen(item);
    return (
      <TouchableOpacity
        style={[styles.rowContainer, !index ? styles.firstItem : {}]}
        onPress={openProfile}>
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
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          placeholder="Search for Users"
          onChangeText={setInput}
          value={input}
        />
      </View>
      {loading ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={styles.listContainer}>
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
