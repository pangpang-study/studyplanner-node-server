const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(50),
                allowNULL: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(50),
                allowNULL: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNULL: true,
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            paranoid: true,
        });
    }
}