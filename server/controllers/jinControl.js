var MsgModel = require("../models/msgModel");
var TransactionModel = require('../models/transactionModel');
var MsgSessionModel = require("../models/msgSessionModel");
var ListingModel = require('../models/listingModel');
var offerModel = require("../models/offerModel");
var myDatabase = require('./sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;

exports.myChat = function(req, res) {
    if(req.session.username == undefined){
        res.redirect("/login");
    } else {
        sequelizeInstance.query("SELECT session, buyer, seller, productName, listingIMG FROM msgsessions m INNER JOIN listings l ON m.productName = l.listingTitle WHERE buyer = :me or seller = :me;",
            {
                replacements: { me: req.session.username },
                type: sequelizeInstance.QueryTypes.SELECT
            }
        ).then(function(datasSession){
            res.render("chat", {
                title: "Chat",
                username: req.session.username,
                adminUsername: req.session.adminUsername,
                picture: req.session.picture,
                data: datasSession,
                url: req.protocol + "://" + req.get("host") + req.url,
            })
        })
    } 
};

exports.createSession = function (req, res){
    if (req.session.username == null){
        res.redirect("/login");
    }
    var listingTitle = req.params.listingTitle;
    var sellerUsername = req.params.sellerUsername;
    sequelizeInstance.query("SELECT buyer, seller, productName FROM msgsessions WHERE buyer = :buyer and seller = :seller and productName = :productName;",
        {
            replacements: { buyer: req.session.username, seller: sellerUsername, productName: listingTitle},
            type: sequelizeInstance.QueryTypes.SELECT
        }
    ).then(function(foundData){

        if (foundData == ""){
            var data = {
                buyer: req.session.username,
                seller: sellerUsername,
                productName: listingTitle
            }
            MsgSessionModel.create(data).then(function(){
                res.redirect("/chat");
            });
        } else {
            res.redirect("/chat");
        }
    })
};

exports.getChat = function (req, res){
    var session = req.body.chatSessionNum;
    sequelizeInstance.query("SELECT session, message, sender, sendTime FROM msgs WHERE session = :sessionNum;", // retrieve data 
        {
            replacements: { sessionNum: session },
            type: sequelizeInstance.QueryTypes.SELECT
        }
    ).then(function(chatData){
        sequelizeInstance.query("SELECT * FROM offers WHERE session = :sessionNum;",
            {
                replacements: { sessionNum: session },
                type: sequelizeInstance.QueryTypes.SELECT
            }
        ).then(function(thisOffer){
            sequelizeInstance.query("SELECT * FROM transactions WHERE session = :sessionNum;",
                {
                    replacements: { sessionNum: session },
                    type: sequelizeInstance.QueryTypes.SELECT
                }
            ).then(function(transactionData){
                var allData = [chatData, thisOffer, transactionData];
                res.send(allData);
            })
        })
    })
};

exports.UploadOffer = function (req, res){
    console.log(req.body.method);
    var Offer
    if (req.body.method == "MeetUp"){
        Offer = {
            method: req.body.method,
            meetup_Date: req.body.meetup_Date,
            meetup_Time: req.body.meetup_Time,
            meetup_location: req.body.meetup_location,
            meetup_price: req.body.meetup_price,
            session: req.body.session,
        };
    } else if (req.body.method == "Delivery") {
        Offer = {
            method: req.body.method,
            delivery_date: req.body.delivery_date,
            delivery_address: req.body.delivery_address,
            delivery_price: req.body.delivery_price,
            session: req.body.session,
        };
    }
    offerModel.update(Offer, {
        where: {
            session: req.body.session,
        }
    }).then(function(data){
        if (data == 0) {
            offerModel.create(Offer);
        }
        res.redirect("/chat");
    });
};

exports.declineOffer = function(req, res){
    var session = req.body.session;
    sequelizeInstance.query("DELETE FROM offers WHERE session = :sessionNum;",
        {
            replacements: { sessionNum: session },
            type: sequelizeInstance.QueryTypes.DELETE
        }
    ).then(function(){
        res.redirect("/chat");
    })
}

exports.acceptOffer = function(req, res){
    var session = req.body.session;
    var productName = req.body.productName;
    var data = {
        accepted: "accepted"
    }
    offerModel.update(data, {
        where: {
            session: session
        }
    }).then(function(){
        ListingModel.update({
            status: "reserved"
        }, {
            where: {
                listingTitle: productName,
                username: req.session.username
            }
        }).then(function(){
            var tranData = {
                session: session
            }
            TransactionModel.create(tranData).then(function(){
                res.redirect("/chat");
            })
        })
    })
}

exports.markSold = function(req, res){
    var session = req.body.session;
    var productName = req.body.productName;
    var data = {
        accepted: "sold"
    }
    offerModel.update(data, {
        where: {
            session: session
        }
    }).then(function(){
        ListingModel.update({
            status: "sold"
        }, {
            where: {
                listingTitle: productName,
                username: req.session.username
            }
        }).then(function(){
            sequelizeInstance.query("SELECT productName FROM msgsessions WHERE session = :sessionNum;",
            {
                replacements: { sessionNum: session },
                type: sequelizeInstance.QueryTypes.SELECT
            }
            ).then(function(mySoldListing){
                res.redirect("/categories/"+req.session.username+"/"+mySoldListing[0].productName);
            })
        })
    })
}