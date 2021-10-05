import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useFormik } from 'formik'

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

import { loginHttpRequest } from '../../usecase/login/HttpRequest'
import { validate } from '../../usecase/login/Validation'
import * as AuthenticationManager from '../../usecase/authentication/Usecase'

import { PRIMARY_PAGE_SHOP } from '../../components/pages/shop/Navigation'

export type LoginFormData = {
  email: string
  password: string
}

const EMAIL_OR_PASSWORD_NOT_FOUND = 404
const TOKEN_CREATED = 201

const LoginPage = () => {
  const [globalErrors, setGlobalErrors] = useState('')
  const [isLoadingForm, setIsLoadingForm] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    } as LoginFormData,
    validate,
    onSubmit: async () => {
      setIsLoadingForm(true)
      const payloadForm = { ...formik.values } as LoginFormData

      const result = await loginHttpRequest(payloadForm)
      setIsLoadingForm(false)

      if (result.statusCode === EMAIL_OR_PASSWORD_NOT_FOUND) {
        return setGlobalErrors('Email/senha incorretos')
      }

      if (result.statusCode === TOKEN_CREATED) {
        AuthenticationManager.set({
          token: result.data.token,
          user: {
            email: result.data.user.email,
            fullName: result.data.user.fullName
          },
          store: result.data.store
        })
        Router.push(getShopPath(PRIMARY_PAGE_SHOP.toString()))
      }
    }
  })

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
            <InputText
              id='email'
              name='email'
              type='email'
              isError={formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange} />
            {
              formik.errors.email &&
                <FormInfo isError={formik.errors.email}>
                  <IconInfoForm />
                  {formik.errors.email}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>Senha</Label>
            <InputText
              id='password'
              name='password'
              type='password'
              isError={formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange} />
            {
              formik.errors.password &&
                <FormInfo isError={formik.errors.password}>
                  <IconInfoForm />
                  {formik.errors.password}
                </FormInfo>
            }
            <GlobalErrors>
            {
              globalErrors && (
                <FormInfo>
                    <IconInfoForm />
                    {globalErrors}
                  </FormInfo>
              )
            }
          </GlobalErrors>
          </FormGroup>
          <ButtonFinish
            disabled={isLoadingForm}
            onClick={e => { e.preventDefault(); formik.handleSubmit() }}>
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
