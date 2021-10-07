import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'

import Header from '../../../components/Header'
import Modal from 'react-modal'

import { IconAddImagem } from '../../../icons'

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
  ButtonAddImg
} from './styles'

export type AddBookFormData = {
  title: string
  typeCover: {
    typeName: string
  },
  publishedAt: Date,
  language: {
    name: string
  },
  author: {
    name: string
  },
  description: string,
  price: number,
  discount: number,
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

  const [author, setAuthor] = useState<{id: number, name: string}>()
  const [modalSelectAuthorIsOpen, setModalSelectAuthorIsOpen] = useState(false)

  const [language, setLanguage] = useState<{id: number, name: string}>()
  const [modalSelectLanguageIsOpen, setModalSelectLanguageIsOpen] = useState(false)

  const [category, setCategory] = useState<{id: number, name: string}>()
  const [modalSelectCategoryIsOpen, setModalSelectCategoryIsOpen] = useState(false)

  const [typeCover, setTypeCover] = useState<{id: number, name: string}>()
  const [modalSelectTypeCoverIsOpen, setModalSelectTypeCoverIsOpen] = useState(false)

  const handleSelectAuthor = useCallback((id: number, name: string) => {
    setAuthor({ id, name })
    setModalSelectAuthorIsOpen(false)
  }, [author, setAuthor, setModalSelectAuthorIsOpen])

  const handleSelectLanguage = useCallback((id: number, name: string) => {
    setLanguage({ id, name })
    setModalSelectLanguageIsOpen(false)
  }, [language, setLanguage, setModalSelectLanguageIsOpen])

  const handleSelectCategory = useCallback((id: number, name: string) => {
    setCategory({ id, name })
    setModalSelectCategoryIsOpen(false)
  }, [category, setCategory, setModalSelectCategoryIsOpen])

  const handleSelectTypeCover = useCallback((id: number, name: string) => {
    setTypeCover({ id, name })
    setModalSelectTypeCoverIsOpen(false)
  }, [typeCover, setTypeCover, setModalSelectTypeCoverIsOpen])

  return (
    <Container>
      <Header />
      <Section>

        <Left>
          <Imgs>
          {
            images.map((image, i) =>
                <Image key={i} src={image} width={200} height={150} />
            )
          }
          {
            images.length <= 4 &&
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
              <Title>Autor {author ? <Selected>{author.name}</Selected> : <NonSelected>não selecionado</NonSelected>}</Title>
              <Bar />
              <ButtonSelectForm
                onClick={() => setModalSelectAuthorIsOpen(true)}>{
                author ? 'Buscar outro' : 'Buscar'}
              </ButtonSelectForm>
              <Modal
                isOpen={modalSelectAuthorIsOpen}
                onRequestClose={() => setModalSelectAuthorIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <ModalContainer>
                  <FormGroup>
                    <Label>Nome do autor</Label>
                    <InputText
                      id='author'
                      name='author'
                    />
                    <List>
                      {
                        Array(20)
                          .fill('')
                          .map((_, i) =>
                            <ItemList
                              key={i} value={[i, `blabla ${i}`]} onClick={e => handleSelectAuthor(i, 'asdasdsad') }>
                                asdsadsda
                            </ItemList>)
                      }
                    </List>
                  </FormGroup>
                </ModalContainer>
              </Modal>
            </FormGroup>

            <FormGroup>
              <Title>Linguagem {language ? <Selected>{language.name}</Selected> : <NonSelected>não selecionado</NonSelected>}</Title>
              <Bar />
              <ButtonSelectForm
                onClick={() => setModalSelectLanguageIsOpen(true)}>{
                language ? 'Buscar outro' : 'Buscar'}
              </ButtonSelectForm>
              <Modal
                isOpen={modalSelectLanguageIsOpen}
                onRequestClose={() => setModalSelectLanguageIsOpen(false)}
                style={customStyles}
              >
                <ModalContainer>
                  <FormGroup>
                    <Label>Nome do autor</Label>
                    <InputText
                      id='language'
                      name='language'
                    />
                    <List>
                      {
                        Array(20)
                          .fill('')
                          .map((_, i) =>
                            <ItemList
                              key={i} onClick={e => handleSelectLanguage(i, 'asdasdsad') }>
                                asdsadsda
                            </ItemList>)
                      }
                    </List>
                  </FormGroup>
                </ModalContainer>
              </Modal>
            </FormGroup>

            <FormGroup>
              <Title>
                Categoria {category ? <Selected>{category.name}</Selected> : <NonSelected>não selecionado</NonSelected>}
              </Title>
              <Bar />
              <ButtonSelectForm
                onClick={() => setModalSelectCategoryIsOpen(true)}>{
                category ? 'Buscar outro' : 'Buscar'}
              </ButtonSelectForm>
              <Modal
                isOpen={modalSelectCategoryIsOpen}
                onRequestClose={() => setModalSelectCategoryIsOpen(false)}
                style={customStyles} >
                <ModalContainer>
                  <FormGroup>
                    <Label>Nome do autor</Label>
                    <InputText
                      id='category'
                      name='category'
                    />
                    <List>
                      {
                        Array(20)
                          .fill('')
                          .map((_, i) =>
                            <ItemList
                              key={i} onClick={e => handleSelectCategory(i, 'asdasdsad') }>
                                asdsadsda
                            </ItemList>)
                      }
                    </List>
                  </FormGroup>
                </ModalContainer>
              </Modal>
            </FormGroup>

            <FormGroup>
              <Title>Tipo de capa {typeCover ? <Selected>{typeCover.name}</Selected> : <NonSelected>não selecionado</NonSelected>}</Title>
              <Bar />
              <ButtonSelectForm
                onClick={() => setModalSelectTypeCoverIsOpen(true)}>{
                typeCover ? 'Buscar outro' : 'Buscar'}
              </ButtonSelectForm>
              <Modal
                isOpen={modalSelectTypeCoverIsOpen}
                onRequestClose={() => setModalSelectTypeCoverIsOpen(false)}
                style={customStyles}
              >
                <ModalContainer>
                  <FormGroup>
                    <Label>Nome do autor</Label>
                    <InputText
                      id='typeCover'
                      name='typeCover'
                    />
                    <List>
                      {
                        Array(20)
                          .fill('')
                          .map((_, i) =>
                            <ItemList
                              key={i} onClick={e => handleSelectTypeCover(i, 'asdasdsad') }>
                                asdsadsda
                            </ItemList>)
                      }
                    </List>
                  </FormGroup>
                </ModalContainer>
              </Modal>
            </FormGroup>
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
