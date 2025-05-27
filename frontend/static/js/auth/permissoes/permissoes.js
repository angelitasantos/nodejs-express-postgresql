document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const permissoes = window.permissionsData || [];

    const form = document.createElement('form');
    form.id = 'nova-permissao';

    form.innerHTML = `
        <h2>Nova Permissão</h2>
        <input type="text" name="code" placeholder="Código (ex: users:create)" required>
        <input type="text" name="description" placeholder="Descrição" required>
        <button type="submit">Salvar</button>
    `;
    app.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const code = form.elements['code'].value.trim();
        const description = form.elements['description'].value.trim();

        try {
            const response = await fetch('/permissoes/api/permissoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': window.csrfToken
                },
                body: JSON.stringify({ code, description }),
                credentials: 'include'
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erro ao criar permissão');
            alert('Permissão criada!');
            location.reload();
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    });

    const table = document.createElement('table');
    table.className = 'tabela-permissoes';
    
    table.innerHTML = `
        <thead>
            <tr><th>Código</th><th>Descrição</th><th>Ativo</th></tr>
        </thead>
        <tbody>
            ${permissoes.map(p => `
                <tr>
                    <td>${p.code}</td>
                    <td>${p.description}</td>
                    <td>${p.is_active ? 'Sim' : 'Não'}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    app.appendChild(table);
});
