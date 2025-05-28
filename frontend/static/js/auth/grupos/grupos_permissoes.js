document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const permissions = window.permissionsData || [];
    const groupId = window.groupId;

    const form = document.createElement('form');
    form.id = 'group-permissions-form';

    const table = document.createElement('table');
    table.className = 'tabela-grupos';
    
    table.innerHTML = `
        <thead>
            <tr><th>Código</th><th>Descrição</th><th>Atribuído</th></tr>
        </thead>
        <tbody>
            ${permissions.map(p => `
                <tr>
                    <td>${p.code}</td>
                    <td>${p.description}</td>
                    <td style="text-align: center;">
                        <input type="checkbox" name="permissionIds[]" value="${p.id}" ${p.assigned ? 'checked' : ''}>
                    </td>
                </tr>
            `).join('')}
        </tbody>
      `;

    form.appendChild(table);

    const submit = document.createElement('button');
    submit.textContent = 'Salvar Permissões';
    form.appendChild(submit);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const selecionados = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => parseInt(cb.value));

        try {
            const response = await fetch(`/grupos/${groupId}/permissoes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': window.csrfToken
                },
                body: JSON.stringify({ permissionIds: selecionados }),
                credentials: 'include'
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erro ao salvar permissões');

            alert('Permissões atualizadas com sucesso!');
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    });

    app.appendChild(form);
});