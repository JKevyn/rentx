import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RootStackParamList } from '../../routes/stack.routes';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './styles';
import { useTheme } from 'styled-components';

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export function Home() {
    const navigation = useNavigation<homeScreenProp>();
    const theme = useTheme();

    const [cars, setCars] = React.useState<CarDTO[]>([]);
    const [loading, setLoading] = React.useState(true);

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },

            ],
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any){
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event){
            positionX.value = event.translationX;
            positionY.value = event.translationY;
        },
        onEnd(){
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car })
    }

    function handleMyCars(car: CarDTO) {
        navigation.navigate('MyCars', { car })
    }

    React.useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, [])

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
    }, [])

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    {!loading &&
                        <TotalCars>Total de {cars.length} carros</TotalCars>
                    }
                </HeaderContent>
            </Header>
            {loading ? <LoadAnimation /> :
                <CarList
                    data={cars}
                    keyExtractor={item => String(item)}
                    renderItem={({ item }) =>
                        <Car data={item} onPress={() => handleCarDetails(item)} />
                    }
                />
            }

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22,
                        }
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
})