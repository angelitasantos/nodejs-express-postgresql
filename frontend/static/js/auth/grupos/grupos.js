document.addEventListener('DOMContentLoaded', async () => {
    const app = document.getElementById('app');
    
    // Mostrar loader enquanto carrega os dados
    app.innerHTML = '<div class="loader">Carregando grupos...</div>';

    try {
        // 1. Buscar os grupos da API
        const response = await fetch('/grupos/api/grupos');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 2. Verificar se a requisição foi bem sucedida e tem dados
        if (!data.success || !data.data) {
            throw new Error('Dados inválidos retornados pela API');
        }
        
        const grupos = data.data.rows || data.data; // Adaptação para diferentes formatos de resposta
        
        // 3. Limpar o container e construir a interface
        app.innerHTML = '';
        
        const title = document.createElement('h1');
        title.textContent = 'Lista de Grupos';
        app.appendChild(title);

        const addBtn = document.createElement('a');
        addBtn.href = '/grupos/novo';
        addBtn.textContent = 'Criar Novo Grupo';
        addBtn.className = 'btn';
        app.appendChild(addBtn);

        // 4. Criar tabela apenas se houver grupos
        if (grupos.length > 0) {
            const table = document.createElement('table');
            table.className = 'tabela-grupos';

            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Nível</th>
                    <th>Ações</th>
                </tr>
            `;
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            
            grupos.forEach(grupo => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${grupo.name}</td>
                    <td>${grupo.description}</td>
                    <td>${grupo.level}</td>
                    <td>
                        <a href="/grupos/${grupo.id}/editar" class="btn btn-editar">Editar</a>
                        <a href="/grupos/${grupo.id}/paginas" class="btn btn-editar">Páginas</a>
                        <a href="/grupos/${grupo.id}/permissoes" class="btn btn-editar">Permissões</a>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            app.appendChild(table);
        } else {
            // Mostrar mensagem se não houver grupos
            const noData = document.createElement('p');
            noData.textContent = 'Nenhum grupo encontrado.';
            app.appendChild(noData);
        }
        
    } catch (error) {
        // 5. Tratamento de erros
        console.error('Erro ao carregar grupos:', error);
        app.innerHTML = `
            <div class="error">
                <p>Erro ao carregar lista de grupos</p>
                <p>${error.message}</p>
                <button onclick="window.location.reload()">Tentar novamente</button>
            </div>
        `;
    }
});