import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import MovieSearchResultsScreen from "./src/screens/MovieSearchResultsScreen";
import MovieInfoScreen from "./src/screens/MovieInfoScreen";
import MovieReseñasScreen from "./src/screens/MovieReseñas";


import {ReseñaContextProvider}  from "./src/context/reseñaContext";

import useDatabase from "./src/hooks/useDatabase";
import * as SplashScreen from "expo-splash-screen";
// Crear nuestra navegación basada en stack (pilas)
const Stack = createStackNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useDatabase();

  if(isLoadingComplete) SplashScreen.hideAsync();


  return (
    <View style={{flex:1}} >
        <ReseñaContextProvider>
          <NavigationContainer>
          <Stack.Navigator initialRouteName="movieList">
            <Stack.Screen
              name="movieList"
              component={MovieListScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="movieSearch"
              component={MovieSearchResultsScreen}
              options={{
                title: "Búsqueda",
                headerStyle: {
                  backgroundColor: "#00a5cf",
                },
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="movieInfo"
              component={MovieInfoScreen}
              options={{
                title: "Información",
                headerStyle: {
                  backgroundColor: "#00a5cf",
                },
                headerTintColor: "#fff",
              }}
            />
          <Stack.Screen
              name="movieReseñas"
              component={MovieReseñasScreen}
              options={{
                title: "Reseña",
                headerStyle: {
                  backgroundColor: "#00a5cf",
                },
                headerTintColor: "#fff",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>  
        </ReseñaContextProvider>
    </View>
  );
}
