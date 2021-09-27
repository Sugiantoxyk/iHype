var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const UserModel = sequelizeInstance.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    profileimg: {
        type: Sequelize.STRING
    },
    firstname: {
        type: Sequelize.STRING,
        trim: true
    },
    lastname: {
        type: Sequelize.STRING,
        trim: true
    },
    mobile: {
        type: Sequelize.INTEGER,
        trim: true
    },
    bio: {
        type: Sequelize.STRING,
        trim: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accnumber: {
        type: Sequelize.BIGINT,
        trim: true
    },
    accexp: {
        type: Sequelize.STRING,
        trim: true
    },
    acccvv: {
        type: Sequelize.INTEGER,
        trim: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    favorites: {
        type: Sequelize.STRING
    },
    banned:{
        type: Sequelize.STRING,
        defaultValue: "no"
    }
});

UserModel.sync({ force: false });

module.exports = sequelizeInstance.model('users', UserModel);