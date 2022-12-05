import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';

import AuthScreen from './screens/AuthScreen';
import NotesListScreen from './screens/NotesListScreen';
import NoteDetailsScreen from './screens/NoteDetailsScreen';

const Stack = createStackNavigator();

const navTheme = DefaultTheme;
navTheme.colors.background = '#fff';

function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: Platform.OS === 'android' ? 'white' : 'blue',
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
          },
        }}
      >
        <Stack.Screen
          name="Log In Page"
          component={AuthScreen}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notes List"
          component={NotesListScreen}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Note Details"
          component={NoteDetailsScreen}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
