import moment from 'moment'

// 23 de set de 2021
export const dayMonthNameYear = (date: Date) => {
  moment.locale('pt-br')
  moment.updateLocale('pt-br', {
    months: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
  })
  const d = moment(date).format('DD MMMM YYYY')
  return d
}
