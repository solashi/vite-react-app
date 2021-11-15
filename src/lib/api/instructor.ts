import { request } from 'lib/request'
import { Instrutor } from 'lib/types'

export type CreateInstructor = {
  name: string
  name_en: string
  profile: string
  unit_price: string
  image_path: string
}

export type UpdateInstructor = {
  id: number
  name: string
  name_en: string
  profile: string
  unit_price: string
  image_path: string
}

const createInstructorApi = (values: CreateInstructor) =>
  request.post<Instrutor>('/instructors', values)

const updateInstructorApi = (values: UpdateInstructor) =>
  request.post<Instrutor>(`/instructors/${values.id}?_method=put`, values)

export { createInstructorApi, updateInstructorApi }
