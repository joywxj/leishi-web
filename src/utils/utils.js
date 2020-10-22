function formatDict (code,dict) {
  let result = ''
  dict.forEach(item => {
    if (code === item.paramCode) {
      result = item.showValue
    }
  })
  return result
}

export {
  formatDict
}
