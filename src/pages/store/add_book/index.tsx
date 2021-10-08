import { useCallback, useRef, useState } from 'react'
import Modal from 'react-modal'
import { useFormik } from 'formik'

import Header from '../../../components/Header'

import { IconAddImagem } from '../../../icons'

import * as AuthenticationManager from '../../../usecase/authentication/Usecase'

import { getAuthors } from '../../../usecase/store/add_book/get_authors/HttpRequest'
import { validate as validateAuthorQuery } from '../../../usecase/store/add_book/get_authors/Validation'

import { getLanguages } from '../../../usecase/store/add_book/get_languages/HttpRequest'
import { validate as validateLanguageQuery } from '../../../usecase/store/add_book/get_languages/Validation'

import { getCategories } from '../../../usecase/store/add_book/get_categories/HttpRequest'
import { validate as validateCategoryQuery } from '../../../usecase/store/add_book/get_categories/Validation'

import { getTypeCovers } from '../../../usecase/store/add_book/get_type_covers/HttpRequest'
import { validate as validateTypeCoverQuery } from '../../../usecase/store/add_book/get_type_covers/Validation'

import { getPublishingCompany } from '../../../usecase/store/add_book/get_publishing_company/HttpRequest'
import { validate as validatePublishingCompany } from '../../../usecase/store/add_book/get_publishing_company/Validation'

import { addBookHttpRequest } from '../../../usecase/store/add_book/HttpRequest'
import { validate as validateBook } from '../../../usecase/store/add_book/Validation'

import {
  Container,
  Section,
  Left,
  Middle,
  FormGroup,
  Dimensions,
  InputNumber,
  Label,
  Title,
  InputText,
  InputTextArea,
  Bar,
  Row,
  PublishedAt,
  ButtonSelectForm,
  Selected,
  ModalContainer,
  List,
  ItemList,
  NonSelected,
  ButtonFinish,
  Imgs,
  ButtonAddImg,
  ImageBookContainer,
  ImageBook,
  Error as ErrorComponent,
  ButtonSearchModal
} from './styles'

export type Author = {
  id: number
  name: string
}

export type Language = {
  id: string
  code: string
  name: string
}

export type Category = {
  id: string
  name: string
}

export type TypeCover = {
  id: string
  name: string
}

export type PublishingCompany = {
  id: string
  name: string
}

type BaseModalForm = {
  queryInput: string,
  isLoading: boolean,
  modalIsOpen: boolean
}

export type BookData = {
  title: string
  description: string
  price: number
  discount: number
  pagesAmount: number
  heigh: number
  width: number
  thickness: number
  publishedAt: Date
  authorID: number
  typeCoverID: number
  languageID: number
  categoryID: number
  publishingCompanyID: number
  storyID: number
}

export type AuthorModalForm ={
  authorsFound: Author[],
  authorSelected?: Author,
} & BaseModalForm

export type LanguageModalForm = {
  languageFound: Language[],
  languageSelected?: Language,
} & BaseModalForm

export type CategoryModalForm = {
  categoriesFound: Category[],
  categorySelected?: Category,
} & BaseModalForm

export type TypeCoverModalForm = {
  typeCoversFound: TypeCover[],
  typeCoverSelected?: TypeCover,
} & BaseModalForm

export type PublishingCompanyModalForm = {
  publishingCompaniesFound: PublishingCompany[],
  publishingCompanySelected?: PublishingCompany,
} & BaseModalForm

export type BookFormData = {
  isLoading: boolean
  globalError: string
  bookData: BookData
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0'
  }
}

const AddBookPage = () => {
  const [images, setImages] = useState<string[]>([])
  const inputFile = useRef(null)
  const onButtonClick = () => {
    inputFile.current.click()
  }

  const onChangeFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setImages(old => [URL.createObjectURL(event.target.files[0]), ...old])
  }

  const handleRemovePhoto = useCallback((indexFromPhotos: number) => {
    setImages(old => old.filter((_, index) => index !== indexFromPhotos))
  }, [images, setImages])

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
      console.log(formikTypeCover.values)
    }
  })

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
      console.log(formikPublishingCompany.values)
    }
  })

  const formikBook = useFormik<BookFormData>({
    enableReinitialize: true,
    initialValues: {
      isLoading: false,
      globalError: '',
      bookData: {} as BookData
    },
    validate: validateBook,
    onSubmit: async () => {
      formikBook.setValues(old => ({
        ...old, isLoading: true
      }))
      const token = AuthenticationManager.get().token
      const result = await addBookHttpRequest(formikBook.values.bookData, token)
      formikBook.setValues(old => ({
        ...old,
        isLoading: true
      }))
      if (result.error) {
        formikBook.setValues(old => ({
          ...old,
          globalErrors: result.error
        }))
      }
    }
  })

  return (
    <Container>
      <Header />
      <Section>

        <Left>
          <Title>Imagens do livro</Title>
          <Imgs>
          {
            images.map((image, i) =>
              <ImageBookContainer key={i}>
                <ImageBook
                  onClick={() => handleRemovePhoto(i)}
                  src={image}
                  width={183}
                  height={268}
                />
              </ImageBookContainer>
            )
          }
          {
            images.length <= 3 &&
              <ButtonAddImg onClick={onButtonClick}>
                <input type='file' id='file' multiple ref={inputFile} onChange={onChangeFile} style={{ display: 'none' }}/>
                  <IconAddImagem />
              </ButtonAddImg>
          }
          </Imgs>
        </Left>

        <Middle>
          <FormGroup>
            <Label>Título</Label>
            <InputText
              id='title'
              name='title'
              type='text'
            />
          </FormGroup>
          <FormGroup>
            <Label>Descrição</Label>
            <InputTextArea
              id='description'
              name='description'
              type='text'
            />
          </FormGroup>

          <Row>
            <FormGroup>
              <Label>Páginas</Label>
              <InputNumber
                id='title'
                name='title'
                type='number'
                step="0.01"
              />
            </FormGroup>
            <FormGroup>
              <Label>Livro publicado em</Label>
              <PublishedAt
                id='title'
                name='title'
                type='date'
              />
            </FormGroup>
          </Row>

          <Title>Dimensões</Title>
          <Bar />
          <Dimensions>
            <FormGroup>
              <Label>Largura</Label>
              <InputNumber
                id='description'
                name='description'
                type='number'
                step="0.01"
              />
            </FormGroup>
            <FormGroup>
              <Label>Altura</Label>
              <InputNumber
                  id='description'
                  name='description'
                  type='number'
                  step="0.01"
                />
            </FormGroup>
            <FormGroup>
              <Label>Espessura</Label>
              <InputNumber
                id='description'
                name='description'
                type='number'
                step="0.01"
              />
            </FormGroup>
          </Dimensions>

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
                style={customStyles} >
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
                style={customStyles} >
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
                style={customStyles} >
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
                style={customStyles} >
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
                style={customStyles} >
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
            {
              formikBook.values.globalError &&
                <ErrorComponent>{formikBook.values.globalError}</ErrorComponent>
            }
            <ButtonFinish>Inserir livro</ButtonFinish>
        </Middle>
      </Section>
    </Container>
  )
}

export async function getStaticProps (context) {
  return {
    props: { }
  }
}

export default AddBookPage
