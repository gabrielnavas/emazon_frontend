import { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useFormik } from 'formik'

import { getAccountConfigsPath, getLoginPath, getManagerStorePath } from '../../../config/routesPath'

import { validate } from '../../../usecase/open_store/Validation'
import { openStoreHttpRequest } from '../../../usecase/open_store/HttpRequest'

import * as AuthManager from '../../../usecase/authentication/Usecase'

import Header from '../../../components/Header'

import {
  Container,
  Card,
  Form,
  Title,
  FormGroup,
  Label,
  InputText,
  FormInfo,
  CpfOrCnpj,
  CpfOrCnpjInput,
  ButtonFinish,
  LegalText,
  BarSeparatePage,
  FooterPage,
  FooterOptions,
  OptionLink,
  Signature,
  GlobalErrors
} from './styles'

import { IconInfoForm } from '../../../icons'
import { formatCpfCnpj } from '../../../usecase/open_store/FormatFields'
import { updateUserLocalStorage } from '../../../usecase/open_store/LocalStorage'

export type CpfOrCnpjType = 'cpf' | 'cnpj'

export type OpenStoreFormData = {
  fantasyName: string
  cpf?: string
  cnpj?: string
  toggleCpfCnpj: CpfOrCnpjType
}

const OpenStorePage = () => {
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const [globalError, setGlobalError] = useState('')

  useEffect(() => {
    if (!AuthManager.isLogged()) {
      Router.replace(getLoginPath())
    }
    if (AuthManager.hasStore()) {
      Router.replace(getAccountConfigsPath())
    }
  }, [AuthManager.isLogged, AuthManager.hasStore])

  const formik = useFormik({
    initialValues: {
      fantasyName: '',
      cpf: '',
      cnpj: '',
      toggleCpfCnpj: 'cpf'
    } as OpenStoreFormData,
    validate,
    onSubmit: async () => {
      setIsLoadingForm(true)
      const payloadForm = { ...formik.values } as OpenStoreFormData
      const token = AuthManager.get().token
      const result = await openStoreHttpRequest(payloadForm, token)
      setIsLoadingForm(false)
      if (result.error) {
        return setGlobalError(result.error)
      }
      updateUserLocalStorage({
        fantasyName: result.data.fantasyName
      })
      Router.push(getManagerStorePath())
    }
  })

  return (
    <Container>
      <Header />
      <Card>
        <Form>
          <Title>Abrir loja na plataforma</Title>
          <FormGroup>
            <Label>Nome fantasia</Label>
            <InputText
              id='fantasyName'
              name='fantasyName'
              type='text'
              isError={formik.errors.fantasyName}
              value={formik.values.fantasyName}
              onChange={formik.handleChange} />
            {
              formik.errors.fantasyName &&
                <FormInfo isError={formik.errors.fantasyName}>
                  <IconInfoForm />
                  {formik.errors.fantasyName}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
          <CpfOrCnpj>
            <select
              id='toggleCpfCnpj'
              name='toggleCpfCnpj'
              onChange={formik.handleChange}>
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
            </select>
            {
              formik.values.toggleCpfCnpj === 'cpf'
                ? <>
                  <CpfOrCnpjInput
                    id='cpf'
                    name='cpf'
                    type='text'
                    placeholder='000.000.000-00'
                    isError={formik.errors.cpf}
                    value={formik.values.cpf}
                    onChange={e => formatCpfCnpj(e, formik.handleChange, 'cpf')} />
                  {
                    formik.errors.cpf &&
                      <FormInfo isError={formik.errors.cpf}>
                        <IconInfoForm />
                        {formik.errors.cpf}
                      </FormInfo>
                  }
                </>
                : <>
                  <CpfOrCnpjInput
                    id='cnpj'
                    name='cnpj'
                    type='text'
                    placeholder='00.000.000/0000-00'
                    isError={formik.errors.cnpj}
                    value={formik.values.cnpj}
                    onChange={e => formatCpfCnpj(e, formik.handleChange, 'cnpj')} />
                  {
                    formik.errors.cnpj &&
                      <FormInfo isError={formik.errors.cnpj}>
                        <IconInfoForm />
                        {formik.errors.cnpj}
                      </FormInfo>
                  }
                  </>
            }
          </CpfOrCnpj>
          </FormGroup>
          <FormGroup>
            <GlobalErrors>
              {
                globalError && (
                  <FormInfo >
                    <IconInfoForm />
                    {globalError}
                  </FormInfo>
                )
              }
            </GlobalErrors>
          </FormGroup>
          <ButtonFinish
            disabled={isLoadingForm}
            onClick={e => { e.preventDefault(); formik.handleSubmit() }}>
            {isLoadingForm ? 'Aguarde' : 'Abrir loja'}
          </ButtonFinish>
        </Form>
        <LegalText>
          Ao criar uma conta, você concorda com as <span><Link href='#'>Condições de Uso da Emazon.</Link></span>
        </LegalText>
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

export default OpenStorePage
