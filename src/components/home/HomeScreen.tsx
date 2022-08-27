import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
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
import {useLoading} from '../reusable/hooks';
import {IUser} from '../reusable/types';
import useHomeScreen from './hooks';
import SearchBar from './search-bar/Search';
import createStyleSheet from './styles';

const Home: FC = () => {
  const navigation = useNavigation<TStackNavProp>();
  const {setLoading, loading} = useLoading();
  const {
    defaultUsers,
    goToProfileScreen,
    searchResults,
    setSearchResults,
    setShowResults,
    showResults,
  } = useHomeScreen(navigation, setLoading);
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
            {!!item.public_repos && (
              <Text
                style={styles.text}
                numberOfLines={1}
                ellipsizeMode="tail">{`Repo: ${item.public_repos}`}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <SearchBar
        setSearchResults={setSearchResults}
        setShowResults={setShowResults}
      />
      {loading ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={showResults ? searchResults : defaultUsers}
            renderItem={renderItem}
            keyExtractor={item => item.login}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
