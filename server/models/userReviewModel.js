var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const UserReviewModel = sequelizeInstance.define('reviews', {
    username: {
        type: Sequelize.STRING,
    },
    poster: {
        type: Sequelize.STRING,
    },
    review: {
        type: Sequelize.STRING,
    },
    session: {
        type: Sequelize.INTEGER
    }
});

UserReviewModel.sync({ force: false });

module.exports = sequelizeInstance.model('reviews', UserReviewModel);