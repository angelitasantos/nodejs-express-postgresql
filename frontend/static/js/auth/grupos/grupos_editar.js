document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'Editar Grupo';
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.id = 'form-grupo';

    const group = window.groupData || {};

    const campos = [
        { type: 'text', name: 'name', for: 'Nome', required: true, value: group.name || '' },
        { type: 'text', name: 'description', for: 'Descrição', required: false, value: group.description || '' },
        { type: 'number', name: 'level', for: 'Nivel', required: true, value: group.level || 1 }
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
        input.required = campo.required;
        input.value = campo.value;

        container.appendChild(labelForm);
        container.appendChild(input);
        form.appendChild(container);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Salvar Alterações';
    submitBtn.className = 'btn';
    form.appendChild(submitBtn);

    app.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const csrfToken = window.csrfToken;
        const groupId = group.id;

        const formData = {
            name: form.elements['name'].value,
            description: form.elements['description'].value,
            level: form.elements['level'].value
        };

        try {
            const response = await fetch(`/grupos/api/grupos/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': csrfToken
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Erro ao atualizar grupo');

            window.location.href = '/grupos';
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message);
        }
    });
});
