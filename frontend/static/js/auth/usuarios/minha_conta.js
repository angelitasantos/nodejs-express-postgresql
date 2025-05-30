document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const user = window.userData || {};

    const form = document.createElement('form');
    form.method = 'POST';
    form.id = 'form-minha-conta';

    const campos = [
        { label: 'Nome', type: 'text', name: 'nome', value: user.nome || '', required: true },
        { label: 'Senha Atual', type: 'password', name: 'senha_atual', required: false },
        { label: 'Nova Senha', type: 'password', name: 'nova_senha', required: false }
    ];

    campos.forEach(({ label, ...attr }) => {
        const div = document.createElement('div');
        const lbl = document.createElement('label');
        lbl.textContent = label;
        const input = document.createElement('input');
        Object.assign(input, attr);
        div.append(lbl, input);
        form.appendChild(div);
    });

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Salvar';
    form.appendChild(submit);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = {
          nome: form.elements['nome'].value,
          senha_atual: form.elements['senha_atual'].value,
          nova_senha: form.elements['nova_senha'].value
        };

        try {
            const res = await fetch('/auth/minha_conta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': window.csrfToken
              },
              body: JSON.stringify(body),
              credentials: 'include'
            });

            if (!res.ok) throw new Error('Erro ao atualizar conta');
            alert('Dados atualizados com sucesso');
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    });

    app.appendChild(form);
});
