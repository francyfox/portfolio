export const stringError = (key: string) => {
  return {
    required_error: `${key} is required`,
    invalid_type_error: `${key} must be a string`,
  }
}
