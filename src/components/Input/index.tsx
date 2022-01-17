import React from 'react'
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../../styles/theme';

import {
  Container, 
  IconContainer, 
  InputText
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
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
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest} 
      />
    </Container>
  );
}