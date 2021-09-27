var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const msgSessionModel = sequelizeInstance.define('MsgSession', {
    session: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    buyer: {
        type: Sequelize.STRING,
    },
    seller: {
        type: Sequelize.STRING,
    },
    productName: {
        type: Sequelize.STRING,
    },
});

msgSessionModel.sync({ force: false });

module.exports = sequelizeInstance.model('MsgSession', msgSessionModel);