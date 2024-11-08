import { Redirect, Slot, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/providers/auth';

import {Text } from "react-native-paper"

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { authData, loading, signOut } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }


  if (!authData) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <Slot />
  );
}
