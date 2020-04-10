export default const isMobile = () => {
  const { userAgent } = navigator
  userAgent.indexOf('Mobile') !== -1
    || userAgent.indexOf('Tablet') !== -1
}
