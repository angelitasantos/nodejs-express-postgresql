document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const token = new URLSearchParams(window.location.search).get('token') || '';

    const title = document.createElement('h1');
    title.textContent = 'Redefinir Senha';
    app.appendChild(title);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/redefinir_senha';
    form.id = 'form-redefinir';

    const hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.name = 'token';
    hidden.value = token;
    form.appendChild(hidden);

    const campos = [
        { name: 'nova_senha', placeholder: 'Nova senha' },
        { name: 'confirmar_senha', placeholder: 'Confirmar nova senha' }
    ];

    campos.forEach(c => {
        const div = document.createElement('div');
        div.className = 'form-group';
        const input = document.createElement('input');
        input.type = 'password';
        input.name = c.name;
        input.placeholder = c.placeholder;
        input.required = true;
        div.appendChild(input);
        form.appendChild(div);
    });

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = 'Redefinir';
    form.appendChild(btn);

    app.appendChild(form);
});
