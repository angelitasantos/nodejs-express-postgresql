document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'Editar Pagina';
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.id = 'form-grupo';

    const page = window.pageData || {};

    const campos = [
        { type: 'text', name: 'route', placeholder: 'Rota', required: true, value: page.route || '' },
        { type: 'text', name: 'name', placeholder: 'Nome', required: true, value: page.name || '' },
        { type: 'text', name: 'module', placeholder: 'Modulo', required: true, value: page.module || 1 }
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
        const pageId = page.id;

        const formData = {
            route: form.elements['route'].value,
            name: form.elements['name'].value,
            module: form.elements['module'].value
        };

        try {
            const response = await fetch(`/paginas/api/pages/${pageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': csrfToken
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Erro ao atualizar página');

            window.location.href = '/paginas';
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message);
        }
    });
});
