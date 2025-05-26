// error_404.js - gera o HTML dinamicamente
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'ERRO 404!';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Página Não Encontrada ou Você não tem acesso a esta página.';

    app.appendChild(title);
    app.appendChild(paragraph);
});
