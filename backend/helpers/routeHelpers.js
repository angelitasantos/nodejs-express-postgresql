const path = require('path');

exports.renderTemplate = (templateName) => {
    return (req, res) => {
        res.render(templateName);
    };
};