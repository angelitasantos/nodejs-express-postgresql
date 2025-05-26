document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const title = document.createElement('h1');
    title.textContent = 'Lista de Grupos';
    app.appendChild(title);

    const addBtn = document.createElement('a');
    addBtn.href = '/grupos/novo';
    addBtn.textContent = 'Criar Novo Grupo';
    addBtn.className = 'btn';
    app.appendChild(addBtn);

    const table = document.createElement('table');
    table.className = 'tabela-grupos';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const gruposExemplo = [
        { id: 1, nome: 'SUPER', descricao: 'Acesso total ao sistema' },
        { id: 2, nome: 'OPERACIONAL', descricao: 'Acesso a operações básicas' }
    ];

    gruposExemplo.forEach(grupo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${grupo.nome}</td>
            <td>${grupo.descricao}</td>
            <td>
              <a href="/grupos/1/editar?id=${grupo.id}">Editar</a>
            </td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    app.appendChild(table);
});
