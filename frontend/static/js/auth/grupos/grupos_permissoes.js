document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const urlParams = new URLSearchParams(window.location.search);
    const grupoId = urlParams.get('id') || 1; // Exemplo de ID
    const grupoNome = 'OPERACIONAL'; // Em um cenário real, buscar via API

    const title = document.createElement('h1');
    title.textContent = `Permissões do Grupo: ${grupoNome}`;
    app.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', `/grupos/permissoes/${grupoId}`);
    form.id = 'form-permissoes';

    // Simulação de páginas do sistema e permissões atuais
    const paginasSistema = [
        { pagina: '/usuarios/lista_usuarios', label: 'Usuários' },
        { pagina: '/usuarios/cria_usuario', label: 'Criar Usuário' },
        { pagina: '/grupos/lista_grupos', label: 'Grupos' },
        { pagina: '/grupos/permissoes_grupo', label: 'Permissões de Grupos' },
        { pagina: '/producao/lista', label: 'Produção' }
    ];

    const permissoesGrupoAtual = [
        '/usuarios/lista_usuarios',
        '/grupos/lista_grupos'
    ];

    const list = document.createElement('ul');
    list.className = 'checkbox-list';

    paginasSistema.forEach(pagina => {
        const item = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'permissoes';
        checkbox.value = pagina.pagina;
        checkbox.id = pagina.pagina;
        if (permissoesGrupoAtual.includes(pagina.pagina)) {
            checkbox.checked = true;
        }

        const label = document.createElement('label');
        label.setAttribute('for', pagina.pagina);
        label.textContent = pagina.label;

        item.appendChild(checkbox);
        item.appendChild(label);
        list.appendChild(item);
    });

    form.appendChild(list);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Salvar Permissões';
    form.appendChild(submitBtn);

    app.appendChild(form);
});
