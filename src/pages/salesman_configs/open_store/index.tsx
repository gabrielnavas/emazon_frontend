import { useCallback, useState } from 'react'
import Link from 'next/link'

import {
  Container,
  Card,
  Form,
  Title,
  FormGroup,
  Label,
  InputText,
  FormInfo,
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

import { errorsTypes, UsecaseError, openStoreUseCaseFactory } from '../../../usecase/open_store'

type FormInfoState = {
  isError?: boolean
  message?: string
}

const initFormInfoState = () => ({ isError: false, message: '' }) as FormInfoState

const RegisterPage = () => {
  const [fantasyName, setFantasyName] = useState('')
  const [fantasyNameMsg, setFantasyNameMsg] = useState<FormInfoState>(initFormInfoState())

  const [cpf, setCpf] = useState('')
  const [cpfMsg, setCpfMsg] = useState<FormInfoState>(initFormInfoState())

  const [cnpj, setCnpj] = useState('')
  const [cnpjMsg, setCnpjMsg] = useState<FormInfoState>(initFormInfoState())

  const [globalErrors, setGlobalErrors] = useState<FormInfoState[]>([])

  const [isLoadingForm, setIsLoadingForm] = useState(false)

  const openStoreUsecase = openStoreUseCaseFactory()

  const handleButtonFinish = useCallback(() => {
    (async () => {
      setIsLoadingForm(true)
      const payloadForm = {
        fantasyName, cpf, cnpj
      }
      const result = await openStoreUsecase.handle(payloadForm)
      setIsLoadingForm(false)
      if (result.length > 0) {
        setErrorsFromValidation(result)
      }
      // Router.push(getLoginPath())
    })()
  }, [isLoadingForm, fantasyName, cpf, cnpj])

  const setErrorsFromValidation = useCallback((results: UsecaseError[]) => {
    const errors = {
      [errorsTypes.fantasyNameError]: setFantasyNameMsg,
      [errorsTypes.cpfError]: setCpfMsg,
      [errorsTypes.cnpjError]: setCnpjMsg
    }
    results.forEach(result => {
      const useStateGetted = errors[result.fieldName]
      useStateGetted({ isError: true, message: result.message })
      if (result.fieldName === errorsTypes.GlobalError) {
        setGlobalErrors([{ isError: true, message: result.message }])
      }
    })
  }, [errorsTypes])

  return (
    <Container>
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
            <Label>CPF</Label>
            <InputText isError={cpfMsg.isError} type='password' value={cpf} onChange={e => setCpf(e.target.value)} />
            {
              cpfMsg.message.length > 0 &&
                <FormInfo isError={cpfMsg.isError}>
                  <IconInfoForm />
                  {cpfMsg.message}
                </FormInfo>
            }
          </FormGroup>
          <FormGroup>
            <Label>CNPJ</Label>
            <InputText isError={cnpjMsg.isError} type='password' value={cnpj} onChange={e => setCnpj(e.target.value)} />
            {
              cnpjMsg.message.length > 0 &&
                <FormInfo isError={cnpjMsg.isError}>
                  <IconInfoForm />
                  {cnpjMsg.message}
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
