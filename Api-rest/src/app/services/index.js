const validationHandler = next => result => {
  console.log(next)
    if (result.isEmpty()) return
    if (!next)
      throw new Error(
        result.array().map(i => `'${i.param}' has ${i.msg}`).join(' ')
      )
  else
    return next(
      new Error(
       result.array().map(i => `'${i.param}' has ${i.msg}`).join('')
      )
    )
  }

  module.exports = {validationHandler}