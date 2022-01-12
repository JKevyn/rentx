import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation } from '@react-navigation/native';

type SchedulingCompletesScreenProp = NativeStackNavigationProp<RootStackParamList, 'SchedulingComplete'>;

export function SchedulingComplete(){
    const { width } = useWindowDimensions();

    const navigation = useNavigation<SchedulingCompletesScreenProp>();

    function handleConfirm() {
        navigation.navigate('Home')
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <LogoSvg width={width}/>

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro alugado!</Title>
                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel.
                </Message>
                <Footer>
                    <ConfirmButton title="OK" onPress={handleConfirm}/>
                </Footer>
            </Content>
        </Container>
    );
}