document.addEventListener('DOMContentLoaded', async () => {
    const app = document.getElementById('app');
    
    // Mostrar loader enquanto carrega os dados
    app.innerHTML = '<div class="loader">Carregando registros...</div>';

    try {
        // 1. Buscar os registros da API
        const response = await fetch('/grupos/api/grupos');
        
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
        title.textContent = 'Lista de Grupos';
        app.appendChild(title);

        const addBtn = document.createElement('a');
        addBtn.href = '/grupos/novo';
        addBtn.textContent = 'Criar Novo Grupo';
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
                    <th>Descrição</th>
                    <th>Nível</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            `;
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            
            registros.forEach(registro => {
                const tr = document.createElement('tr');
                tr.dataset.id = registro.id;
                
                // Coluna de status com toggle
                const statusCell = document.createElement('td');
                const statusToggle = document.createElement('label');
                statusToggle.className = 'switch';
                statusToggle.innerHTML = `
                    <input type="checkbox" ${registro.is_active ? 'checked' : ''}>
                    <span class="slider round"></span>
                    <span class="status-text">${registro.is_active ? 'Ativo' : 'Inativo'}</span>
                `;
                
                // Evento para toggle de status
                statusToggle.querySelector('input').addEventListener('change', async (e) => {
                    try {
                        // Obter o token CSRF do meta tag (adicione isso ao seu template base)
                        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
                        
                        const response = await fetch(`/grupos/api/grupos/${registro.id}/toggle-status`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-Token': csrfToken // Adicione o token CSRF
                            },
                            credentials: 'include' // Importante para cookies/sessão
                        });
                        
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.error || 'Falha ao alterar status');
                        }
                        
                        const result = await response.json();
                        if (result.success) {
                            const statusText = statusToggle.querySelector('.status-text');
                            statusText.textContent = e.target.checked ? 'Ativo' : 'Inativo';
                            showToast('Status atualizado com sucesso!');
                        }
                    } catch (error) {
                        console.error('Erro ao alterar status:', error);
                        e.target.checked = !e.target.checked; // Reverte a mudança
                        showToast(error.message || 'Erro ao alterar status', 'error');
                    }
                });
                
                statusCell.appendChild(statusToggle);
                
                // Coluna de ações com delete
                const actionsCell = document.createElement('td');
                actionsCell.className = 'actions';
                actionsCell.innerHTML = `
                    <a href="/grupos/${registro.id}/editar" class="btn btn-editar">Editar</a>
                    <a href="/grupos/${registro.id}/paginas" class="btn btn-paginas">Páginas</a>
                    <a href="/grupos/${registro.id}/permissoes" class="btn btn-permissoes">Permissões</a>
                    <button class="btn btn-delete" data-id="${registro.id}">Excluir</button>
                `;
                
                // Evento para deletar
                const deleteBtn = actionsCell.querySelector('.btn-delete');
                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    confirmDelete(registro.id, registro.name);
                });
                
                tr.innerHTML = `
                    <td>${registro.name}</td>
                    <td>${registro.description}</td>
                    <td>${registro.level}</td>
                `;
                
                tr.appendChild(statusCell);
                tr.appendChild(actionsCell);
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
        console.error('Erro ao carregar registros:', error);
        app.innerHTML = `
            <div class="error">
                <p>Erro ao carregar lista de registros</p>
                <p>${error.message}</p>
                <button onclick="window.location.reload()">Tentar novamente!</button>
            </div>
        `;
    }
});

// Função para confirmar exclusão
function confirmDelete(id, name) {
    if (confirm(`Tem certeza que deseja excluir o registro "${name}"? Esta ação não pode ser desfeita.`)) {
        deleteGroup(id);
    }
}

// Função para deletar registro via API
async function deleteGroup(id) {
    try {
        // Obter o token CSRF
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        
        const response = await fetch(`/grupos/api/grupos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken // Adicionando o token CSRF
            },
            credentials: 'include' // Importante para cookies/sessão
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha ao excluir grupo');
        }
        
        const result = await response.json();
        if (result.success) {
            showToast('Registro excluído com sucesso!');
            // Remove a linha da tabela
            const row = document.querySelector(`tr[data-id="${id}"]`);
            if (row) row.remove();
            
            // Atualiza a tabela se não houver mais itens
            if (document.querySelectorAll('tbody tr').length === 0) {
                const app = document.getElementById('app');
                const noData = document.createElement('p');
                noData.textContent = 'Nenhum registro encontrado!';
                app.appendChild(noData);
            }
        }
    } catch (error) {
        console.error('Erro ao excluir registro:', error);
        showToast(error.message || 'Erro ao excluir registro', 'error');
    }
}

// Função para mostrar notificações (toast)
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}