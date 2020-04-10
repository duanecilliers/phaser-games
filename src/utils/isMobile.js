/**
 * If device is mobile
 *
 * @returns boolean
 */
export default function () {
  const { userAgent } = navigator
  return userAgent.indexOf('Mobile') !== -1
    || userAgent.indexOf('Tablet') !== -1
}
