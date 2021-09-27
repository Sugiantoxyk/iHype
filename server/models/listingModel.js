var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const listingDetails = sequelizeInstance.define('Listings', {
    listingNo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    listingIMG: {
        type: Sequelize.JSON,
    },
    fashionGender:{
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    listingTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    itemType:{
        type: Sequelize.STRING,
    },
    size: {
        type: Sequelize.STRING,
        defaultValue: "Not Stated"
    },
    material: {
        type: Sequelize.STRING,
        defaultValue: "Not Stated"
    },
    watchMovement:{
        type: Sequelize.STRING,
        defaultValue: "Not Stated"
    },
    strapType: {
        type: Sequelize.STRING,
        defaultValue: "Not Stated"
    },
    dial: {
        type: Sequelize.STRING,
        defaultValue: "Not Stated"
    },
    brand: {
        type: Sequelize.STRING,
    },
    otherBrand:{
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.FLOAT,
        trim: true,
        allowNull: false
    },
    itemCondition: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT,
        trim: true,
    },
    evidence: {
        type: Sequelize.STRING,
    },
    status:{
        type: Sequelize.STRING,
        defaultValue: "Available"
    },
    fav: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    username: {
        type: Sequelize.STRING,
    }
});

listingDetails.sync({ force: false, logging: console.log }).then(() => {
    console.log("Products table synced");
    listingDetails.upsert({
        listingNo: 1,
        listingIMG: ["Wool Elastic Waist Skirt140", "Wool Elastic Waist Skirt141", "Wool Elastic Waist Skirt142"],
        fashionGender: "Women",
        category: "Clothing",
        listingTitle: "Wool Elastic Waist Skirt",
        itemType: "Womens Bottoms",
        size: "EU 37 | UK 4 | AU 6",
        material: "Not Stated",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Chloe",
        otherBrand: "",
        price: 150,
        itemCondition: "Excellent",
        description: "High quality wool.",
        evidence: "Wool Elastic Waist Skirt14evi",
        fav: 13,
        username: "phileo",
    });
    listingDetails.upsert({
        listingNo: 2,
        listingIMG: ["Bi Color Pantent Heels130", "Bi Color Pantent Heels131", "Bi Color Pantent Heels132"],
        fashionGender: "Women",
        category: "Shoes",
        listingTitle: "Bi Color Pantent Heels",
        itemType: "Heels",
        size: "EU 37 | UK 4 | AU 6",
        material: "Not Stated",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Miu Miu",
        otherBrand: "",
        price: 200,
        itemCondition: "Good",
        description: "Used for a year. Still in good condition.",
        evidence: null,
        fav: 1,
        username: "phileo",
    });
    listingDetails.upsert({
        listingNo: 3,
        listingIMG: ["Monogram Saumur 35120", "Monogram Saumur 35121"],
        fashionGender: "Women",
        category: "Bags",
        listingTitle: "Monogram Saumur 35",
        itemType: "HandBags",
        size: "Not Stated",
        material: "Leather",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Gucci",
        otherBrand: "",
        price: 945,
        itemCondition: "Brand New",
        description: "Newly bought Louis Vuitton Monogram Saumur 35.",
        evidence: "Monogram Saumur 3512evi",
        fav: 7,
        username: "phileo",
    });
    listingDetails.upsert({
        listingNo: 4,
        listingIMG: ["Messenger Bag110", "Messenger Bag111", "Messenger Bag112"],
        fashionGender: "Men",
        category: "Bags",
        listingTitle: "Messenger Bag",
        itemType: "Mens Top",
        size: "Not Stated",
        material: "Fabric",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Gucci",
        otherBrand: "",
        price: 1395,
        itemCondition: "Excellent",
        description: "Excellent Condition",
        evidence: "Messenger Bag11evi",
        fav: 18,
        username: "phileo",
    });
    listingDetails.upsert({
        listingNo: 5,
        listingIMG: ["Navy Maroon Contrast Shirt100", "Navy Maroon Contrast Shirt101", "Navy Maroon Contrast Shirt102", "Navy Maroon Contrast Shirt103"],
        fashionGender: "Men",
        category: "Clothing",
        listingTitle: "Navy Maroon Contrast Shirt",
        itemType: "Mens Top",
        size: "XS",
        material: "Not Stated",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Givenchy",
        otherBrand: "",
        price: 345,
        itemCondition: "Very Good",
        description: "Good condition Givency shirt.",
        evidence: null,
        fav: 5,
        username: "phileo",
    });
    listingDetails.upsert({
        listingNo: 6,
        listingIMG: ["Blue White Point100", "Blue White Point101"],
        fashionGender: "Men",
        category: "Accessories",
        listingTitle: "Blue White Point",
        itemType: "Ties and Formals",
        size: "Not Stated",
        material: "Not Stated",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Burberry",
        otherBrand: "",
        price: 80,
        itemCondition: "Brand New",
        description: "Burberry Blue White Point Tie. Used for less than a month. Still in good condition.",
        evidence: "Blue White Point10evi",
        fav: 4,
        username: "phileo",
    });
    listingDetails.upsert({
        listingNo: 7,
        listingIMG: ["Men Black Suit100", "Men Black Suit101"],
        fashionGender: "Men",
        category: "Clothing",
        listingTitle: "Men Black Suit",
        itemType: "Mens Tops",
        size: "M",
        material: "Not Stated",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Other",
        otherBrand: "Armani",
        price: 450,
        itemCondition: "Brand New",
        description: "Armani suit fresh out of the factory.",
        evidence: null,
        fav: 16,
        username: "phileo",
    });
    listingDetails.upsert({
        listingNo: 8,
        listingIMG: ["Black Leather Cutout Bag20", "Black Leather Cutout Bag21", "Black Leather Cutout Bag22", "Black Leather Cutout Bag23"],
        fashionGender: "Women",
        category: "Bags",
        listingTitle: "Black Leather Cutout Bag",
        itemType: "Handbags",
        size: "Not Stated",
        material: "Leather",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Miu Miu",
        otherBrand: "",
        price: 1000,
        itemCondition: "Excellent",
        description: "Used this bag for a month. Just bought a new one and decided to sell this one away. Still in mint condition",
        evidence: "Black Leather Cutout Bag2evi",
        fav: 10,
        username: "phileo",
    });
    listingDetails.upsert({
        listingNo: 9,
        listingIMG: ["Green Silk Shirt80", "Green Silk Shirt81", "Green Silk Shirt82"],
        fashionGender: "Women",
        category: "Clothing",
        listingTitle: "Green Silk Shirt",
        itemType: "Womens Tops",
        size: "S",
        material: "Not Stated",
        watchMovement: "Not Stated",
        strapType: "Not Stated",
        dial: "Not Stated",
        brand: "Other",
        otherBrand: "Acne Studios",
        price: 100,
        itemCondition: "Very Good",
        description: "Acne's mint camisole is a layering piece you can wear everyday. Wear it with a pleated skirt and sandals, teaming it with a chunky cardigan and jeans when the weather cools.100% Polyester.",
        evidence: "Green Silk Shirt8evi",
        comments: null,
        fav: 12,
        username: "phileo",
    });
    
});

module.exports = sequelizeInstance.model('Listings', listingDetails);