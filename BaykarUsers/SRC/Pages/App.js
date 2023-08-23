import React, { useState } from 'react';
import { Button, View, Text , TouchableOpacity, StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './AuthPages/Home';
import RegisterScreen from './AuthPages/RegisterScreen';
import JobScreen from './AuthPages/JobScreen';
import EducationScreen from './AuthPages/EducationScreen';
import LevelScreen from './AuthPages/LevelScreen';
import CVScreen from './AuthPages/CvScreen';

import DashboardScreen from './DashboardScreen';


import UsersTable from '../SqLite/UsersTable';
import SkillsTable from '../SqLite/SkillsTable';
import UserProjectsTable from '../SqLite/UserProjectsTable';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Tab navigator'ın import edilmesi

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Tab navigator'ın oluşturulması

function App() {

  useState(() => {
    // Uygulama başladığında veritabanı ve tablo oluşturulur
    UsersTable.createTable();
    SkillsTable.createTable();
    UserProjectsTable.createTable();
   
    
  },
  );


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="JobScreen" component={JobScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EducationScreen" component={EducationScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="LevelScreen" component={LevelScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="CVScreen" component={CVScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        
        
      </Stack.Navigator>    

      

    </NavigationContainer>
  );
}

export default App;