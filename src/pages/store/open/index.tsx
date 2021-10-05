import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { getAccountConfigsPath, getLoginPath, getManagerStorePath } from '../../../config/routesPath'

import {
  errorsTypes,
  UsecaseError,
  openStoreUseCaseFactory
}
  from '../../../usecase/open_store'
import { get as getAuthData } from '../../../usecase/authentication/Usecase'
import * as authenticatorUsecase from '../../../usecase/authentication/Usecase'

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

type FormInfoState = {
  isError?: boolean
  message?: string
}

type toggleCpfOrCnpj = 'cpf' | 'cnpj'

const mask = (str: string, type: toggleCpfOrCnpj) => {
  str = str.replace(/\D/g, '')
  if (type === 'cpf') {
    str = str.replace(/(\d{3})(\d)/, '$1.$2')
    str = str.replace(/(\d{3})(\d)/, '$1.$2')
    str = str.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else if (type === 'cnpj') {
    str = str.replace(/^(\d{2})(\d)/, '$1.$2')
    str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    str = str.replace(/\.(\d{3})(\d)/, '.$1/$2')
    str = str.replace(/(\d{4})(\d)/, '$1-$2')
  }
  return str
}

const initFormInfoState = () => ({ isError: false, message: '' }) as FormInfoState

const RegisterPage = () => {
  const [fantasyName, setFantasyName] = useState('')
  const [fantasyNameMsg, setFantasyNameMsg] = useState<FormInfoState>(initFormInfoState())

  const [toggleCpfOrCnpj, setToggleCpfOrCnpj] = useState<toggleCpfOrCnpj>('cpf')
  const [cpf, setCpf] = useState('')
  const [cpfMsg, setCpfMsg] = useState<FormInfoState>(initFormInfoState())

  const [cnpj, setCnpj] = useState('')
  const [cnpjMsg, setCnpjMsg] = useState<FormInfoState>(initFormInfoState())

  const [globalErrors, setGlobalErrors] = useState<FormInfoState[]>([])

  const [isLoadingForm, setIsLoadingForm] = useState(false)

  const openStoreUsecase = openStoreUseCaseFactory()

  useEffect(() => {
    if (!authenticatorUsecase.isLogged()) {
      Router.replace(getLoginPath())
    }
    if (authenticatorUsecase.hasStore()) {
      Router.replace(getAccountConfigsPath())
    }
  }, [authenticatorUsecase.isLogged, authenticatorUsecase.hasStore])

  const handleChangeCpf = useCallback((str: string) => {
    str = str.replace(/\D/g, '')
    if (str.length <= 11) {
      setCpf(mask(str, 'cpf'))
    }
  }, [cpf, setCpf, mask])

  const handleChangeCnpj = useCallback((str: string) => {
    str = str.replace(/\D/g, '')
    if (str.length <= 14) {
      setCnpj(mask(str, 'cnpj'))
    }
  }, [cnpj, setCnpj, mask])

  const handleButtonFinish = useCallback(() => {
    (async () => {
      const authData = getAuthData()
      setIsLoadingForm(true)
      const payloadForm = {
        fantasyName,
        cpf: toggleCpfOrCnpj === 'cpf' ? cpf : undefined,
        cnpj: toggleCpfOrCnpj === 'cnpj' ? cnpj : undefined
      }
      const errors = await openStoreUsecase.handle(payloadForm, authData.token)
      setIsLoadingForm(false)
      if (errors.length > 0) {
        return setErrorsFromValidation(errors)
      }
      Router.push(getManagerStorePath())
    })()
  }, [isLoadingForm, fantasyName, cpf, cnpj, cnpjMsg, cpfMsg, getAuthData])

  const setErrorsFromValidation = useCallback((results: UsecaseError[]) => {
    const errors = {
      [errorsTypes.fantasyNameError]: setFantasyNameMsg,
      [errorsTypes.cpfError]: setCpfMsg,
      [errorsTypes.cnpjError]: setCnpjMsg
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
      <Header />
      <Card>
        <Form>
          <Title>Abrir loja na plataforma</Title>
          <FormGroup>
            <Label>Nome fantasia</Label>
            <InputText isError={fantasyNameMsg.isError} value={fantasyName} onChange={e => setFantasyName(e.target.value)} />
            {
              fantasyNameMsg.message.length > 0 &&
                <FormInfo isError={fantasyNameMsg.isError}>
                  <IconInfoForm />
                  {fantasyNameMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
          <CpfOrCnpj>
            <select onChange={e => setToggleCpfOrCnpj(e.target.value as toggleCpfOrCnpj)}>
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
            </select>
            {
              toggleCpfOrCnpj === 'cpf'
                ? <>
                  <CpfOrCnpjInput
                    placeholder={'000.000.000-00' as toggleCpfOrCnpj}
                    isError={cpfMsg.isError}
                    type='text'
                    value={cpf}
                    onChange={e => handleChangeCpf(e.target.value)} />
                  {
                    cpfMsg.message.length > 0 &&
                      <FormInfo isError={cpfMsg.isError}>
                        <IconInfoForm />
                        {cpfMsg.message}
                      </FormInfo>
                  }
                </>
                : <>
                  <CpfOrCnpjInput
                    placeholder={'00.000.000/0000-00' as toggleCpfOrCnpj}
                    isError={cnpjMsg.isError}
                    type='text'
                    value={cnpj}
                    onChange={e => handleChangeCnpj(e.target.value)} />
                  {
                    cnpjMsg.message.length > 0 &&
                      <FormInfo isError={cnpjMsg.isError}>
                        <IconInfoForm />
                        {cnpjMsg.message}
                      </FormInfo>
                  }
                  </>
            }
          </CpfOrCnpj>
          </FormGroup>
          <FormGroup>
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

export default RegisterPage
