var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const ReportModel = sequelizeInstance.define('reports', {
    report_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    report_title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    report_content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        defaultValue: "Others"
    },
    checked: {
        type: Sequelize.STRING,
        defaultValue: "no"
    }
});

ReportModel.sync({ force: false });

module.exports = sequelizeInstance.model('reports', ReportModel);