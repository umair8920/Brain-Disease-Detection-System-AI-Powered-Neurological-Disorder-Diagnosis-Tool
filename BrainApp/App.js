import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen';
import SidebarNavigator from './SidebarNavigator';
import Authentication from './Authentication';
import AboutScreen from './AboutScreen';
import Alzheimer from './Alzheimer';
import ResultScreen1 from './ResultScreen1';
import Parkinson from './Parkinson';
import ParkinsonResult from './ParkinsonResult';
import Instructions from './Instructions';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{ headerShown: false }}
        />
       
        <Stack.Screen name="SidebarNavigator" component={SidebarNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Alzheimer" component={Alzheimer} options={{ headerShown: false }} />
        <Stack.Screen name="ResultScreen1" component={ResultScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="Parkinson" component={Parkinson} options={{ headerShown: false }} />
        <Stack.Screen name="ParkinsonResult" component={ParkinsonResult} options={{ headerShown: false }} />
        <Stack.Screen name="Instructions" component={Instructions} options={{ headerShown: false }} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
