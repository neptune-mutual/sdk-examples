const getBaseError = (error) => {
  if (error.error) {
    return getBaseError(error.error)
  }

  return error
}

export {
  getBaseError
}
