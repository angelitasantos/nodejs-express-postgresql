document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const token = new URLSearchParams(window.location.search).get('token') || '';

    const title = document.createElement('h1');
    title.textContent = 'Redefinir Senha';
    app.appendChild(title);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/redefinir_senha';
    form.id = 'form-redefinir';

    const hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.name = 'token';
    hidden.value = token;
    form.appendChild(hidden);

    const campos = [
        { name: 'nova_senha', for: 'Nova senha' },
        { name: 'confirmar_senha', for: 'Confirmar nova senha' }
    ];

    campos.forEach(campo => {
        const container = document.createElement('div');
        container.className = 'form-group';
        
        const labelForm = document.createElement('label');
        labelForm.htmlFor = campo.name;
        labelForm.textContent = campo.for;

        const input = document.createElement('input');
        input.type = 'password';
        input.name = campo.name;
        input.id = campo.for;
        input.required = true;

        container.appendChild(labelForm);
        container.appendChild(input);
        form.appendChild(container);
    });

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = 'Redefinir';
    btn.className = 'btn';
    form.appendChild(btn);

    app.appendChild(form);
});
