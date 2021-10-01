import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { getLoginPath, getShopPath } from '../../config/routesPath'

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

import {
  registerUseCaseFactory,
  UsecaseError,
  errorsTypes
} from '../../usecase/register'

type FormInfoState = {
  isError?: boolean
  message?: string
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

  const registerUsecase = registerUseCaseFactory()

  useEffect(() => {
    setPasswordMsg({
      isError: false,
      message: 'As senhas devem ter pelo menos 6 caracteres.'
    })
  }, [])

  const handleButtonFinish = useCallback(() => {
    (async () => {
      setIsLoadingForm(true)
      const payloadForm = {
        name, email, password, passwordConfirmation
      }
      const result = await registerUsecase.handle(payloadForm)
      setIsLoadingForm(false)
      if (result.length > 0) {
        setErrorsFromValidation(result)
        return
      }
      Router.push(getLoginPath())
    })()
  }, [isLoadingForm, name, email, password, passwordConfirmation])

  const setErrorsFromValidation = useCallback((results: UsecaseError[]) => {
    const errors = {
      [errorsTypes.NameError]: setNameMsg,
      [errorsTypes.EmailError]: setEmailMsg,
      [errorsTypes.PasswordError]: setPasswordMsg,
      [errorsTypes.PasswordConfirmationError]: setPasswordConfirmationMsg
    }
    results.forEach(result => {
      const useStateGetted = errors[result.fieldName]
      useStateGetted({ isError: true, message: result.message })
      if (result.fieldName === errorsTypes.GlobalError) {
        setGlobalErrors(old => [{ isError: true, message: result.message }, ...old])
      }
    })
  }, [errorsTypes])

  return (
    <Container>
      <Logo>
        <Link href={getShopPath('0')}>
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
          <span> <Link href={getLoginPath()}>Fazer login</Link></span>
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

export default RegisterPage
