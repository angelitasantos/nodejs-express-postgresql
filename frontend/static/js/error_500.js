// error_500.js - gera o HTML dinamicamente
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'ERRO 500!';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Erro Interno do Sistema!';

    const link = document.createElement('a');
    link.href = '/';
    link.textContent = 'Voltar à página inicial!';

    app.appendChild(title);
    app.appendChild(paragraph);
    app.appendChild(link);
});
