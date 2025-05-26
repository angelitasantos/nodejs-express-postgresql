document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const title = document.createElement('h1');
    title.textContent = 'Minha Conta';
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('action', '/usuarios/minha_conta');
    form.setAttribute('method', 'POST');
    form.id = 'form-minha-conta';

    const campos = [
        { type: 'text', name: 'name', placeholder: 'Nome', value: 'Usuário Atual' },
        { type: 'email', name: 'email', placeholder: 'E-mail', value: 'usuario@exemplo.com' },
        { type: 'password', name: 'password', placeholder: 'Nova Senha (opcional)', value: '' }
    ];

    campos.forEach(campo => {
        const container = document.createElement('div');
        container.className = 'form-group';

        const input = document.createElement('input');
        input.type = campo.type;
        input.name = campo.name;
        input.placeholder = campo.placeholder;
        input.value = campo.value;

        container.appendChild(input);
        form.appendChild(container);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Salvar Alterações';
    form.appendChild(submitBtn);

    app.appendChild(form);
});
