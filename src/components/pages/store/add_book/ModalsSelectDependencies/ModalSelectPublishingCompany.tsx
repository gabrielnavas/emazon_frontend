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

import { getPublishingCompany } from '../../../../../usecase/store/add_book/get_publishing_company/HttpRequest'
import { validate as validatePublishingCompany } from '../../../../../usecase/store/add_book/get_publishing_company/Validation'

export type PublishingCompany = {
  id: number
  name: string
}
export type PublishingCompanyModalForm = {
  publishingCompaniesFound: PublishingCompany[],
  publishingCompanySelected?: PublishingCompany,
} & BaseModalForm

type Props = {
  getPublishingCompanyIDSelected: (publishingCompanyID: number) => void
}

const ModalSelectAuthor = (props: Props) => {
  const formikPublishingCompany = useFormik<PublishingCompanyModalForm>({
    enableReinitialize: true,
    initialValues: {
      queryInput: '',
      isLoading: false,
      publishingCompaniesFound: [],
      publishingCompanySelected: undefined,
      modalIsOpen: false
    },
    validate: validatePublishingCompany,
    onSubmit: async () => {
      formikPublishingCompany.setValues(old => ({
        ...old, isLoading: true
      }))
      const token = AuthenticationManager.get().token
      const result = await getPublishingCompany(formikPublishingCompany.values.queryInput, token)
      formikPublishingCompany.setValues(old => ({
        ...old,
        isLoading: true,
        publishingCompaniesFound: result.data
      }))
    }
  })

  return (
    <FormGroup>
      <Row>
        <Title>Empresa Publicada {formikPublishingCompany.values.publishingCompanySelected
          ? <Selected>{formikPublishingCompany.values.publishingCompanySelected.name}</Selected>
          : <NonSelected>não selecionado</NonSelected>}</Title>
        <ButtonSelectForm
          onClick={() => formikPublishingCompany.setValues(old => ({ ...old, modalIsOpen: true }))}>{
            formikPublishingCompany.values.publishingCompanySelected ? 'Mudar' : 'Buscar'}
        </ButtonSelectForm>
      </Row>
      <Bar />
      <Modal
        ariaHideApp={false}
        isOpen={ formikPublishingCompany.values.modalIsOpen}
        onRequestClose={() => formikPublishingCompany.setValues(old => ({ ...old, modalIsOpen: false }))}
        style={modalCustomStyles} >
        <ModalContainer>
          <FormGroup>
            <Label>Procurar por tipos de capa</Label>
            <InputText
              id='queryInput'
              name='queryInput'
              type='text'
              disabled={formikPublishingCompany.values.isLoading}
              value={formikPublishingCompany.values.queryInput}
              onChange={formikPublishingCompany.handleChange}
              onKeyDown={e => e.key === 'Enter' ? formikPublishingCompany.handleSubmit(e) : null }
            />
            <ErrorComponent>{formikPublishingCompany.errors.queryInput}</ErrorComponent>
            <ButtonSearchModal
              type="button"
              onClick={formikPublishingCompany.handleSubmit}>
                Buscar
            </ButtonSearchModal>
            <List>
              {
                formikPublishingCompany.values.publishingCompaniesFound
                  .map(publishingCompany =>
                    <ItemList
                      key={publishingCompany.id}
                      onClick={() => {
                        formikPublishingCompany.setValues(old => ({
                          ...old,
                          publishingCompanySelected: publishingCompany,
                          modalIsOpen: false
                        }))
                        props.getPublishingCompanyIDSelected(publishingCompany.id)
                      } }>
                        {publishingCompany.name}
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

export default ModalSelectAuthor
