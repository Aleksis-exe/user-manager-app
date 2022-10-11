export function maskString(str: string, mask: string, split: string) {
  if (!mask) return str

  const numeric = str.split('').filter((item: string) => {
    if (split.split('').indexOf(item) === -1) {
      return item
    }
    return
  })
  console.log('numeric:', numeric)

  let idx = 0

  const formated = mask.split('').map((el) => {
    if (el === '#') {
      el = numeric[idx]
      idx++
    }
    return el
  })

  return formated.join('')
}
