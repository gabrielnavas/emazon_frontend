import { AuthorModalForm } from '../../../../pages/store/add_book'

export const validate =
  (authorModalForm: AuthorModalForm): AuthorModalForm => {
    const errors = {} as AuthorModalForm
    if (authorModalForm.queryInput.length > 100) {
      errors.queryInput = 'Esse campo muito grande.'
    }
    return errors
  }
