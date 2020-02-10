const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://svizbnfl:dPv90ypa_lAiAaoa_VcpvDR_D4MJIql4@john.db.elephantsql.com:5432/svizbnfl', { dialect: 'postgres' });

const todo = require('./models/todo')(sequelize, Sequelize);

const db = {
    Sequelize,
    sequelize,
    todo
};

db.sequelize.sync({
    // force: true
});

module.exports = db;
