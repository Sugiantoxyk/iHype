var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const userComments = sequelizeInstance.define('Comments', {
    comment:{
        type: Sequelize.STRING,
    },
    username:{
        type: Sequelize.STRING,
    },
    itemUser:{
        type: Sequelize.STRING,
    },
    titleName: {
        type: Sequelize.STRING,
    }
});

userComments.sync({ force: false });

module.exports = sequelizeInstance.model('Comments', userComments);