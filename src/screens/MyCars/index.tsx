import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Load } from '../../components/Load';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import theme from '../../styles/theme';

import {
    Appointments,
    AppointmentsQuantity,
    AppointmentsTitle,
    CarFooter,
    CarFooterDate,
    CarFooterPeriod,
    CarFooterTitle,
    CarWrapper,
    Container, Content, Header, SubTitle, Title
} from './styles';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const [cars, setCars] = React.useState<CarProps[]>([]);
    const [loading, setLoading] = React.useState(true);

    const navigation = useNavigation();
    function handleBack() {
        navigation.goBack()
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchCars();
    }, [])

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />
                <BackButton
                    color={theme.colors.shape}
                    onPress={handleBack}
                />

                <Title>
                    Seus agendamentos,{'\n'}
                    estão aqui.
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>

            </Header>
            {loading ? <Load /> :
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>PERÍODO</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={14}
                                            color={theme.colors.text_detail}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                </Content>
            }
        </Container>
    );
}