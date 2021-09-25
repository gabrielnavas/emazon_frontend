import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getShopPath } from '../../config/routesPath'

import {
  Container,
  Logo,
  Card,
  Form,
  Title,
  FormGroup,
  Label,
  InputText,
  FormInfo,
  ButtonFinish,
  LegalText,
  BarSeparateCard,
  BarSeparatePage,
  LoginOption,
  FooterPage,
  FooterOptions,
  OptionLink,
  Signature
} from './styles'

import { IconInfoForm } from '../../icons'

type FormInfoState = {
  isError?: Boolean
  message?: string
}
const initFormInfoState = () => ({ isError: false, message: '' }) as FormInfoState

const LoginPage = () => {
  const [name, setName] = useState('')
  const [nameMsg, setNameMsg] = useState<FormInfoState>(initFormInfoState())

  const [email, setEmail] = useState('')
  const [emailMsg, setEmailMsg] = useState<FormInfoState>(initFormInfoState())

  const [password, setPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState<FormInfoState>(initFormInfoState())

  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordConfirmationMsg, setPasswordConfirmationMsg] = useState<FormInfoState>(initFormInfoState())

  useEffect(() => {
    setPasswordMsg({
      isError: false,
      message: 'As senhas devem ter pelo menos 6 caracteres.'
    })
  }, [])

  return (
    <Container>
      <Logo>
        <Link href={getShopPath()}>
            Emazon books
        </Link>
      </Logo>
      <Card>
        <Form>
          <Title>Criar conta</Title>
          <FormGroup>
            <Label>Seu nome</Label>
            <InputText value={name} onChange={e => setName(e.target.value)} />
            {
              nameMsg.message &&
                <FormInfo isError={nameMsg.isError} >
                  <IconInfoForm />
                  {nameMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Seu email</Label>
            <InputText />
            {
              emailMsg.message &&
                <FormInfo isError={nameMsg.isError}>
                  <IconInfoForm />
                  {emailMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Senha</Label>
            <InputText />
            {
              passwordMsg.message &&
                <FormInfo isError={nameMsg.isError}>
                  <IconInfoForm />
                  {passwordMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Insira a senha nova mais uma vez</Label>
            <InputText />
            {
              passwordConfirmationMsg.message &&
                <FormInfo isError={nameMsg.isError}>
                  <IconInfoForm />
                  {passwordConfirmationMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <ButtonFinish>Cadastrar</ButtonFinish>
        </Form>
        <LegalText>
          Ao criar uma conta, você concorda com as <span><Link href='#'>Condições de Uso da Emazon.</Link></span>
        </LegalText>
        <BarSeparateCard />
        <LoginOption>
          <span>Você já tem uma conta?</span>
          <span> <Link href='#'>Fazer login</Link></span>
        </LoginOption>
      </Card>
      <BarSeparatePage />
      <FooterPage>
        <FooterOptions>
          <OptionLink>
            <Link href='#'>Condições de Uso</Link>
          </OptionLink>
          <OptionLink>
            <Link href='#'>Politicas de privacidade</Link>
          </OptionLink>
        </FooterOptions>
        <Signature>
          © 2019-2021, Emazon.com, Inc. ou suas afiliadas
        </Signature>
      </FooterPage>
    </Container>
  )
}

export default LoginPage
