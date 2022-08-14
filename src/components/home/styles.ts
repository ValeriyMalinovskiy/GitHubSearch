import {StyleSheet} from 'react-native';

const sampleSpacing = 10;
const photoWidth = 70;
const photoHeight = 50;

const createStyleSheet = (width: number) => {
  const textSectionWidth = width - photoWidth - sampleSpacing * 3;
  return StyleSheet.create({
    main: {flex: 1},
    rowContainer: {
      flexDirection: 'row',
      marginHorizontal: sampleSpacing,
      marginTop: 3,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    mainInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: textSectionWidth,
    },
    reposContainer: {
      width: textSectionWidth * 0.3,
      textAlign: 'left',
      marginRight: sampleSpacing,
    },
    loginContainer: {
      width: textSectionWidth * 0.7,
      marginLeft: sampleSpacing * 2,
    },
    text: {
      color: 'black',
      fontSize: 14,
    },
    avatarImage: {
      height: photoHeight,
      width: photoWidth,
      marginVertical: sampleSpacing * 0.5,
    },
    list: {
      marginBottom: sampleSpacing * 0.5,
    },
  });
};

export default createStyleSheet;
