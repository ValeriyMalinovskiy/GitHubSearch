import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import RootStack from './src/navigation/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <RootStack />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
