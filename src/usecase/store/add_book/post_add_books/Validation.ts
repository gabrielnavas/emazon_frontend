import { BookFormData } from '../../../../pages/store/add_book'

export const validateFormBook =
  (form: BookFormData): BookFormData => {
    const errors = { } as BookFormData
    if (form.title.length < 2 || form.title.length > 100) {
      errors.title = 'Título deve ter entre 2 e 100 caracteres'
    }
    if (form.description.length <= 10 || form.description.length > 170) {
      errors.description = 'Descrição deve ter entre 10 e 170 caracteres'
    }

    if (form.price < 0 || form.price > 1_000_000_000) {
      errors.financeError = 'O valor do livro deve ser entre 0 e 1 000 000 000'
    }

    if (form.discount < 0.00 || form.discount > 1.00) {
      errors.financeError = 'O desconto deve ser entre 0.00 e 1'
    }

    if (form.pagesAmount <= 0 || form.discount > 100_000) {
      errors.dimensionsError = 'O número de páginas não deve ser entre 1 e 100 000'
    }

    if (form.heigh <= 0 || form.heigh > 1.00) {
      errors.dimensionsError = 'Defina uma alturas entre zero e 100cm'
    }

    if (form.width <= 0 || form.width > 1) {
      errors.dimensionsError = 'Defina uma largura entre zero e 100cm'
    }

    if (form.thickness <= 0 || form.thickness > 0.50) {
      errors.dimensionsError = 'Defina uma espessura entre zero e 50cm'
    }

    if (form.authorID <= 0) {
      errors.globalError = 'Selecione um author'
    }

    if (form.typeCoverID <= 0) {
      errors.globalError = 'Selecione um tipo de capa'
    }

    if (form.languageID <= 0) {
      errors.globalError = 'Selecione um idioma para o livro'
    }

    if (form.categoryID <= 0) {
      errors.globalError = 'Selecione uma categoria para o livro'
    }

    if (form.publishingCompanyID <= 0) {
      errors.globalError = 'Selecione uma Empresa de publicação para o livro'
    }

    if (form.images.length === 0) {
      errors.imagesError = 'É necessário pelo menos uma foto do livro'
    }

    if (form.images.length > 4) {
      errors.imagesError = 'São permitidos no máximo 4 fotos'
    }

    return errors
  }
