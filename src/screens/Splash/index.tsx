import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
    Container
} from './styles';

type splashScreenProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>

export function Splash() {
    const splashAnimation = useSharedValue(0);

    const navigation = useNavigation<splashScreenProp>();

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 25, 50], [1, .3, 0]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value, [0, 50], [0, -50], Extrapolate.CLAMP)
                }
            ]
        }
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0], Extrapolate.CLAMP)
                }
            ]
        }
    });

    function startApp() {
        navigation.navigate('Home');
    }

    React.useEffect(() => {
        splashAnimation.value = withTiming(
            50,
            { duration: 1000 },
            () => {
                'worklet'
                runOnJS(startApp)();
            }
        );
    }, []);

    return (
        <Container>
            <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    );
}