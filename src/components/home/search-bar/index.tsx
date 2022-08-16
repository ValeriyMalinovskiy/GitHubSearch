import React, {FC} from 'react';
import {TextInput, useWindowDimensions, View} from 'react-native';
import {ISearchBarProps} from '../../../types';
import useSearchBar from './hooks';
import createStyleSheet from './styles';

const SearchBar: FC<ISearchBarProps> = ({setUsers}) => {
  const {width} = useWindowDimensions();
  const styles = createStyleSheet(width);
  const {input, updateInput} = useSearchBar(setUsers);

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchBar}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        placeholder="Search for Users"
        onChangeText={updateInput}
        value={input}
      />
    </View>
  );
};

export default SearchBar;
