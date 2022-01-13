import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createNativeStackNavigator();

export type RootStackParamList = {
    Home: any;
    CarDetails: any;
    Scheduling: any;
    SchedulingDetails: any;
    SchedulingComplete: any;
    MyCars: any;
    Splash: any;
  };

export function StackRoutes(){
    return (
        <Navigator initialRouteName="Splash">
            <Screen 
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Screen 
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
             <Screen 
                name="CarDetails"
                component={CarDetails}
                options={{ headerShown: false }}
                key="CarDetails"
            />
             <Screen 
                name="Scheduling"
                component={Scheduling}
                options={{ headerShown: false }}
            />
             <Screen 
                name="SchedulingDetails"
                component={SchedulingDetails}
                options={{ headerShown: false }}
            />
             <Screen 
                name="SchedulingComplete"
                component={SchedulingComplete}
                options={{ headerShown: false }}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
                options={{ headerShown: false }}
            />
        </Navigator>
    )
}