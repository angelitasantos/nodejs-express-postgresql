document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'Entrar no Sistema';
    app.appendChild(title);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/login';
    form.id = 'form-login';

    const campos = [
        { type: 'email', name: 'email', placeholder: 'E-mail', required: true },
        { type: 'password', name: 'password', placeholder: 'Senha', required: true }
    ];

    campos.forEach(c => {
        const div = document.createElement('div');
        div.className = 'form-group';
        const input = document.createElement('input');
        input.type = c.type;
        input.name = c.name;
        input.placeholder = c.placeholder;
        if (c.required) input.required = true;
        div.appendChild(input);
        form.appendChild(div);
    });

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = 'Entrar';
    form.appendChild(btn);

    const link = document.createElement('a');
    link.href = '/esqueceu_senha';
    link.textContent = 'Esqueceu a senha?';
    form.appendChild(link);

    app.appendChild(form);
});
