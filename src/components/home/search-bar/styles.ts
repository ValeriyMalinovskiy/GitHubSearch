import {StyleSheet} from 'react-native';
import {flexSample, spacingMedium, spacingThin} from '../../styles/consts';

const searchHeight = 45;

const createStyleSheet = (width: number) => {
  return StyleSheet.create({
    searchBar: {
      ...flexSample,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 1,
      padding: spacingThin,
      color: 'black',
    },
    searchBarContainer: {
      width,
      height: searchHeight + spacingMedium * 2,
      backgroundColor: 'white',
      padding: spacingMedium * 2,
    },
  });
};

export default createStyleSheet;
