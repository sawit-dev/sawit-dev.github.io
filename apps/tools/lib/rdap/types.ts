export type RdapEntity = {
  handle?: string
  roles?: string[]
  vcardArray?: [string, unknown[]]
}

export type RdapRecord = {
  objectClassName?: string
  handle?: string
  ldhName?: string
  status?: string[]
  events?: Array<{ eventAction?: string; eventDate?: string }>
  entities?: RdapEntity[]
  nameservers?: Array<{ ldhName?: string }>
  [key: string]: unknown
}