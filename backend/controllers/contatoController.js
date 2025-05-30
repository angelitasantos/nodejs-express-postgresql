const db = require('../../database/data/db');

exports.salvarContato = async (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    
    try {
        const result = await db.query(
            'INSERT INTO contatos (nome, email, assunto, mensagem) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, assunto || 'Geral', mensagem]
        );
        
        res.redirect('/contato?sucesso=1');
    } catch (err) {
        res.redirect('/contato?erro=1');
    }
};