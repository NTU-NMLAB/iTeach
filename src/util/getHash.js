function hashCore(strIn) {
  if (typeof strIn !== 'string') return undefined
  let hashValue = 0
  for (let it = 0; it < strIn.length; it += 1) {
    hashValue = (hashValue * 31) + strIn.charCodeAt(it)
    hashValue %= 4294967296
  }
  return hashValue
}
// The above implementation is for readability!
// Bitwise operations are recommended:
// x * 31 === (x << 5) - x
// hashValue % 2^32 === hashValue & hashValue

export default function getHash(objIn) {
  if (typeof objIn === 'undefined') return undefined
  if (typeof objIn !== 'object') return hashCore(JSON.stringify([objIn]))
  return hashCore(JSON.stringify(objIn))
}
