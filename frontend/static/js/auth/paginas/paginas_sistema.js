document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const pages = window.pagesData || [];

    app.innerHTML = '';
        
    const title = document.createElement('h1');
    title.textContent = 'Lista de Paginas';
    app.appendChild(title);

    const addBtn = document.createElement('a');
    addBtn.href = '/paginas/novo';
    addBtn.textContent = 'Criar Nova Pagina';
    addBtn.className = 'btn';
    app.appendChild(addBtn);

    if (pages.length > 0) {
        const table = document.createElement('table');
        table.className = 'tabela-registros';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Rota</th>
                <th>Nome</th>
                <th>Módulo</th>
                <th>Ativo</th>
                <th>Ações</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        
        pages.forEach(page => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${page.route}</td>
                <td>${page.name}</td>
                <td>${page.module}</td>
                <td>${page.is_active ? 'Sim' : 'Não'}</td>
                <td>
                    <a href="/paginas/${page.id}/editar" class="btn btn-editar">Editar</a>
                </td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        app.appendChild(table);
    } else {
        // Mostrar mensagem se não houver paginas
        const noData = document.createElement('h1');
        noData.textContent = 'Nenhum página encontrada!';
        app.appendChild(noData);
    }
});
