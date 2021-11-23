import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export const formatShortDate = (date: Date | string) => {
  return `${new Date(date).getDate()} (${format(new Date(date), 'E', {
    locale: ja
  })})`
}

export const formatFullDate = (date: Date | string) => {
  return format(new Date(date), 'PPP', {
    locale: ja
  })
}

export const formatISODate = (date: Date | string) => format(new Date(date), 'yyyy-MM-dd')

export const formatDateTime = (date: Date | string) => {
  return format(new Date(date), 'yyyy-MM-dd hh:mm:ss')
}
