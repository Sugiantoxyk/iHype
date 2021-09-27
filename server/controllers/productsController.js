var listingModel = require('../models/listingModel');
var usersModel = require('../models/usersModel');
var myDatabase = require('./sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;

exports.insert = function (req, res) {
    var newListing = {
        fashionGender: req.body.fashionGender,
        category: req.body.category,
        listingTitle: req.body.title,
        itemType: req.body.itemType,
        size: req.body.size,
        material: req.body.material,
        watchMovement: req.body.watchMovement,
        strapType: req.body.strapType,
        dial: req.body.dial,
        brand: req.body.brand,
        price: req.body.price,
        itemCondition: req.body.condition,
        description: req.body.description,
        evidence: req.body.evidence,
        meetup: req.body.meetup,
        delivery: req.body.delivery,
    }
    listingModel.create(newListing).then((newRecord, created) => {
        if (!newRecord) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/');
    })
};

exports.list = function (req, res) {
    sequelizeInstance.query('select * from Listings where status = \'available\' order by listingno desc;', { model:listingModel }).then((Listings) => {

        var clothing = req.session.openclothing;
        req.session.openclothing = undefined;
        
        res.render('categories', {
            title: "Categories",
            itemList: Listings,
            price: req.body.pricebtn,
            evidence: req.body.evidence,
            username: req.session.username,
            adminUsername: req.session.adminUsername,
            type: req.body.categoriesType,
            picture: req.session.picture,
            gender: req.body.genderbtn,
            brand: req.body.brandType,
            brand1: req.body.brandType1,
            brand2: req.body.brandType2,
            condition: req.body.condition,
            search: req.body.searchInput,

            goClothing: clothing,

            list: "",
        });
    });
};

exports.searchItem = function (req, res) {
    sequelizeInstance.query('select * from Listings where (listingTitle like :searchInput) and status = \'available\'' + req.body.pricebtn + req.body.evidence + req.body.categoriesType + req.body.genderbtn + req.body.brandType + req.body.brandType1 + req.body.brandType2 + req.body.condition + ' OR itemType like :searchInput and status = \'available\'' + req.body.pricebtn + req.body.evidence + req.body.categoriesType + req.body.genderbtn + req.body.brandType + req.body.brandType1 + req.body.brandType2 + req.body.condition + ' OR brand like :searchInput and status = \'available\'' + req.body.pricebtn + req.body.evidence + req.body.categoriesType + req.body.genderbtn + req.body.brandType + req.body.brandType1 + req.body.brandType2 + req.body.condition + ';', 
    {
        model:listingModel,
        replacements: { searchInput: '%' + req.body.searchInput + '%' },
        type: sequelizeInstance.QueryTypes.SELECT
    }
    ).then((Listings) => {
        var clothing = req.session.openclothing;
        req.session.openclothing = undefined;

        res.render('categories', {
            title: 'Categories',
            itemList: Listings,
            username: req.session.username,
            adminUsername: req.session.adminUsername,
            evidence: req.body.evidence,
            type: req.body.categoriesType,
            price: req.body.pricebtn,
            picture: req.session.picture,
            gender: req.body.genderbtn,
            brand: req.body.brandType,
            brand1: req.body.brandType1,
            brand2: req.body.brandType2,
            condition: req.body.condition,
            search: req.body.searchInput,

            goClothing: clothing,

            list: "SI",
        });
    })
};

exports.listPopular = function (req, res) {
    sequelizeInstance.query('select * from Listings where status = \'available\' order by fav desc;', { model:listingModel }).then((Listings) => {

        var clothing = req.session.openclothing;
        req.session.openclothing = undefined;

        res.render('categories', {
            title: 'Categories',
            itemList: Listings,
            username: req.session.username,
            adminUsername: req.session.adminUsername,
            picture: req.session.picture,
            evidence: req.body.evidence,
            type: req.body.categoriesType,
            price: req.body.pricebtn,
            gender: req.body.genderbtn,
            brand: req.body.brandType,
            brand1: req.body.brandType1,
            brand2: req.body.brandType2,
            condition: req.body.condition,
            search: req.body.searchInput,

            goClothing: clothing,

            list: "Popular",
        });
    })
};

exports.listHighLow = function (req, res) {
    sequelizeInstance.query('select * from Listings where status = \'available\' order by price desc;', { model:listingModel }).then((Listings) => {

        var clothing = req.session.openclothing;
        req.session.openclothing = undefined;

        res.render('categories', {
            title: 'Categories',
            itemList: Listings,
            username: req.session.username,
            adminUsername: req.session.adminUsername,
            picture: req.session.picture,
            evidence: req.body.evidence,
            type: req.body.categoriesType,
            price: req.body.pricebtn,
            gender: req.body.genderbtn,
            brand: req.body.brandType,
            brand1: req.body.brandType1,
            brand2: req.body.brandType2,
            condition: req.body.condition,
            search: req.body.searchInput,

            goClothing: clothing,

            list: "HNL",
        });
    })
};

exports.listLowHigh = function (req, res) {
    sequelizeInstance.query('select * from Listings where status = \'available\' order by price;', { model:listingModel }).then((Listings) => {

        var clothing = req.session.openclothing;
        req.session.openclothing = undefined;

        res.render('categories', {
            title: 'Categories',
            itemList: Listings,
            username: req.session.username,
            adminUsername: req.session.adminUsername,
            picture: req.session.picture,
            evidence: req.body.evidence,
            type: req.body.categoriesType,
            price: req.body.pricebtn,
            gender: req.body.genderbtn,
            brand: req.body.brandType,
            brand1: req.body.brandType1,
            brand2: req.body.brandType2,
            condition: req.body.condition,
            search: req.body.searchInput,

            goClothing: clothing,

            list: "LNH",
        });
    })
};

exports.user = function (req, res) {
    sequelizeInstance.query('select * from users;', { 
        model:usersModel,listingModel, 
    }).then((users) => {

        var clothing = req.session.openclothing;
        req.session.openclothing = undefined;

        res.render('categories', {
            title: 'Categories',
            userList: users,
            evidence: req.body.evidence,
            price: req.body.pricebtn,
            username: req.session.username,
            adminUsername: req.session.adminUsername,
            type: req.body.categoriesType,
            picture: req.session.picture,
            gender: req.body.genderbtn,
            brand: req.body.brandType,
            brand1: req.body.brandType1,
            brand2: req.body.brandType2,
            condition: req.body.condition,
            search: req.body.searchInput,

            goClothing: clothing,

            list: "listUser",
        });
    })
};

exports.searchUser = function (req, res) {
    sequelizeInstance.query('select * from users where username like :searchInput;', { 
        model:usersModel, 
        replacements: { searchInput: '%' + req.body.searchInput + '%' },
        type: sequelizeInstance.QueryTypes.SELECT
    }).then((users) => {

        var clothing = req.session.openclothing;
        req.session.openclothing = undefined;

        res.render('categories', {
            title: 'Categories',
            userList: users,
            evidence: req.body.evidence,
            price: req.body.pricebtn,
            username: req.session.username,
            adminUsername: req.session.adminUsername,
            type: req.body.categoriesType,
            picture: req.session.picture,
            gender: req.body.genderbtn,
            brand: req.body.brandType,
            brand1: req.body.brandType1,
            brand2: req.body.brandType2,
            condition: req.body.condition,
            search: req.body.searchInput,

            goClothing: clothing,

            list: "searchlistUser",
        });
    })
};

// redirect mypage filter
exports.allM = function (req, res) {
    req.session.openclothing = "allM";
    res.redirect("/categories");
}
exports.allF = function (req, res) {
    req.session.openclothing = "allF";
    res.redirect("/categories");
}
exports.clothingM = function (req, res) {
    req.session.openclothing = "clothingM";
    res.redirect("/categories");
}
exports.clothingF = function (req, res) {
    req.session.openclothing = "clothingF";
    res.redirect("/categories");
}
exports.bagM = function (req, res) {
    req.session.openclothing = "bagM";
    res.redirect("/categories");
}
exports.bagF = function (req, res) {
    req.session.openclothing = "bagF";
    res.redirect("/categories");
}
exports.accessoriesM = function (req, res) {
    req.session.openclothing = "accessoriesM";
    res.redirect("/categories");
}
exports.accessoriesF = function (req, res) {
    req.session.openclothing = "accessoriesF";
    res.redirect("/categories");
}
exports.watchesM = function (req, res) {
    req.session.openclothing = "watchesM";
    res.redirect("/categories");
}
exports.watchesF = function (req, res) {
    req.session.openclothing = "watchesF";
    res.redirect("/categories");
}
exports.shoesM = function (req, res) {
    req.session.openclothing = "shoesM";
    res.redirect("/categories");
}
exports.shoesF = function (req, res) {
    req.session.openclothing = "shoesF";
    res.redirect("/categories");
}
exports.dressesF = function (req, res) {
    req.session.openclothing = "dressesF";
    res.redirect("/categories");
}
exports.jewelleryF = function (req, res) {
    req.session.openclothing = "jewelleryF";
    res.redirect("/categories");
}
// nav brand - men
exports.burberry = function (req, res) {
    req.session.openclothing = "burberry";
    res.redirect("/categories");
}
exports.dior = function (req, res) {
    req.session.openclothing = "dior";
    res.redirect("/categories");
}
exports.fendi = function (req, res) {
    req.session.openclothing = "fendi";
    res.redirect("/categories");
}
exports.givenchy = function (req, res) {
    req.session.openclothing = "givenchy";
    res.redirect("/categories");
}
exports.gucci = function (req, res) {
    req.session.openclothing = "gucci";
    res.redirect("/categories");
}
exports.hermes = function (req, res) {
    req.session.openclothing = "hermes";
    res.redirect("/categories");
}
exports.louisvuitton = function (req, res) {
    req.session.openclothing = "louisvuitton";
    res.redirect("/categories");
}
exports.valentino = function (req, res) {
    req.session.openclothing = "valentino";
    res.redirect("/categories");
}
exports.yvessaintlaurent = function (req, res) {
    req.session.openclothing = "yvessaintlaurent";
    res.redirect("/categories");
}
// nav brand - women
exports.balenciaga = function (req, res) {
    req.session.openclothing = "balenciaga";
    res.redirect("/categories");
}
exports.celine = function (req, res) {
    req.session.openclothing = "celine";
    res.redirect("/categories");
}
exports.chloe = function (req, res) {
    req.session.openclothing = "chloe";
    res.redirect("/categories");
}
exports.christian = function (req, res) {
    req.session.openclothing = "christian";
    res.redirect("/categories");
}
exports.louboutin = function (req, res) {
    req.session.openclothing = "louboutin";
    res.redirect("/categories");
}
exports.miumiu = function (req, res) {
    req.session.openclothing = "miumiu";
    res.redirect("/categories");
}