import React from "react";
import {StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register, Home, Checklists, Responsibles } from "../views";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Menu() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      useLegacyImplementation={true}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: styles.drawerLabel,
        drawerActiveBackgroundColor: '#299740',
        drawerInactiveTintColor: '#333',
        drawerActiveTintColor: '#FFF'
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Checklists"
        component={Checklists}
        options={{ 
          headerShown: false,
          drawerIcon: ({color}) => (
            <MaterialIcons name="fact-check" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Responsibles"
        component={Responsibles}
        options={{ 
          headerShown: false,
          drawerIcon: ({color}) => (
            <MaterialIcons name="people-alt" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Menu}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerLabel:{
    marginLeft: -25,
    fontSize: 16,
  },
})