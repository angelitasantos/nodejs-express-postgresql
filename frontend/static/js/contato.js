// home.js - gera o HTML dinamicamente
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'Contato';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Essa é a página de entre em contato criada com HTML via JavaScript.';

    app.appendChild(title);
    app.appendChild(paragraph);
});
