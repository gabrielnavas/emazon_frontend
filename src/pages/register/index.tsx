import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { useFormik } from 'formik'

import { getLoginPath, getShopPath } from '../../config/routesPath'

import { httpRequestRegister } from '../../usecase/register/HttpRequest'
import { validate } from '../../usecase/register/Validation'

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

export type RegisterFormData = {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
}

const RegisterPage = () => {
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const [globalErrors, setGlobalErrors] = useState('')

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    } as RegisterFormData,
    validate,
    onSubmit: async () => {
      setIsLoadingForm(true)
      const payloadForm = {
        ...formik.values
      } as RegisterFormData
      const result = await httpRequestRegister(payloadForm)
      setIsLoadingForm(false)
      if (result.statusCode === 400) {
        setGlobalErrors('Já existe uma conta com esse email')
        return
      }
      Router.push(getLoginPath())
    }
  })

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
            <Label>Seu nome completo</Label>
            <InputText
              id="fullName"
              name="fullName"
              type="text"
              isError={formik.errors.fullName}
              value={formik.values.fullName}
              onChange={formik.handleChange} />
            {
              formik.errors.fullName &&
                <FormInfo >
                  <IconInfoForm />
                  {formik.errors.fullName}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Seu email</Label>
            <InputText
              id="email"
              name="email"
              type="email"
              isError={formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange} />
            {
               formik.errors.email &&
               <FormInfo >
                 <IconInfoForm />
                 {formik.errors.email}
               </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Senha</Label>
            <InputText
               id="password"
               name="password"
               type="password"
               isError={formik.errors.password}
               value={formik.values.password}
               onChange={formik.handleChange} />
            {
              formik.errors.password &&
              <FormInfo >
                <IconInfoForm />
                {formik.errors.password}
              </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Insira a senha nova mais uma vez</Label>
            <InputText
               id="passwordConfirmation"
               name="passwordConfirmation"
               type="password"
               isError={formik.errors.passwordConfirmation}
               value={formik.values.passwordConfirmation}
               onChange={formik.handleChange} />
            {
              formik.errors.passwordConfirmation &&
              <FormInfo >
                <IconInfoForm />
                {formik.errors.passwordConfirmation}
              </FormInfo>
            }
            {
              globalErrors && (
                <GlobalErrors>
                  <FormInfo>
                    <IconInfoForm />
                    {globalErrors}
                  </FormInfo>
                </GlobalErrors>
              )
            }
          </FormGroup>
          <ButtonFinish
            disabled={isLoadingForm}
            onClick={e => { e.preventDefault(); formik.handleSubmit() }}>
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
