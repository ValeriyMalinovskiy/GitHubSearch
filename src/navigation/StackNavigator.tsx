import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../components/home/HomeScreen';
import ProfileScreen from '../components/profile-screen/ProfileScreen';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {TStackNavProp} from './NavigationProps';
import {useRoute} from '@react-navigation/native';
import {StackParamList} from './StackParamList';

const Stack = createNativeStackNavigator<StackParamList>();

const Back = ({navigation}: {navigation: TStackNavProp}) => {
  const route = useRoute();
  const {name} = route;
  let goBack: (event: GestureResponderEvent) => void = () => {};
  switch (name) {
    case 'ProfileScreen': {
      goBack = () => navigation.navigate('HomeScreen');
      break;
    }
    default: {
      return <></>;
    }
  }
  return (
    <TouchableOpacity onPress={goBack}>
      <Text>←</Text>
    </TouchableOpacity>
  );
};

const RootStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({navigation}) => {
        return {headerLeft: () => <Back navigation={navigation} />};
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{title: 'GitHub Searcher', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({route}) => ({
          title: route.params.login,
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
