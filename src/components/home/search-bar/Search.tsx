import React, {FC} from 'react';
import {TextInput, useWindowDimensions, View} from 'react-native';
import {useLoading} from '../../reusable/hooks';
import {ISearchBarProps} from '../../reusable/types';
import useSearchBar from './hooks';
import createStyleSheet from './styles';

const SearchBar: FC<ISearchBarProps> = ({setSearchResults, setShowResults}) => {
  const {width} = useWindowDimensions();
  const styles = createStyleSheet(width);
  const {setLoading} = useLoading();
  const {input, setInput} = useSearchBar(
    setSearchResults,
    setShowResults,
    setLoading,
  );

  return (
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
  );
};

export default SearchBar;
