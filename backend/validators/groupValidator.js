const { body } = require('express-validator');

module.exports.checkGroup = () => [
    body('name')
        .notEmpty().withMessage('Nome é obrigatório')
        .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),
    
    body('level')
        .isInt({ min: 1, max: 100 }).withMessage('Nível deve ser entre 1-100'),
    
    body('description')
        .optional()
        .trim()
        .escape()
];