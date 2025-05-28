const { renderTemplate } = require('../helpers/routeHelpers');
const contatoController = require('../controllers/contatoController');

module.exports = {
    home: renderTemplate('index'),
    menu: renderTemplate('menu'),
    sobre: renderTemplate('sobre'),
    contato: renderTemplate('contato'),
    salvarContato: contatoController.salvarContato
};