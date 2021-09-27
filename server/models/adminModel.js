var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const AdminModel = sequelizeInstance.define('admins', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

AdminModel.sync({ force: false }).then(function(){
    AdminModel.upsert({
        username: "Ernest",
        password: "ernest123"
    });
    AdminModel.upsert({
        username: "Kaiyang",
        password: "Kaiyang123"
    });
});

module.exports = sequelizeInstance.model('admins', AdminModel);