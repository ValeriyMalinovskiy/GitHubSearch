import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';
import RootStack from './src/navigation/StackNavigator';

const mainStyle: ViewStyle = {flex: 1};

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={mainStyle}>
        <RootStack />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
