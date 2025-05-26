document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'Criar Novo Grupo';
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('action', '/grupos');
    form.setAttribute('method', 'POST');
    form.id = 'form-grupo';

    const campos = [
        { type: 'text', name: 'nome', placeholder: 'Nome do Grupo', required: true },
        { type: 'text', name: 'descricao', placeholder: 'Descrição', required: true }
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
