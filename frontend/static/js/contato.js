// contato.js - Gera todo o formulário dinamicamente
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    
    // Limpa o conteúdo existente (se necessário)
    app.innerHTML = '';

    // Cria o título
    const title = document.createElement('h1');
    title.textContent = 'Contato';
    app.appendChild(title);

    // Cria o formulário
    const form = document.createElement('form');
    form.setAttribute('action', '/enviar-contato');
    form.setAttribute('method', 'POST');
    form.setAttribute('id', 'form-contato');

    // Array com os campos do formulário
    const campos = [
        { type: 'text', name: 'nome', placeholder: 'Seu nome', required: true },
        { type: 'email', name: 'email', placeholder: 'Seu e-mail', required: true },
        { type: 'text', name: 'assunto', placeholder: 'Assunto', required: false },
        { type: 'textarea', name: 'mensagem', placeholder: 'Sua mensagem', required: true }
    ];

    // Cria os campos do formulário
    campos.forEach(campo => {
        const container = document.createElement('div');
        container.className = 'form-group';

        if (campo.type === 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.setAttribute('name', campo.name);
            textarea.setAttribute('placeholder', campo.placeholder);
            if (campo.required) textarea.setAttribute('required', '');
            container.appendChild(textarea);
        } else {
            const input = document.createElement('input');
            input.setAttribute('type', campo.type);
            input.setAttribute('name', campo.name);
            input.setAttribute('placeholder', campo.placeholder);
            if (campo.required) input.setAttribute('required', '');
            container.appendChild(input);
        }

        form.appendChild(container);
    });

    // Cria o botão de submit
    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = 'Enviar';
    submitBtn.className = 'btn';
    form.appendChild(submitBtn);

    // Adiciona o formulário ao app
    app.appendChild(form);

    const csrfInput = document.createElement('input');
    csrfInput.setAttribute('type', 'hidden');
    csrfInput.setAttribute('name', '_csrf');
    csrfInput.setAttribute('value', document.querySelector('meta[name="csrf-token"]').content);
    form.appendChild(csrfInput);

    // Adiciona feedback (se houver parâmetros na URL)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('sucesso')) {
        const feedback = document.createElement('p');
        feedback.className = 'sucesso';
        feedback.textContent = 'Mensagem enviada com sucesso!';
        form.appendChild(feedback);
    }

    if (urlParams.has('erro')) {
        const feedback = document.createElement('p');
        feedback.className = 'erro';
        feedback.textContent = 'Ocorreu um erro. Tente novamente.';
        form.appendChild(feedback);
    }

    document.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('input', (e) => {
            if (e.target.value.trim() !== '') {
                e.target.style.borderColor = '#ddd';
            }
        });
    });
});