document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const title = document.createElement('h1');
    title.textContent = 'Criar Novo Usuário';
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('action', '/usuarios');
    form.setAttribute('method', 'POST');
    form.id = 'form-usuario';

    const campos = [
        { type: 'text', name: 'name', placeholder: 'Nome', required: true },
        { type: 'email', name: 'email', placeholder: 'E-mail', required: true },
        { type: 'password', name: 'password', placeholder: 'Senha', required: true }
    ];

    campos.forEach(campo => {
        const container = document.createElement('div');
        container.className = 'form-group';

        const input = document.createElement('input');
        input.type = campo.type;
        input.name = campo.name;
        input.placeholder = campo.placeholder;
        if (campo.required) input.required = true;

        container.appendChild(input);
        form.appendChild(container);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Salvar';
    form.appendChild(submitBtn);

    app.appendChild(form);
});
