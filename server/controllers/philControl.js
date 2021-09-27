var fs = require('fs');

var ListingModel = require('../models/listingModel');
var CommentModel = require('../models/commentModel');
var UserModel = require('../models/usersModel');
var prodReportModel = require('../models/prodReportModel');
var myDatabase = require('./sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;

// Home Page
exports.openHome = function(req, res) {
    ListingModel.findAll().then(function(listingData){
        res.render("home", {
            title: "Home",
            datas: listingData,
            username: req.session.username,
            picture: req.session.picture,
            adminUsername: req.session.adminUsername
        })
    })
}

exports.openSell = function(req, res) {
    if(req.session.username == undefined){
        res.redirect("/login");
    } else {
        res.render("sell", {
            title: "Sell",
            username: req.session.username,
            adminUsername: req.session.adminUsername,
            picture: req.session.picture,
        })
    }
};

exports.openDisplay = function(req, res) {
    var name = req.params.name;
    var username = req.params.username;
    var listingTitle = name;
    ListingModel.findAll({
        where: {
            listingTitle: listingTitle,
            username: username,
        }
    }).then(function(listingData){
        UserModel.findAll({
            where: {
                username: req.session.username
            },
            attributes: ['favorites']
        }).then(function(userData){
            CommentModel.findAll({
                where: {
                    itemUser: username,
                    titleName: listingTitle,
                }
            }).then(function(commentData){
                prodReportModel.findAll({
                    where: {
                        username: req.session.username
                    }
                }).then(function(prodreportData){
                    var favData = "";
                    if (userData != ""){
                        favData = (userData[0].favorites);
                    }
                    console.log(commentData);
                    res.render("display", {
                        title: "Display",
                        datas: listingData[0],
                        prodreports: prodreportData,
                        images: listingData[0].listingIMG,
                        userFav: favData,
                        username: req.session.username,
                        picture: req.session.picture,
                        adminUsername: req.session.adminUsername,
                        comments: commentData,
                    });
                })
            })
        })
    })
};

exports.createprodreport = function(req,res) {
    console.log("Creating Product Report");

    var username = req.body.username;
    var titleName = req.body.titleName;

    var newProdReport = {
        username: req.session.username,
        prod_listingNo: req.body.listingNo,
        prod_listingTitle: req.body.titleName,
        prod_category: req.body.prod_category,
        prod_right_category: req.body.prod_right_category,
        prod_listingLink: req.protocol + '://' + req.get('host') + '/categories/' + username + '/' + titleName 
    }
    prodReportModel.create(newProdReport).then(function(prodreports){
        res.redirect('/');
    });
};

exports.uploadSell = function(req, res) {
    var newListing = ({
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
        otherBrand: req.body.otherBrand,
        price: req.body.price,
        itemCondition: req.body.condition,
        description: req.body.description,
        username: req.session.username,
    });
    
    ListingModel.create(newListing).then(function(listingData){
        var fileName;
        var src;
        var dest;
        var targetPath;
        var allPath = req.files['listingIMG'];
        var tempPath;
        var imgArr = [];
        var eviName = null;

        for (var i = 0; i<allPath.length; i++){
            fileName = req.body.title + JSON.stringify(listingData.listingNo) + JSON.stringify(i);
            tempPath = allPath[i].path;
            targetPath = './public/uploads/listingImages/' + fileName;
            src = fs.createReadStream(tempPath);
            dest = fs.createWriteStream(targetPath);
            src.pipe(dest);
            imgArr.push(fileName);
            fs.unlink(tempPath);
        }

        if (req.files['evidence']){
            eviName = req.body.title + JSON.stringify(listingData.listingNo) + "evi";
            tempPath = req.files['evidence'][0].path;
            targetPath = './public/uploads/listingImages/' + eviName;
            src = fs.createReadStream(tempPath);
            dest = fs.createWriteStream(targetPath);
            src.pipe(dest);
            fs.unlink(tempPath);
        }

        var newImage = {
            listingIMG: imgArr,
            evidence: eviName,
        }
        ListingModel.update(newImage, {
            where: {
                listingTitle: req.body.title,
                listingNo: listingData.listingNo,
            }
        }).then(function(err){
            res.redirect("/categories");
        })
    });
};

exports.checkTitle = function(req, res) {
    ListingModel.findAll({
        where: {
            username: req.session.username
        }
    }).then(function(myPosts) {
        var bool = true;
        for (var i = 0; i < myPosts.length; i++) {
            if (req.body.titleName == myPosts[i].listingTitle){
                bool = false
            }
        }
        res.send(bool);
    })
}

exports.increaseFav = function(req, res) {
    var titleName = req.body.titleName;
    var itemUser = req.body.itemUser;
    ListingModel.findAll({
        where: {
            listingTitle: titleName,
            username: itemUser
        }
    }).then(function(thisItem){
        var newNum = thisItem[0].fav + 1;
        var newFavData = {
            fav: newNum
        }
        ListingModel.update(newFavData, {
            where: {
                listingTitle: titleName,
                username: itemUser
            }
        })
        UserModel.findAll({
            where: {
                username: req.session.username
            }
        }).then(function(hola){
            var data = JSON.parse(hola[0].favorites);
            data.push(itemUser + "|-|" + titleName);
            console.log(data);
            var dataForFav = {
                favorites: JSON.stringify(data)
            }
            UserModel.update(dataForFav, {
                where: {
                    username: req.session.username
                }
            })
        })
        res.send(JSON.stringify(newNum));
    })
}

exports.decreaseFav = function(req, res) {
    var titleName = req.body.titleName;
    var itemUser = req.body.itemUser;
    ListingModel.findAll({
        where: {
            listingTitle: titleName,
            username: itemUser
        }
    }).then(function(thisItem){
        var newNum = thisItem[0].fav - 1;
        var newFavData = {
            fav: newNum
        }
        ListingModel.update(newFavData, {
            where: {
                listingTitle: titleName,
                username: itemUser
            }
        })

        UserModel.findAll({
            where: {
                username: req.session.username
            }
        }).then(function(hola){
            var data = JSON.parse(hola[0].favorites);
            for (var i in data){
                if (data[i] == itemUser + "|-|" + titleName){
                    data.splice(i, 1);
                }
            }
            console.log(data);
            var dataForFav = {
                favorites: JSON.stringify(data)
            }
            UserModel.update(dataForFav, {
                where: {
                    username: req.session.username
                }
            })
        })
        
        res.send(JSON.stringify(newNum));
    })
}

exports.updateListing = function(req, res){
    var titleName = req.body.titleName;
    var itemUser = req.body.itemUser;
    var listingTitle = req.body.listingTitle;
    var newListing = {
        brand: req.body.brand,
        otherBrand: req.body.otherBrand,
        listingTitle: listingTitle,
        itemCondition: req.body.condition,
        price: req.body.price,
        size: req.body.size,
        itemType: req.body.itemType,
        material: req.body.material,
        watchMovement: req.body.watchMovement,
        strapType: req.body.strapType,
        dial: req.body.dial,
        description: req.body.description,
    }
    ListingModel.update(newListing, {
        where:{
            listingTitle: titleName,
            username: itemUser,
        }
    }).then(function(){
        JSON.stringify(listingTitle);
        JSON.stringify(itemUser);
        res.redirect("/categories/" + itemUser + "/" + listingTitle);
    })
}

exports.deleteListing = function(req, res){
    var titleName = req.body.titleName;
    var itemUser = req.body.itemUser;
    console.log("Delete Listing")
    sequelizeInstance.query("DELETE from listings where listingTitle = :listingTitle and username = :username;",
    {
        replacements: { listingTitle: titleName, username: itemUser },
        type: sequelizeInstance.QueryTypes.DELETE
    }).then(function(){
        res.send();
    });
}

exports.postComment = function(req, res){
    console.log("Commented")
    var newComment = {
        comment: req.body.comment,
        username: req.session.username,
        itemUser: req.body.itemUser,
        titleName: req.body.titleName,
    };
    CommentModel.create(newComment).then(function(){
        res.redirect("back");
    });
}