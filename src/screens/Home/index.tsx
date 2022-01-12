import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RootStackParamList } from '../../routes/stack.routes';
import { Ionicons } from '@expo/vector-icons';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton,
} from './styles';
import { useTheme } from 'styled-components';

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export function Home() {
    const navigation = useNavigation<homeScreenProp>();
    const theme = useTheme();

    const [cars, setCars] = React.useState<CarDTO[]>([]);
    const [loading, setLoading] = React.useState(true);

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
                    <TotalCars>Total de 12 carros</TotalCars>
                </HeaderContent>
            </Header>
            {loading ? <Load /> :
                <CarList
                    data={cars}
                    keyExtractor={item => String(item)}
                    renderItem={({ item }) =>
                        <Car data={item} onPress={() => handleCarDetails(item)} />
                    }
                />
            }

            <MyCarsButton onPress={handleMyCars}>
                <Ionicons 
                    name="ios-car-sport" 
                    size={32}
                    color={theme.colors.shape}
                />
            </MyCarsButton>
        </Container>
    );
}