import { useCallback, useRef } from 'react'
import { useFormik } from 'formik'
import Router from 'next/router'

import Header from '../../../components/Header'

import { IconAddImagem } from '../../../icons'

import * as AuthenticationManager from '../../../usecase/authentication/Usecase'

import ModalSelectAuthor from '../../../components/pages/store/add_book/ModalsSelectDependencies/ModalSelectAuthor'
import ModalSelectLanguage from '../../../components/pages/store/add_book/ModalsSelectDependencies/ModalSelectLanguage'
import ModalSelectCategory from '../../../components/pages/store/add_book/ModalsSelectDependencies/ModalSelectCategory'
import ModalSelectTypeCover from '../../../components/pages/store/add_book/ModalsSelectDependencies/ModalSelectTypeCover'
import ModalSelectPublishingCompany from '../../../components/pages/store/add_book/ModalsSelectDependencies/ModalSelectPublishingCompany'

import {
  addBookHttpRequest
} from '../../../usecase/store/add_book/post_add_books/HttpRequest'
import {
  validateFormBook
} from '../../../usecase/store/add_book/post_add_books/Validation'

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
  ButtonFinish,
  Imgs,
  ButtonAddImg,
  ImageBookContainer,
  ImageBook,
  DependenciesIDs,
  Error as ErrorComponent
} from './styles'
import { addImagesHttpRequest } from '../../../usecase/store/add_book/post_add_images/HttpRequest'
import { getManagerStorePath } from '../../../config/routesPath'

export type BaseModalForm = {
  queryInput: string
  isLoading: boolean
  modalIsOpen: boolean
}

export type BookFormData = {
  isLoading: boolean
  globalError: string
  dimensionsError: string
  financeError: string

  title: string
  description: string
  price: number
  discount: number
  pagesAmount: number
  heigh: number
  width: number
  thickness: number
  publishedAt: string
  authorID: number
  typeCoverID: number
  languageID: number
  categoryID: number
  publishingCompanyID: number

  imagesError: string,
  images: any[]
}

export const modalCustomStyles = {
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
  const inputFile = useRef(null)

  const formikBook = useFormik<BookFormData>({
    enableReinitialize: true,
    initialValues: {
      isLoading: false,
      globalError: '',
      dimensionsError: '',
      financeError: '',

      title: '',
      description: '',
      price: 0.00,
      discount: 0.00,
      pagesAmount: 0,
      heigh: 0.00,
      width: 0.00,
      thickness: 0.00,
      publishedAt: '2020-01-01',
      authorID: 0,
      typeCoverID: 0,
      languageID: 0,
      categoryID: 0,
      publishingCompanyID: 0,

      images: [],
      imagesError: ''
    },
    validate: validateFormBook,
    onSubmit: async () => {
      formikBook.setValues(old => ({
        ...old, isLoading: true
      }))
      const token = AuthenticationManager.get().token
      const result = await addBookHttpRequest(formikBook.values, token)
      formikBook.setValues(old => ({
        ...old,
        isLoading: false
      }))
      if (result.error) {
        return formikBook.setErrors({
          globalError: result.error
        })
      }
      formikBook.setValues(old => ({
        ...old,
        isLoading: false
      }))
      await addImagesHttpRequest(result.data.book.id, formikBook.values.images, token)
      Router.push(getManagerStorePath())
    }
  })

  const onButtonClick = useCallback(() => {
    inputFile.current.click()
  }, [])

  const onChangeFile = useCallback((event) => {
    const files = Array.from(event.target.files)
    if (formikBook.values.images.length <= 4 &&
      formikBook.values.images.length + files.length <= 4) {
      const moreFilesURLs = files.map(file => URL.createObjectURL(file))
      formikBook.setValues(old => ({
        ...old,
        images: [...moreFilesURLs, ...formikBook.values.images]
      }))
    } else {
      formikBook.setErrors({
        imagesError: 'São permitidos no máximo 4 fotos'
      })
    }
  }, [formikBook.values.images])

  const handleRemovePhoto = useCallback((indexFromPhotos: number) => {
    const newImages = formikBook
      .values
      .images
      .filter((_, index) => index !== indexFromPhotos)
    formikBook.setValues(old => ({
      ...old,
      images: newImages
    }))
  }, [formikBook.values.images])

  return (
    <Container>
      <Header />
      <Section>

        <Left>
          <Title>Imagens do livro</Title>
          <Imgs>
          {
            formikBook.values.images.map((image, i) =>
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
            formikBook.values.images.length <= 3 &&
              <ButtonAddImg onClick={onButtonClick}>
                <input type='file' id='file' multiple ref={inputFile} onChange={onChangeFile} style={{ display: 'none' }}/>
                  <IconAddImagem />
              </ButtonAddImg>
          }
          </Imgs>
          <Row>
          {
            formikBook.errors.imagesError &&
              <ErrorComponent>{formikBook.errors.imagesError}</ErrorComponent>
          }
          </Row>
        </Left>

        <Middle>
          <FormGroup>
            <Label>Título</Label>
            <InputText
              id='title'
              name='title'
              type='text'
              value={formikBook.values.title}
              onChange={formikBook.handleChange}
            />
            {
              formikBook.touched.title && formikBook.errors.title &&
                <ErrorComponent>{formikBook.errors.title}</ErrorComponent>
            }
          </FormGroup>
          <FormGroup>
            <Label>Descrição</Label>
            <InputTextArea
              id='description'
              name='description'
              type='text'
              value={formikBook.values.description}
              onChange={formikBook.handleChange}
            />
            {
              formikBook.touched.description && formikBook.errors.description &&
                <ErrorComponent>{formikBook.errors.description}</ErrorComponent>
            }
          </FormGroup>

          <Title>Livro publicado em</Title>
          <Bar />
          <Row>
            <FormGroup>
              <PublishedAt
                id='publishedAt'
                name='publishedAt'
                type='date'
                value={formikBook.values.publishedAt}
                onChange={formikBook.handleChange}
              />
              {
                formikBook.touched.publishedAt && formikBook.errors.publishedAt &&
                  <ErrorComponent>{formikBook.errors.publishedAt}</ErrorComponent>
              }
            </FormGroup>
          </Row>

          <Title>Financeiro</Title>
          <Bar />
          <Row>
            <FormGroup>
              <Label>Preço</Label>
              <InputNumber
                id='price'
                name='price'
                type='number'
                step="0.01"
                value={formikBook.values.price}
                onChange={formikBook.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Desconto %</Label>
              <PublishedAt
                id='discount'
                name='discount'
                type='number'
                step="0.01"
                value={formikBook.values.discount}
                onChange={formikBook.handleChange}
              />
            </FormGroup>
          </Row>
          <Row>
          {
            formikBook.touched.financeError && formikBook.errors.financeError &&
              <ErrorComponent>{formikBook.errors.financeError}</ErrorComponent>
          }
          </Row>
          <Title>Dimensões</Title>
          <Bar />
          <Dimensions>
            <Row>
              <FormGroup>
                <Label>Largura (cm)</Label>
                <InputNumber
                  id='width'
                  name='width'
                  type='number'
                  step="0.01"
                  value={formikBook.values.width}
                  onChange={formikBook.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Altura (cm)</Label>
                <InputNumber
                    id='heigh'
                    name='heigh'
                    type='number'
                    step="0.01"
                    value={formikBook.values.heigh}
                    onChange={formikBook.handleChange}
                  />
              </FormGroup>
              <FormGroup>
                <Label>Espessura (cm)</Label>
                <InputNumber
                  id='thickness'
                  name='thickness'
                  type='number'
                  step="0.01"
                  value={formikBook.values.thickness}
                  onChange={formikBook.handleChange}
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label>Páginas</Label>
                <InputNumber
                  id='pagesAmount'
                  name='pagesAmount'
                  type='number'
                  value={formikBook.values.pagesAmount}
                  onChange={formikBook.handleChange}
                />
              </FormGroup>
            </Row>
            {
              formikBook.touched.dimensionsError && formikBook.errors.dimensionsError &&
                <ErrorComponent>{formikBook.errors.dimensionsError}</ErrorComponent>
            }
          </Dimensions>

          <DependenciesIDs>
            <ModalSelectAuthor
              getAuthorIDSelected={(authorID: number) => formikBook.setValues(old => ({ ...old, authorID }))}
            />
            <ModalSelectLanguage
              getLanguageIDSelected={(languageID: number) => formikBook.setValues(old => ({ ...old, languageID }))}
            />
            <ModalSelectCategory
              getCategoryIDSelected={(categoryID: number) => formikBook.setValues(old => ({ ...old, categoryID }))}
            />
            <ModalSelectTypeCover
              getTypeCoverIDSelected={(typeCoverID: number) => formikBook.setValues(old => ({ ...old, typeCoverID }))}
            />
            <ModalSelectPublishingCompany
              getPublishingCompanyIDSelected={(publishingCompanyID: number) => formikBook.setValues(old => ({ ...old, publishingCompanyID }))}
            />
          </DependenciesIDs>
          {
            formikBook.errors.globalError &&
              <ErrorComponent>{formikBook.errors.globalError}</ErrorComponent>
          }
          <ButtonFinish
            type='submit'
            onClick={formikBook.handleSubmit}>
              Inserir livro
          </ButtonFinish>
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
