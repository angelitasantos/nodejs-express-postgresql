// error_500.js - gera o HTML dinamicamente
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'ERRO 500!';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Erro Interno do Sistema!';

    app.appendChild(title);
    app.appendChild(paragraph);
});
