import { useCallback, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { getRegisterPath, getShopPath } from '../../config/routesPath'

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
  RegisterOption,
  LegalText,
  BarSeparatePage,
  BarSeparateCard,
  FooterPage,
  FooterOptions,
  OptionLink,
  Signature,
  GlobalErrors
} from './styles'

import { IconInfoForm } from '../../icons'

import {
  loginUseCaseFactory,
  UsecaseError,
  errorsTypes
} from '../../usecase/login'
import { PRIMARY_PAGE_SHOP } from '../../components/pages/shop/Navigation'

type FormInfoState = {
  isError?: boolean
  message?: string
}

const initFormInfoState = () => ({ isError: false, message: '' }) as FormInfoState

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [emailMsg, setEmailMsg] = useState<FormInfoState>(initFormInfoState())

  const [password, setPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState<FormInfoState>(initFormInfoState())

  const [globalErrors, setGlobalErrors] = useState<FormInfoState[]>([])

  const [isLoadingForm, setIsLoadingForm] = useState(false)

  const loginUsecase = loginUseCaseFactory()

  const handleButtonFinish = useCallback(() => {
    (async () => {
      setIsLoadingForm(true)
      const payloadForm = {
        email, password
      }
      const errors = await loginUsecase.handle(payloadForm)
      setIsLoadingForm(false)
      if (errors.length > 0) {
        return setErrorsFromValidation(errors)
      }
      Router.push(getShopPath(PRIMARY_PAGE_SHOP.toString()))
    })()
  }, [isLoadingForm, email, password, loginUsecase.handle])

  const setErrorsFromValidation = useCallback((results: UsecaseError[]) => {
    const errors = {
      [errorsTypes.EmailError]: setEmailMsg,
      [errorsTypes.PasswordError]: setPasswordMsg
    }
    results.forEach(result => {
      const useStateGetted = errors[result.fieldName]
      if (useStateGetted) {
        useStateGetted({ isError: true, message: result.message })
      }
      if (result.fieldName === errorsTypes.GlobalError) {
        setGlobalErrors([{ isError: true, message: result.message }])
      }
    })
  }, [errorsTypes])

  return (
    <Container>
      <Logo>
        <Link href={getShopPath(PRIMARY_PAGE_SHOP.toString())}>
            Emazon books
        </Link>
      </Logo>
      <Card>
        <Form>
          <Title>Fazer login</Title>
          <FormGroup>
            <Label>Email</Label>
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
            {isLoadingForm ? 'Aguarde' : 'Logar'}
          </ButtonFinish>
        </Form>
        <LegalText>
          Ao continuar, você concorda com as  <span><Link href='#'>Condições de Uso da Emazon.</Link></span>
        </LegalText>
        <BarSeparateCard />
          <RegisterOption>
            <span>Você não tem uma conta?</span>
            <span> <Link href={getRegisterPath()}>Me registrar</Link></span>
          </RegisterOption>
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

export default LoginPage
