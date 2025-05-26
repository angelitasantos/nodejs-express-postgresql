document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const title = document.createElement('h1');
    title.textContent = 'Recuperar Senha';
    app.appendChild(title);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/esqueceu_senha';
    form.id = 'form-esqueci';

    const div = document.createElement('div');
    div.className = 'form-group';
    const input = document.createElement('input');
    input.type = 'email';
    input.name = 'email';
    input.placeholder = 'Digite seu e-mail';
    input.required = true;
    div.appendChild(input);
    form.appendChild(div);

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = 'Enviar link de redefinição';
    form.appendChild(btn);

    app.appendChild(form);
});
