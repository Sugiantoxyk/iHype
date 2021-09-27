var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const HypeCodeModel = sequelizeInstance.define('hypecode', {
    session: {
        type: Sequelize.INTEGER,
    },
    buyer: {
        type: Sequelize.STRING
    },
    seller: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE
    },
    hypecode: {
        type: Sequelize.STRING
    },
});

HypeCodeModel.sync({ force: false });

module.exports = sequelizeInstance.model('hypecode', HypeCodeModel);