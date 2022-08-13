import React, * as react from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from './StackParamList';
import Home from '../components/home';
import ProfileScreen from '../components/profile-screen';

const Root = createNativeStackNavigator<StackParamList>();

const RootStack: react.FC = () => {
  return (
    <Root.Navigator>
      <Root.Screen name="HomeScreen" component={Home} />
      <Root.Screen name="ProfileScreen" component={ProfileScreen} />
    </Root.Navigator>
  );
};

export default RootStack;
