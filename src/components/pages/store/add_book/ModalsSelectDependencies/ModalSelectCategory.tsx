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

import { getCategories } from '../../../../../usecase/store/add_book/get_categories/HttpRequest'
import { validate as validateCategoryQuery } from '../../../../../usecase/store/add_book/get_categories/Validation'

export type Category = {
  id: number
  name: string
}

export type CategoryModalForm = {
  categoriesFound: Category[],
  categorySelected?: Category,
} & BaseModalForm

type Props = {
  getCategoryIDSelected: (category: number) => void
}

const ModalSelectCategory = (props: Props) => {
  const formikCategory = useFormik<CategoryModalForm>({
    enableReinitialize: true,
    initialValues: {
      queryInput: '',
      isLoading: false,
      categoriesFound: [],
      categorySelected: undefined,
      modalIsOpen: false
    },
    validate: validateCategoryQuery,
    onSubmit: async () => {
      formikCategory.setValues(old => ({
        ...old, isLoading: true
      }))
      const token = AuthenticationManager.get().token
      const result = await getCategories(formikCategory.values.queryInput, token)
      formikCategory.setValues(old => ({
        ...old,
        isLoading: true,
        categoriesFound: result.data
      }))
    }
  })

  return (
    <FormGroup>
      <Row>
        <Title>Categoria {formikCategory.values.categorySelected
          ? <Selected>{formikCategory.values.categorySelected.name}</Selected>
          : <NonSelected>não selecionado</NonSelected>}</Title>
        <ButtonSelectForm
          onClick={() => formikCategory.setValues(old => ({ ...old, modalIsOpen: true }))}>{
            formikCategory.values.categorySelected ? 'Mudar' : 'Buscar'}
        </ButtonSelectForm>
      </Row>
      <Bar />
      <Modal
        ariaHideApp={false}
        isOpen={ formikCategory.values.modalIsOpen}
        onRequestClose={() => formikCategory.setValues(old => ({ ...old, modalIsOpen: false }))}
        style={modalCustomStyles} >
        <ModalContainer>
          <FormGroup>
            <Label>Procurar por categorias</Label>
            <InputText
              id='queryInput'
              name='queryInput'
              type='text'
              disabled={formikCategory.values.isLoading}
              value={formikCategory.values.queryInput}
              onChange={formikCategory.handleChange}
              onKeyDown={e => e.key === 'Enter' ? formikCategory.handleSubmit(e) : null }
            />
            <ErrorComponent>{formikCategory.errors.queryInput}</ErrorComponent>
            <ButtonSearchModal
              type="button"
              onClick={formikCategory.handleSubmit}>
                Buscar
            </ButtonSearchModal>
            <List>
              {
                formikCategory.values.categoriesFound
                  .map(category =>
                  <ItemList
                    key={category.id}
                    onClick={() => {
                      formikCategory.setValues(old => ({
                        ...old,
                        categorySelected: category,
                        modalIsOpen: false
                      }))
                      props.getCategoryIDSelected(category.id)
                    } }>
                      {category.name}
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

export default ModalSelectCategory
