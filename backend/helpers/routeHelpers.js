const path = require('path');

exports.renderTemplate = (templateName) => {
    const templateBase = '../../frontend/templates/'
    return (req, res) => {
        res.sendFile(
            path.join(__dirname, `${templateBase}${templateName}.html`)
        );
    };
};