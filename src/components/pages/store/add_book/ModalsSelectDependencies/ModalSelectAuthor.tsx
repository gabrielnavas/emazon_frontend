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

import { getAuthors } from '../../../../../usecase/store/add_book/get_authors/HttpRequest'
import { validate as validateAuthorQuery } from '../../../../../usecase/store/add_book/get_authors/Validation'

export type Author = {
  id: number
  name: string
}

export type AuthorModalForm ={
    authorsFound: Author[],
    authorSelected?: Author,
  } & BaseModalForm

type Props = {
  getAuthorIDSelected: (authorID: number) => void
}

const ModalSelectAuthor = (props: Props) => {
  const formikAuthors = useFormik<AuthorModalForm>({
    enableReinitialize: true,
    initialValues: {
      queryInput: '',
      isLoading: false,
      authorsFound: [],
      authorSelected: undefined,
      modalIsOpen: false
    },
    validate: validateAuthorQuery,
    onSubmit: async () => {
      formikAuthors.setValues(old => ({
        ...old, isLoading: true
      }))
      const token = AuthenticationManager.get().token
      const result = await getAuthors(formikAuthors.values.queryInput, token)
      formikAuthors.setValues(old => ({
        ...old,
        isLoading: true,
        authorsFound: result.data
      }))
    }
  })

  return (
    <FormGroup>
      <Row>
        <Title>Autor {formikAuthors.values.authorSelected
          ? <Selected>{formikAuthors.values.authorSelected.name}</Selected>
          : <NonSelected>não selecionado</NonSelected>}</Title>
        <ButtonSelectForm
          onClick={() => formikAuthors.setValues(old => ({ ...old, modalIsOpen: true }))}>{
            formikAuthors.values.authorSelected ? 'Mudar' : 'Buscar'}
        </ButtonSelectForm>
      </Row>
      <Bar />
      <Modal
        ariaHideApp={false}
        isOpen={ formikAuthors.values.modalIsOpen}
        onRequestClose={() => formikAuthors.setValues(old => ({ ...old, modalIsOpen: false }))}
        style={modalCustomStyles} >
        <ModalContainer>
          <FormGroup>
            <Label>Procurar por autores</Label>
            <InputText
              id='queryInput'
              name='queryInput'
              type='text'
              disabled={formikAuthors.values.isLoading}
              value={formikAuthors.values.queryInput}
              onChange={formikAuthors.handleChange}
              onKeyDown={e => e.key === 'Enter' ? formikAuthors.handleSubmit(e) : null }
            />
            <ErrorComponent>{formikAuthors.errors.queryInput}</ErrorComponent>
            <ButtonSearchModal
              type="button"
              onClick={formikAuthors.handleSubmit}>
                Buscar
            </ButtonSearchModal>
            <List>
              {
                formikAuthors.values.authorsFound
                  .map(author =>
                  <ItemList
                    key={author.id}
                    onClick={() => {
                      formikAuthors.setValues(old =>
                        ({ ...old, authorSelected: author, modalIsOpen: false }))
                      props.getAuthorIDSelected(author.id)
                    } }>
                      {author.name}
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
