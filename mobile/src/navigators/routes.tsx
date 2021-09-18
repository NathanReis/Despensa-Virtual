import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from '../navigators';

import Home from '../screens/home';
import { Product } from '../screens/product';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                headerMode='none'
                screenOptions={{
                    cardStyle: {
                        backgroundColor: "#f0f0f5"
                    },
                    headerMode: 'screen'
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Navigator" component={Navigator} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;