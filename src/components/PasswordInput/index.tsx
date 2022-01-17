import React from 'react'
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../../styles/theme';

import {
  ChangePasswordVisibilityButton,
  Container,
  EyeIconContainer,
  IconContainer,
  InputText
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled ) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
        isFocused={isFocused}
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest} 
      />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
        <EyeIconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </EyeIconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}