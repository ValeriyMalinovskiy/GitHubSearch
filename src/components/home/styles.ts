import {StyleSheet} from 'react-native';
import {
  flexSample,
  spacingMedium,
  spacingThin,
} from '../reusable/styles/consts';

const photoWidth = 70;
const photoHeight = 50;

const createStyleSheet = (width: number) => {
  const textSectionWidth = width - photoWidth - spacingMedium * 3;
  return StyleSheet.create({
    main: {
      ...flexSample,
      justifyContent: 'space-between',
    },
    rowContainer: {
      flexDirection: 'row',
      marginHorizontal: spacingMedium,
      marginBottom: spacingThin,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    firstItem: {
      marginTop: spacingThin,
    },
    mainInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: textSectionWidth,
    },
    reposContainer: {
      width: textSectionWidth * 0.3,
      textAlign: 'left',
      marginRight: spacingMedium,
    },
    loginContainer: {
      width: textSectionWidth * 0.7,
      marginLeft: spacingMedium * 2,
    },
    text: {
      color: 'black',
      fontSize: 14,
    },
    avatarImage: {
      height: photoHeight,
      width: photoWidth,
    },
    activityContainer: {...flexSample, justifyContent: 'center'},
    listContainer: {
      ...flexSample,
    },
  });
};

export default createStyleSheet;
