export function normalizeDomain(value: string) {
  return value.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0]
}

export function isValidDomain(value: string) {
  return /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(
    value
  )
}