/**
 * @param {string} money
 * @returns {String}
 */
export function formatVnMoney(money) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  return money !== '' && money !== null && money !== undefined
    ? formatter.format(money).slice(0, formatter.format(money).length - 1).replaceAll('.', ',') + 'VND'
    : ''
}
