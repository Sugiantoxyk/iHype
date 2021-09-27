var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const BanModel = sequelizeInstance.define('bans', {
    ban_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blacklist:{
        type: Sequelize.STRING,
        allowNull: false
    },
    reason:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

BanModel.sync({ force: false});

module.exports = sequelizeInstance.model('bans', BanModel);
