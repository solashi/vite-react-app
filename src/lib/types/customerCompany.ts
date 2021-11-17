import { Domain, GroupType, ServiceType } from '.'

type CustomerCompany = {
  id: number
  name: string
  address: string
  invitation_code: string
  main_color_code: string
  sub_color_code: string
  logo_path: string
  privacy_policy_text: string
  service_policy_text: string
  parent_company_id?: number
  fd_company_id?: number
}

type CompanyRelation = {
  groups: GroupType[] | number[]
  services: ServiceType[] | number[]
  domains: Domain[] | string[]
}

type Company = CustomerCompany & CompanyRelation

export type { CustomerCompany, CompanyRelation, Company }
