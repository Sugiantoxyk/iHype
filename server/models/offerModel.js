var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const offerModel = sequelizeInstance.define("offers", {
    method: {
        type: Sequelize.STRING
    },
    meetup_Date: {
        type: Sequelize.DATE
    },
    meetup_Time: {
        type: Sequelize.TIME
    },
    meetup_location: {
        type: Sequelize.STRING
    },
    meetup_price: {
        type: Sequelize.FLOAT
    },
    delivery_date: {
        type: Sequelize.DATE
    },
    delivery_address: {
        type: Sequelize.STRING
    },
    delivery_price: {
        type: Sequelize.FLOAT
    },
    session: {
        type: Sequelize.INTEGER
    },
    accepted: {
        type: Sequelize.STRING
    },
});

offerModel.sync({ force: false });

module.exports = sequelizeInstance.model('offers', offerModel);