import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from './MainPages/ProfileScreen';
import ChartWidget from './MainPages/ChartWidget';
import SkillsScreen from './MainPages/SkillsScreen';
import UserProjectsScreen from './MainPages/UserProjectsScreen';





// Tab Navigator oluşturma
const Tab = createBottomTabNavigator();

function DashboardScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'User Projects') {
              iconName = focused ? 'work' : 'work-outline';
            } else if (route.name === 'Skills') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'ChartWidget') {
  iconName = focused ? 'trending-up' : 'trending-down';
}





            // İkonu döndür
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Tab.Screen name="User Projects" component={UserProjectsScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Skills" component={SkillsScreen} options={{ headerShown: false }} />
        <Tab.Screen name="ChartWidget" component={ChartWidget} options={{ headerShown: false }} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
