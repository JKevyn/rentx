import React from 'react'
import { StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer
} from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface Params {
    car: CarDTO;
}

type CarDetailsScreenProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;

export function CarDetails() {
    const navigation = useNavigation<CarDetailsScreenProp>();
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
        console.log(event.contentOffset.y)
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        }
    });

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car })
    }
    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <Animated.View style={[headerStyleAnimation]}>
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>

                <CarImages>
                    <ImageSlider
                        imagesUrl={car.photos}
                    />
                </CarImages>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    padding: 24,
                    // alignItems: 'center',
                    paddingTop: getStatusBarHeight(),
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
                </Accessories>

                <About>{car.about}</About>

            </Animated.ScrollView>

            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
            </Footer>

        </Container>
    );
}