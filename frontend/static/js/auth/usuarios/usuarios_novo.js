document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'Criar Novo Usuario';
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('action', '/usuarios/api/usuarios');
    form.setAttribute('method', 'POST');
    form.id = 'form-grupo';
  
    const campos = [
        { type: 'text', name: 'name', placeholder: 'Nome', required: true },
        { type: 'email', name: 'email', placeholder: 'Email', required: true },
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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const csrfToken = window.csrfToken;
        const formData = {
            name: form.elements['name'].value,
            email: form.elements['email'].value,
            password: form.elements['password'].value
        };

        try {
            const response = await fetch('/usuarios/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': csrfToken
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Erro ao criar usuário');

            window.location.href = '/usuarios';

        } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Erro inesperado');
        }
    });

    app.appendChild(form);
});
