import { PublishingCompanyModalForm } from '../../../../pages/store/add_book'

export const validate =
  (form: PublishingCompanyModalForm): PublishingCompanyModalForm => {
    const errors = {} as PublishingCompanyModalForm
    if (form.queryInput.length > 100) {
      errors.queryInput = 'Esse campo muito grande.'
    }
    return errors
  }
