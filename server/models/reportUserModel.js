var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const reportUserModel = sequelizeInstance.define('reportUsers', {
    report_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    report_reason:{
        type: Sequelize.STRING,
        allowNull: false
    },
    report_username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    reported_by:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

reportUserModel.sync({ force: false});

module.exports = sequelizeInstance.model('reportUsers', reportUserModel);
