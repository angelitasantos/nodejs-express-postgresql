document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const pages = window.pagesData || [];
    const groupId = window.groupId;

    const form = document.createElement('form');
    form.id = 'group-pages-form';

    const table = document.createElement('table');
    table.className = 'tabela-grupos';
    
    table.innerHTML = `
        <thead>
            <tr>
                <th>Módulo</th>
                <th>Nome</th>
                <th>Rota</th>
                <th>Acesso</th>
            </tr>
        </thead>
        <tbody>
            ${pages.map(page => `
                <tr>
                    <td>${page.module}</td>
                    <td>${page.name}</td>
                    <td>${page.route}</td>
                    <td style="text-align: center;">
                        <input type="checkbox" name="pageIds[]" value="${page.id}" ${page.can_view ? 'checked' : ''}>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    form.appendChild(table);

    const submit = document.createElement('button');
    submit.textContent = 'Salvar Acesso às Páginas';
    form.appendChild(submit);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const selecionados = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => parseInt(cb.value));

        try {
            const response = await fetch(`/grupos/${groupId}/paginas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': window.csrfToken
                },
                body: JSON.stringify({ pageIds: selecionados }),
                credentials: 'include'
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erro ao salvar páginas');

            alert('Páginas atualizadas com sucesso!');
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    });

    app.appendChild(form);
});
