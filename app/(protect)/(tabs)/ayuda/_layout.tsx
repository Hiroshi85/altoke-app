import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Importa las pantallas de lista y de detalles
import TrainingListScreen from './index';
import TrainingDetailScreen from './detalle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Crea el Stack de navegación
const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName="TrainingList">
        {/* Define las pantallas con sus componentes */}
        <Stack.Screen 
          name="TrainingList" 
          component={TrainingListScreen} 
          options={{ title: 'Capacitaciones' }}
        />
        <Stack.Screen 
          name="TrainingDetail" 
          component={TrainingDetailScreen} 
          options={{ title: 'Detalles de Capacitación' }}
        />
      </Stack.Navigator>
  );
};

export default AppNavigator;
