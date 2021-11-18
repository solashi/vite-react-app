import { CompanyGroupType } from './company'

type CompanyGroup = {
  id: number
  name: string
  companies_count: number
}

type CompanyGroupRelation = {
  companies: CompanyGroupType[] | number[]
}

type GroupCompany = CompanyGroup & CompanyGroupRelation

export type { CompanyGroup, GroupCompany }
