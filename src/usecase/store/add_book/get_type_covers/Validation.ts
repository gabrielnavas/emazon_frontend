import { TypeCoverModalForm } from '../../../../pages/store/add_book'

export const validate =
  (form: TypeCoverModalForm): TypeCoverModalForm => {
    const errors = {} as TypeCoverModalForm
    if (form.queryInput.length > 100) {
      errors.queryInput = 'Esse campo muito grande.'
    }
    return errors
  }
