var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const msgModel = sequelizeInstance.define('Msg', {      // create table in database
    session: {
        type: Sequelize.INTEGER,
    },
    message: {
        type: Sequelize.STRING
    },
    sender: {
        type: Sequelize.STRING
    },
    sendTime: {
        type: Sequelize.STRING
    },
});

msgModel.sync({ force: false });

module.exports = sequelizeInstance.model('Msg', msgModel);