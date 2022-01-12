import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 34%;

    background-color: ${({ theme }) => theme.colors.header};

    justify-content: center;
    padding: 30px 30px 34px;
    padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(28)}px;

    margin-top: 40px;
`;

export const SubTitle = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    font-size: ${RFValue(15)}px;

    margin-top: 18px;
`;

export const Content = styled.View`
    width: 100%;
    
    padding: 0 16px;
`;

export const Appointments = styled.View`
    width: 100%;
    
    padding: 24px 8px 30px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const AppointmentsTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
    width: 100%;
    margin-bottom: 16px;
`;

export const CarFooter = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background_secondary};

    margin-top: -14px;
    padding: 14px 24px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const CarFooterTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text_detail};
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
    width: 100%;
    
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CarFooterDate = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    font-size: ${RFValue(13)}px;
`;