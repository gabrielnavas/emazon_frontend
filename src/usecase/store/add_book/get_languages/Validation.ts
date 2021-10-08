import { LanguageModalForm } from '../../../../pages/store/add_book'

export const validate =
  (form: LanguageModalForm): LanguageModalForm => {
    const errors = {} as LanguageModalForm
    if (form.queryInput.length > 100) {
      errors.queryInput = 'Esse campo muito grande.'
    }
    return errors
  }
