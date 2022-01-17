import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { RootStackParamList } from '../../routes/stack.routes';
import theme from '../../styles/theme';

import {
  Container,
  Footer,
  Form,
  Header,
  SubTitle,
  Title
} from './styles';

type SignInScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>

export function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigation = useNavigation<SignInScreenProp>();

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      })

      await schema.validate({ email, password })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Error na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credênciais'
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder='E-mail'
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder='Senha'
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}