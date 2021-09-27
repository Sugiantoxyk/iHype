var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const ProdReportModel = sequelizeInstance.define('prodreports', {
    prod_report_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prod_listingNo:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    prod_listingTitle:{
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prod_category:{
        type: Sequelize.STRING,
        allowNull: false
    },
    prod_right_category:{
        type: Sequelize.STRING,
        defaultValue: "None"
    },
    prod_listingLink:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

ProdReportModel.sync({ force: false });

module.exports = sequelizeInstance.model('prodreports', ProdReportModel);