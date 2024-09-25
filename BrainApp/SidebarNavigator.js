import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo

import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import Alzheimer from './Alzheimer';
import ResultScreen1 from './ResultScreen1';
import Parkinson from './Parkinson';
import ParkinsonResult from './ParkinsonResult';
import Instructions from './Instructions';

const Drawer = createDrawerNavigator();


const SidebarNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerLabel: 'About',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info" color={color} size={size} />
          ),
        }}
      />


  
    


    
    <Drawer.Screen
        name="Predict Parkinson"
        component={Parkinson}
        options={{
          drawerLabel: 'Predict Parkinson',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
          <Drawer.Screen
        name="Predict Alzheimer"
        component={Alzheimer}
        options={{
          drawerLabel: 'Predict Alzheimer',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />


      <Drawer.Screen
        name="Alzheimer Result"
        component={ResultScreen1}
        options={{
          drawerLabel: 'Alzheimer Result',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="visibility" color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Parkinson Result"
        component={ParkinsonResult}
        options={{
          drawerLabel: 'Parkinson Result',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="visibility" color={color} size={size} />
          ),
        }}
      />

        <Drawer.Screen
        name="Instructions To Use App"
        component={Instructions}
        options={{
          drawerLabel: 'Instructions',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" color={color} size={size} />
          ),
        }}
      />
 

      
    </Drawer.Navigator>
    
  );
};

export default SidebarNavigator;

