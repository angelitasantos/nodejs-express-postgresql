document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'Editar Usuário';
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.id = 'form-grupo';

    const user = window.userData || {};

    const campos = [
        { type: 'text', name: 'name', placeholder: 'Nome', required: true, value: user.name || '' },
        { type: 'email', name: 'email', placeholder: 'Email', required: true, value: user.email || '' }
    ];

    campos.forEach(campo => {
        const container = document.createElement('div');
        container.className = 'form-group';

        const input = document.createElement('input');
        input.type = campo.type;
        input.name = campo.name;
        input.placeholder = campo.placeholder;
        input.required = campo.required;
        input.value = campo.value;

        container.appendChild(input);
        form.appendChild(container);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Salvar Alterações';
    form.appendChild(submitBtn);

    app.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const csrfToken = window.csrfToken;
        const userId = user.id;

        const formData = {
            name: form.elements['name'].value,
            email: form.elements['email'].value
        };

        try {
            const response = await fetch(`/usuarios/api/usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': csrfToken
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Erro ao atualizar usuário');

            window.location.href = '/usuarios';

        } catch (error) {
            console.error('Erro:', error);
            alert(error.message);
        }
    });

    app.appendChild(form);
});
