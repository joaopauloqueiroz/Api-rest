const { body } = require('express-validator/check')

exports.validate = (method) => {
    switch (method) {
        case 'createProduct': {
                return [
                    body('name', 'O nome precisa ser preenchido!').isLength(),
                    body('email', 'E-mail inválido!').isEmail(),
                ]
            }
        default: break;
    }
}
