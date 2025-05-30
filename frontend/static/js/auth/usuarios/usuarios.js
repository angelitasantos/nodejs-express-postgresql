document.addEventListener('DOMContentLoaded', async () => {
    const app = document.getElementById('app');
    
    // Mostrar loader enquanto carrega os dados
    app.innerHTML = '<div class="loader">Carregando registros...</div>';

    try {
        // 1. Buscar os registros da API
        const response = await fetch('/usuarios/api/usuarios');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 2. Verificar se a requisição foi bem sucedida e tem dados
        if (!data.success || !data.data) {
            throw new Error('Dados inválidos retornados pela API');
        }
        
        const registros = data.data.rows || data.data;
        
        // 3. Limpar o container e construir a interface
        app.innerHTML = '';
        
        const title = document.createElement('h1');
        title.textContent = 'Lista de Usuários';
        app.appendChild(title);

        const addBtn = document.createElement('a');
        addBtn.href = '/usuarios/novo';
        addBtn.textContent = 'Criar Novo Usuário';
        addBtn.className = 'btn';
        app.appendChild(addBtn);

        // 4. Criar tabela apenas se houver registros
        if (registros.length > 0) {
            const table = document.createElement('table');
            table.className = 'tabela-registros';

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
            
            registros.forEach(registro => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${registro.name}</td>
                    <td>${registro.email}</td>
                    <td>${registro.ativo ? 'Ativo' : 'Inativo'}</td>
                    <td>
                        <a href="/usuarios/${registro.id}/editar" class="btn btn-editar">Editar</a>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            app.appendChild(table);
        } else {
            // Mostrar mensagem se não houver registros
            const noData = document.createElement('p');
            noData.textContent = 'Nenhum registro encontrado!';
            app.appendChild(noData);
        }
        
    } catch (error) {
        // 5. Tratamento de erros
        console.error('Erro ao carregar registro:', error);
        app.innerHTML = `
            <div class="error">
                <p>Erro ao carregar lista de registros</p>
                <p>${error.message}</p>
                <button onclick="window.location.reload()">Tentar novamente!</button>
            </div>
        `;
    }
});
