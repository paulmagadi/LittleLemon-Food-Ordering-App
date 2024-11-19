import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function Layout() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOnboardingState = async () => {
      try {
        const completed = await AsyncStorage.getItem('isOnboardingCompleted');
        setIsOnboardingCompleted(completed === 'true');
      } catch (error) {
        console.error('Failed to load onboarding state:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOnboardingState();
  }, []);

  if (loading) {
    return null; // Replace with a splash screen or loading indicator if needed
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        options={{ headerShown: false }}
      >
        {() => (
          <OnboardingScreen onComplete={() => setIsOnboardingCompleted(true)} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Your Profile' }}
      />
    </Stack.Navigator>
  );
}
