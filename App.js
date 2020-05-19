import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Scanner from "./tabs/scanner";
import Favoris from "./tabs/favoris";
import Product from "./tabs/product";

const Tab = createBottomTabNavigator();

export default function App(navigation) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Scanner') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'Product') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        } else if (route.name === 'Favoris') {
                            iconName = focused ? 'ios-star' : 'ios-star';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Scanner" component={Scanner} navigation={navigation} />
                <Tab.Screen name="Product" component={Product} />
                <Tab.Screen name="Favoris" component={Favoris} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
