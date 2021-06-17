export default function simpleProtect(cookieObj) {
  if (cookieObj.api === process.env.INTERNAL_API_SECRET) {
    return true
  }
  return false
}
