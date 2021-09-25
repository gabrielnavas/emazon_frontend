import { useCallback, useEffect, useState } from 'react'
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
  Signature,
  GlobalErrors
} from './styles'

import { IconInfoForm } from '../../icons'

import * as emailValidator from '../../utils/email'
import { makeEndpointAPI } from '../../config/api'

const GlobalFormError = 'globalFormError'

type FormInfoState = {
  isError?: Boolean
  message?: string
}

type User = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

type UsecaseResult = {
  fieldName: string
  message: string
}

const initFormInfoState = () => ({ isError: false, message: '' }) as FormInfoState

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [nameMsg, setNameMsg] = useState<FormInfoState>(initFormInfoState())

  const [email, setEmail] = useState('')
  const [emailMsg, setEmailMsg] = useState<FormInfoState>(initFormInfoState())

  const [password, setPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState<FormInfoState>(initFormInfoState())

  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordConfirmationMsg, setPasswordConfirmationMsg] = useState<FormInfoState>(initFormInfoState())

  const [globalErrors, setGlobalErrors] = useState<FormInfoState[]>([])

  const [isLoadingForm, setIsLoadingForm] = useState(false)

  useEffect(() => {
    setPasswordMsg({
      isError: false,
      message: 'As senhas devem ter pelo menos 6 caracteres.'
    })
  }, [])

  const handleButtonFinish = useCallback(() => {
    setIsLoadingForm(true)
    const payload = {
      name, email, password, passwordConfirmation
    }
    const result = loginValidationUseCase(payload)
    if (result.length > 0) {
      setErrorsFromValidation(result)
      return
    }

    (async () => {
      try {
        const response = await loginRequestUseCase(payload)
        if (response.statusCode === 201) {
          // move to login
        }
      } catch (e) {
        setGlobalErrors([{ isError: true, message: 'Sem conexão, tente novamente mais tarde.' }])
      }
    })()
  }, [loginValidationUseCase, globalErrors, isLoadingForm, name, email, password, passwordConfirmation])

  const setErrorsFromValidation = useCallback((result: UsecaseResult[]) => {
    for (const msg of result) {
      switch (msg.fieldName) {
        case 'name': setNameMsg({ isError: true, message: msg.message }); break
        case 'email': setEmailMsg({ isError: true, message: msg.message }); break
        case 'password': setPasswordMsg({ isError: true, message: msg.message }); break
        case 'passwordConfirmation': setPasswordConfirmationMsg({ isError: true, message: msg.message }); break
        case GlobalFormError: setGlobalErrors(old => [{ isError: true, message: msg.message }, ...old]); break
      }
    }
    setIsLoadingForm(false)
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
            <InputText isError={nameMsg.isError} value={name} onChange={e => setName(e.target.value)} />
            {
              nameMsg.message.length > 0 &&
                <FormInfo isError={nameMsg.isError} >
                  <IconInfoForm />
                  {nameMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Seu email</Label>
            <InputText isError={emailMsg.isError} value={email} onChange={e => setEmail(e.target.value)} />
            {
              emailMsg.message.length > 0 &&
                <FormInfo isError={emailMsg.isError}>
                  <IconInfoForm />
                  {emailMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Senha</Label>
            <InputText isError={passwordMsg.isError} type='password' value={password} onChange={e => setPassword(e.target.value)} />
            {
              passwordMsg.message.length > 0 &&
                <FormInfo isError={passwordMsg.isError}>
                  <IconInfoForm />
                  {passwordMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Insira a senha nova mais uma vez</Label>
            <InputText isError={nameMsg.isError} type='password' value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
            {
              passwordConfirmationMsg.message.length > 0 &&
                <FormInfo isError={passwordConfirmationMsg.isError}>
                  <IconInfoForm />
                  {passwordConfirmationMsg.message}
                </FormInfo>
            }
          <GlobalErrors>
            {
              globalErrors.map((error, index) => (
                  <FormInfo key={index} isError={error.isError}>
                    <IconInfoForm />
                    {error.message}
                  </FormInfo>
              ))
            }
          </GlobalErrors>
          </FormGroup>
          <ButtonFinish
            disabled={isLoadingForm}
            onClick={e => { e.preventDefault(); handleButtonFinish() }}>
            {isLoadingForm ? 'Aguarde' : 'Cadastrar'}
          </ButtonFinish>
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

export async function getStaticProps (context) {
  return {
    props: { }
  }
}

const loginValidationUseCase = (user: User) => {
  const errors = [] as UsecaseResult[]

  if (user.name.length <= 1 || user.name.length > 100) {
    errors.push({ fieldName: 'name', message: 'Nome deve ter entre 2 e 100 caracteres' })
  }

  if (!emailValidator.validate(user.email)) {
    errors.push({ fieldName: 'email', message: 'Email inválido' })
  }

  if (user.password.length < 6 || user.password.length > 100) {
    errors.push({ fieldName: 'password', message: 'Senha deve ter 6 e 100 caracteres' })
  }

  if (user.passwordConfirmation.length < 6 || user.passwordConfirmation.length > 100) {
    errors.push({
      fieldName: 'passwordConfirmation',
      message: 'Confirmação de Senha deve ter 6 e 100 caracteres'
    })
  }

  if (user.password !== user.passwordConfirmation) {
    errors.push({
      fieldName: GlobalFormError,
      message: 'Verificar senha e confirmacao de senha'
    })
  }

  return errors
}

const loginRequestUseCase = async (user: User): Promise<{statusCode: number}> => {
  const response = await fetch(makeEndpointAPI('register'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return { statusCode: response.status }
}

export default RegisterPage
