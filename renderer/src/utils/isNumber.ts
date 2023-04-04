export function isNumber(input : string) {
  return /^-?\d*(\.\d+)?$/.test(input)
}
