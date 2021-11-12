import { request } from 'lib/request'

const deleteCompanyApi = (id: number) => request.delete('companies/' + id)

export { deleteCompanyApi }
