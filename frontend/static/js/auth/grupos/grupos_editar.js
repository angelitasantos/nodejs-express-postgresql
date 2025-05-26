document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const title = document.createElement('h1');
    title.textContent = `Editar Grupo #${id}`;
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('action', `/grupos/${id}`);
    form.setAttribute('method', 'POST');
    form.id = 'form-grupo';

    const campos = [
        { type: 'text', name: 'nome', placeholder: 'Nome do Grupo', value: 'ExemploGrupo' },
        { type: 'text', name: 'descricao', placeholder: 'Descrição', value: 'Descrição atual do grupo' }
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
