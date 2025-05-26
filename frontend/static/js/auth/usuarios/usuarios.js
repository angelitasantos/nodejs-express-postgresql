document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const title = document.createElement('h1');
    title.textContent = 'Lista de Usuários';
    app.appendChild(title);

    const addBtn = document.createElement('a');
    addBtn.href = '/usuarios/novo';
    addBtn.textContent = 'Criar Novo Usuário';
    addBtn.className = 'btn';
    app.appendChild(addBtn);

    const table = document.createElement('table');
    table.className = 'tabela-usuarios';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const exemplo = [
        { id: 1, nome: 'João', email: 'joao@email.com', ativo: true },
        { id: 2, nome: 'Maria', email: 'maria@email.com', ativo: false }
    ];

    exemplo.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.ativo ? 'Ativo' : 'Inativo'}</td>
            <td>
                <a href="/usuarios/1/editar?id=${user.id}">Editar</a>
            </td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    app.appendChild(table);
});
