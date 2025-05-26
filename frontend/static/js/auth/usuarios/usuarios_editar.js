document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    app.innerHTML = '';

    const title = document.createElement('h1');
    title.textContent = `Editar Usuário #${id}`;
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('action', `/usuarios/${id}`);
    form.setAttribute('method', 'POST');
    form.id = 'form-usuario';

    const campos = [
        { type: 'text', name: 'name', placeholder: 'Nome', value: 'Nome Exemplo' },
        { type: 'email', name: 'email', placeholder: 'E-mail', value: 'exemplo@email.com' }
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
    submitBtn.textContent = 'Atualizar';
    form.appendChild(submitBtn);

    app.appendChild(form);
});
