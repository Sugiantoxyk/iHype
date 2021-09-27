var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const TransactionModel = sequelizeInstance.define('transaction', {
    session: {
        type: Sequelize.INTEGER,
    },
    paid: {
        type: Sequelize.STRING
    }
});

TransactionModel.sync({ force: false });

module.exports = sequelizeInstance.model('transaction', TransactionModel);