import Validation from './validation/validation';

const validation = new Validation();
validation.createNode({
  name: 'isNumber',
  matcher: /^[0-9]$/g,
  errorMsg: 'not number'
})