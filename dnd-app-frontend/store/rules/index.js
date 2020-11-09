const getters = {
  requiredRule: () => v => !!v || 'Field cannot be empty',
  maxTenRule: () => v => !v || (v && v.length <= 10) || 'Field must be less than 10 characters',
  emailRule: () => v => !v || /.+@.+/.test(v) || 'E-mail must be valid',
  numericRule: () => v => !v || typeof v === 'number' || 'Field must be numeric'
}

export default {
  namespaced: true,
  getters
}
