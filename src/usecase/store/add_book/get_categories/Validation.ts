import { CategoryModalForm } from '../../../../pages/store/add_book'

export const validate =
  (form: CategoryModalForm): CategoryModalForm => {
    const errors = {} as CategoryModalForm
    if (form.queryInput.length > 100) {
      errors.queryInput = 'Esse campo muito grande.'
    }
    return errors
  }
