var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const faqModel = sequelizeInstance.define('faqs', {
    faq_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    faq_title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    faq_content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    faq_category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING
    },
    adminUsername: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

faqModel.sync({ force: false, logging: console.log }).then(() => {
    console.log("FAQ table synced");

    faqModel.upsert({
        faq_id: 1,
        faq_title: "How do i sign up ?",
        faq_content: "1. Click on top left button of the page 'LOG IN'.\n 2. Click on SIGN UP NOW! to sign up. \n 3. You are ready to explore !!!",
        link: "",
        faq_category: "Account",
        adminUsername: "Kaiyang"
    });
    faqModel.upsert({
        faq_id: 2,
        faq_title: "I'm seeing <Error 413> when I'm trying to sell",
        faq_content: "If you encounter <Error 413> after submitting your listing details or in chat, this means that the combined size of your photo(s) exceeds 4mb.",
        link: "",
        faq_category: "Technical Support",
        adminUsername: "Kaiyang"
    });
    faqModel.upsert({
        faq_id: 3,
        faq_title: "What is Hype Code ?",
        faq_content: "Hype Code makes sure that transactions on iHype are 99.9% safe. \n We do this by becoming a third party when a transaction goes on. \n Simply by keeping the money with us until the you receive the product, reducing the chances that u get scammed.",
        link: "",
        faq_category: "Hype Code",
        adminUsername: "Kaiyang"
    });
    faqModel.upsert({
        faq_id: 4,
        faq_title: "Terms & Conditions",
        faq_content: "Terms & Conditions can be found at ",
        link: "http://localhost:3000/terms&conditions",
        faq_category: "Others",
        adminUsername: "Kaiyang"
    });
    faqModel.upsert({
        faq_id: 5,
        faq_title: "Privacy",
        faq_content: "Privacy Policies can be found at ",
        link: "http://localhost:3000/privacy",
        faq_category: "Others",
        adminUsername: "Kaiyang"
    });
    faqModel.upsert({
        faq_id: 6,
        faq_title: "How do i change the information in my account ?",
        faq_content: "To change your account information: \n1. Log in to your account. \n2.Click your profile picture at the top-right of the page. \n3. Click EDIT at the bottom of the page to edit your account information.",
        link: "http://localhost:3000/profile",
        faq_category: "Account",
        adminUsername: "Kaiyang"
    });
    faqModel.upsert({
        faq_id: 7,
        faq_title: "Error 400 when trying to create new listing item",
        faq_content: "The user's cookie that is associated with the site is corrupt. \nClearing the browser's cache and cookies could solve this issue, the link below works for chrome browsers.",
        link: "chrome://settings/clearBrowserData",
        faq_category: "Technical Support",
        adminUsername: "Kaiyang"
    })
});

module.exports = sequelizeInstance.model('faqs', faqModel);