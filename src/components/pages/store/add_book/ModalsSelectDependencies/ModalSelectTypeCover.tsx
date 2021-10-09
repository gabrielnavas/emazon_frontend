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

import { getTypeCovers } from '../../../../../usecase/store/add_book/get_type_covers/HttpRequest'
import { validate as validateTypeCoverQuery } from '../../../../../usecase/store/add_book/get_type_covers/Validation'

export type TypeCover = {
  id: number
  name: string
}

export type TypeCoverModalForm = {
  typeCoversFound: TypeCover[],
  typeCoverSelected?: TypeCover,
} & BaseModalForm

type Props = {
  getTypeCoverIDSelected: (typeCoverID: number) => void
}

const ModalSelectTypeCover = (props: Props) => {
  const formikTypeCover = useFormik<TypeCoverModalForm>({
    enableReinitialize: true,
    initialValues: {
      queryInput: '',
      isLoading: false,
      typeCoversFound: [],
      typeCoverSelected: undefined,
      modalIsOpen: false
    },
    validate: validateTypeCoverQuery,
    onSubmit: async () => {
      formikTypeCover.setValues(old => ({
        ...old, isLoading: true
      }))
      const token = AuthenticationManager.get().token
      const result = await getTypeCovers(formikTypeCover.values.queryInput, token)
      formikTypeCover.setValues(old => ({
        ...old,
        isLoading: true,
        typeCoversFound: result.data
      }))
    }
  })

  return (
    <FormGroup>
      <Row>
        <Title>Tipo capa {formikTypeCover.values.typeCoverSelected
          ? <Selected>{formikTypeCover.values.typeCoverSelected.name}</Selected>
          : <NonSelected>não selecionado</NonSelected>}</Title>
        <ButtonSelectForm
          onClick={() => formikTypeCover.setValues(old => ({ ...old, modalIsOpen: true }))}>{
            formikTypeCover.values.typeCoverSelected ? 'Mudar' : 'Buscar'}
        </ButtonSelectForm>
      </Row>
      <Bar />
      <Modal
        ariaHideApp={false}
        isOpen={ formikTypeCover.values.modalIsOpen}
        onRequestClose={() => formikTypeCover.setValues(old => ({ ...old, modalIsOpen: false }))}
        style={modalCustomStyles} >
        <ModalContainer>
          <FormGroup>
            <Label>Procurar por tipos de capa</Label>
            <InputText
              id='queryInput'
              name='queryInput'
              type='text'
              disabled={formikTypeCover.values.isLoading}
              value={formikTypeCover.values.queryInput}
              onChange={formikTypeCover.handleChange}
              onKeyDown={e => e.key === 'Enter' ? formikTypeCover.handleSubmit(e) : null }
            />
            <ErrorComponent>{formikTypeCover.errors.queryInput}</ErrorComponent>
            <ButtonSearchModal
              type="button"
              onClick={formikTypeCover.handleSubmit}>
                Buscar
            </ButtonSearchModal>
            <List>
              {
                formikTypeCover.values.typeCoversFound
                  .map(typeCover =>
                  <ItemList
                    key={typeCover.id}
                    onClick={() => {
                      formikTypeCover.setValues(old => ({
                        ...old,
                        typeCoverSelected: typeCover,
                        modalIsOpen: false
                      }))
                      props.getTypeCoverIDSelected(typeCover.id)
                    } }>
                      {typeCover.name}
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

export default ModalSelectTypeCover
