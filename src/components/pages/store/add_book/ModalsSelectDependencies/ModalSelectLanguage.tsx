import { useFormik } from 'formik'
import Modal from 'react-modal'

import {
  BaseModalForm,
  modalCustomStyles
} from '../../../../../pages/store/add_book'

import {
  FormGroup,
  Row,
  Title,
  Bar,
  Label,
  InputText,
  Error as ErrorComponent
} from '../../../../../pages/store/add_book/styles'

import {
  Selected,
  NonSelected,
  ButtonSelectForm,
  ModalContainer,
  ButtonSearchModal,
  List,
  ItemList
} from './styles'

import * as AuthenticationManager from '../../../../../usecase/authentication/Usecase'

import { getLanguages } from '../../../../../usecase/store/add_book/get_languages/HttpRequest'
import { validate as validateLanguageQuery } from '../../../../../usecase/store/add_book/get_languages/Validation'

export type Language = {
  id: number
  code: string
  name: string
}

export type LanguageModalForm = {
  languageFound: Language[],
  languageSelected?: Language,
} & BaseModalForm

type Props = {
  getLanguageIDSelected: (languageID: number) => void
}

const ModalSelectLanguage = (props: Props) => {
  const formikLanguage = useFormik<LanguageModalForm>({
    enableReinitialize: true,
    initialValues: {
      queryInput: '',
      isLoading: false,
      languageFound: [],
      languageSelected: undefined,
      modalIsOpen: false
    },
    validate: validateLanguageQuery,
    onSubmit: async () => {
      formikLanguage.setValues(old => ({
        ...old, isLoading: true
      }))
      const token = AuthenticationManager.get().token
      const result = await getLanguages(formikLanguage.values.queryInput, token)
      formikLanguage.setValues(old => ({
        ...old,
        isLoading: true,
        languageFound: result.data
      }))
    }
  })

  return (
    <FormGroup>
      <Row>
        <Title>Idioma {formikLanguage.values.languageSelected
          ? <Selected>{formikLanguage.values.languageSelected.name}</Selected>
          : <NonSelected>não selecionado</NonSelected>}</Title>
        <ButtonSelectForm
          onClick={() => formikLanguage.setValues(old => ({ ...old, modalIsOpen: true }))}>{
            formikLanguage.values.languageSelected ? 'Mudar' : 'Buscar'}
        </ButtonSelectForm>
      </Row>
      <Bar />
      <Modal
        ariaHideApp={false}
        isOpen={ formikLanguage.values.modalIsOpen}
        onRequestClose={() => formikLanguage.setValues(old => ({ ...old, modalIsOpen: false }))}
        style={modalCustomStyles} >
        <ModalContainer>
          <FormGroup>
            <Label>Procurar por idiomas</Label>
            <InputText
              id='queryInput'
              name='queryInput'
              type='text'
              disabled={formikLanguage.values.isLoading}
              value={formikLanguage.values.queryInput}
              onChange={formikLanguage.handleChange}
              onKeyDown={e => e.key === 'Enter' ? formikLanguage.handleSubmit(e) : null }
            />
            <ErrorComponent>{formikLanguage.errors.queryInput}</ErrorComponent>
            <ButtonSearchModal
              type="button"
              onClick={formikLanguage.handleSubmit}>
                Buscar
            </ButtonSearchModal>
            <List>
              {
                formikLanguage.values.languageFound
                  .map(language =>
                  <ItemList
                    key={language.id}
                    onClick={() => {
                      formikLanguage.setValues(old =>
                        ({ ...old, languageSelected: language, modalIsOpen: false }))
                      props.getLanguageIDSelected(language.id)
                    } }>
                      {language.name}
                  </ItemList>
                  )
              }
            </List>
          </FormGroup>
        </ModalContainer>
      </Modal>
    </FormGroup>
  )
}

export default ModalSelectLanguage
