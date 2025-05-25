const { renderTemplate } = require('../helpers/routeHelpers');

module.exports = {
    home: renderTemplate('index'),
    sobre: renderTemplate('sobre'),
    contato: renderTemplate('contato')
};