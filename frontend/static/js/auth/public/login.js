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
        { type: 'email', name: 'email', for: 'E-mail', required: true },
        { type: 'password', name: 'password', for: 'Senha', required: true }
    ];

    campos.forEach(campo => {
        const container = document.createElement('div');
        container.className = 'form-group';

        const labelForm = document.createElement('label');
        labelForm.htmlFor = campo.name;
        labelForm.textContent = campo.for;

        const input = document.createElement('input');
        input.type = campo.type;
        input.name = campo.name;
        input.id = campo.for;
        if (campo.required) input.required = true;

        container.appendChild(labelForm);
        container.appendChild(input);
        form.appendChild(container);
    });

    const btn = document.createElement('button');
    const linha = document.createElement('div');
    btn.type = 'submit';
    btn.textContent = 'Entrar';
    btn.className = 'btn';
    form.appendChild(btn);
    form.appendChild(linha);

    const link = document.createElement('a');
    link.href = '/esqueceu_senha';
    link.textContent = 'Esqueceu a senha?';
    form.appendChild(link);

    app.appendChild(form);
});
