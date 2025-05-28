const userModel = require('../../models/auth/userModel');
const bcrypt = require('bcrypt');

module.exports = {

    // --- Métodos para API ---
    async listUsers() {
        return await userModel.getAll();
    },

    async createUser(userData) {
        if (!userData.password) throw new Error('Senha é obrigatória');
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await userModel.create({ ...userData, password: hashedPassword });
    },

    async updateUser(id, userData) {
        if (!userData.name || !userData.email) {
            throw new Error('Nome e e-mail são obrigatórios');
        }
        return await userModel.update(id, userData);
    },

    async toggleUserStatus(id, is_active) {
        if (typeof is_active !== 'boolean') throw new Error('Status inválido');
        return await userModel.toggleActive(id, is_active);
    },

    // --- Métodos para Views ---
    async getUsersForTemplate() {
        const users = await userModel.getAll();
        return users.map(user => ({ ...user, isAdmin: user.role === 'admin' }));
    }

};