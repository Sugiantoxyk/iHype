var fs = require('fs');

var UserModel = require('../models/usersModel');
var AdminModel = require('../models/adminModel');
var ListingModel = require('../models/listingModel');
var TransactionModel = require('../models/transactionModel');
var HypeCodeModel = require('../models/hypeCodeModel');
var banModel = require('../models/banModel');
var UserReviewModel = require('../models/userReviewModel')
var reportUserModel = require('../models/reportUserModel');
var CommentModel = require('../models/commentModel');
var MessageModel = require('../models/msgModel');
var MessageSessionModel = require('../models/msgSessionModel');

var myDatabase = require('./sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;

// Login Page
exports.openLogin = function(req, res) {
    if(req.session.username || req.session.adminUsername){
        res.redirect("/");
    } else {
        res.render("login", {
            title: "Login",
            error: "",
            regError: "",
            adminError: ""
        })
    }
}

// Logging In
exports.login = function(req, res) {
    var Username = req.body.logUsername;
    var Pass = req.body.logPass;
    UserModel.findAll({
        where: {
            username: Username
        }
    }).then(function(person) {
        if(person[0].password == Pass){
            if(person[0].banned == "yes"){
                banModel.findAll({
                    where: {
                        blacklist: Username
                    }
                }).then(function(bannedDetail){
                    res.render("login", {
                        title: "Login",
                        error: Username + " is banned for " + bannedDetail[0].reason ,
                        regError: "",
                        adminError: ""
                    })
                })
            } else {
                req.session.username = req.body.logUsername;
                req.session.picture = person[0].profileimg;
                res.redirect("/");
            }
        } else {
            res.render("login", {
                title: "Login",
                error: "Incorrect password!",
                regError: "",
                adminError: ""
            })
        }
    }).catch(function() {
        res.render("login", {
            title: "Login",
            error: "This username does not exist!",
            regError: "",
            adminError: ""
        })
    })
}

// Admin Loggin In
exports.adminLogin = function(req, res) {
    var Username = req.body.adminUsername;
    var Pass = req.body.adminPass;
    AdminModel.findAll({
        where: {
            username: Username
        }
    }).then(function(admin) {
        if(admin[0].password == Pass){
            req.session.adminUsername = req.body.adminUsername;
            res.redirect("/");
        } else {
            res.render("login", {
                title: "Login",
                error: "",
                regError: "",
                adminError: "Incorrect password!"
            })
        }
    }).catch(function() {
        res.render("login", {
            title: "Login",
            error: "",
            regError: "",
            adminError: "This admin username does not exist!"
        })
    })
}

// Logging Out
exports.logout = function(req, res) {
    req.session.destroy(function(){
        res.redirect("/login");
    })
}

// Set Profile Pic to defaultImg.jpg
function setDefaultPic(userNm) {
    var fileName = userNm;
    var src;
    var dest;
    var targetPath;
    var tempPath = "./public/uploads/profileImages/defaultImg.jpg";
    targetPath = "./public/uploads/profileImages/" + fileName;
    src = fs.createReadStream(tempPath);
    dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
}

// Registering
exports.register = function(req, res) {

    setDefaultPic(req.body.regUsername);

    var newUser = {
        username: req.body.regUsername,
        email: req.body.regEmail,
        password: req.body.regConPass,
        profileimg: req.body.regUsername,
        favorites: JSON.stringify([])
    }
    
    UserModel.findAll({
        where: {
            email: req.body.regEmail
        }
    }).then(function(existUsername){
        if(existUsername[0].email){
            res.render("login", {
                title: "Login",
                error: "",
                regError: "This email is already in use!",
                adminError: ""
           })
        }
    }).catch(function(){
        if(req.body.regPass != req.body.regConPass){
            res.render("login", {
                title: "Login",
                error: "",
                regError: "Passwords do not match!",
                adminError: ""
            })
        } else {
            UserModel.create(newUser).then(function(newUser){
                req.session.username = req.body.regUsername;
                req.session.picture = newUser.profileimg;
                res.redirect("/");
            }).catch(function(){
                res.render("login", {
                    title: "Login",
                    error: "",
                    regError: "Username already taken!",
                    adminError: ""
                })
            })
        }
    })
}

// Notification Page
exports.openNoti = function(req, res) {
    if(req.session.username){
        sequelizeInstance.query(`   SELECT *, m.session bigsession FROM msgsessions m
                                    INNER JOIN offers o on m.session = o.session
                                    LEFT OUTER JOIN transactions t on m.session = t.session
                                    WHERE buyer = :me OR seller = :me;`,
            {
                replacements: { me: req.session.username },
                type: sequelizeInstance.QueryTypes.SELECT
            }
        ).then(function(data){
            sequelizeInstance.query("SELECT username, poster, session FROM reviews WHERE poster = :me;",
                {
                    replacements: { me: req.session.username },
                    type: sequelizeInstance.QueryTypes.SELECT
                }
            ).then(function(myReviews){
                res.render("noti", {
                    title: "Notification",
                    username: req.session.username,
                    picture: req.session.picture,
                    adminUsername: undefined,
                    data: data,
                    myReview: myReviews
                })
            })
        })
    } else {
        res.redirect("/")
    }
}

// Other Profile Page
exports.openOtherProfile = function(req, res){
    var username = req.params.username;
    if (username == req.session.username){
        res.redirect("/profile");
    } else {
        sequelizeInstance.query("SELECT username, profileimg, firstname, lastname, mobile, bio, favorites FROM users where username = :username ;",
            {
                replacements: { username: username },
                type: sequelizeInstance.QueryTypes.SELECT
            }
        ).then(function(retrievedData){
            if(req.session.admin){
                res.redirect("/");
            }
            if(retrievedData[0] == undefined){
                res.redirect("/login");
            } else {
                var favDict = JSON.parse(retrievedData[0].favorites);
                ListingModel.findAll().then(function(allListings){
                    var myFavo = [];
                    var myList = [];
                    var Fav;
                    var userOfFav;
                    var titleOfFav;
                    for (var i in favDict){
                        Fav = favDict[i].split("|-|");
                        userOfFav = Fav[0];
                        titleOfFav = Fav[1];
                        for (var o in allListings){
                            if (allListings[o].username == userOfFav && allListings[o].listingTitle == titleOfFav){
                                myFavo.push(allListings[o]);
                            }
                        }
                    }
                    for (var p in allListings){
                        if (allListings[p].username == username){
                            myList.push(allListings[p]);
                        }
                    }
                    var openReview = req.session.openReview;
                    var itemSession = req.session.itemSession;
                    var reviewError = req.session.reviewError;
                    req.session.openReview = undefined;
                    req.session.itemSession = undefined;
                    req.session.reviewError = undefined;
                    // For Reviews Tab
                    sequelizeInstance.query("SELECT poster, review FROM reviews WHERE username = :username;",
                        {
                            replacements: { username: username },
                            type: sequelizeInstance.QueryTypes.SELECT
                        }
                    ).then(function(userReviews){
                        res.render("profile", {
                            title: "Profile",
                            username: req.session.username,
                            adminUsername: undefined,
                            userData: retrievedData[0],
                            goFav: "",
                            goTran: "",
                            hiGuest: "Welcome!",
                            allFavorites: myFavo,
                            allMyListings: myList,
                            picture: req.session.picture,
                            myTransaction: "",
                            hypeCode: "",
                            claimCode: "",
                            aboutCode: "",
                            userReviews: userReviews,
                            openReview: openReview,
                            itemSession: itemSession,
                            reviewError: reviewError
                        })
                    })
                })
            }
        })
    }
}

// Profile Page
exports.openProfile = function(req, res) {
    UserModel.findAll({
        where: {
            username: req.session.username
        }
    }).then(function(retrievedData){
        if(req.session.admin){
            res.redirect("/");
        }
        if(retrievedData[0] == undefined){
            res.redirect("/login");
        } else {
            var favDict = JSON.parse(retrievedData[0].favorites);
            ListingModel.findAll().then(function(allListings){
                var myFavo = [];
                var myList = [];
                var Fav;
                var userOfFav;
                var titleOfFav;
                for (var i in favDict){
                    Fav = favDict[i].split("|-|");
                    userOfFav = Fav[0];
                    titleOfFav = Fav[1];
                    for (var o in allListings){
                        if (allListings[o].username == userOfFav && allListings[o].listingTitle == titleOfFav){
                            myFavo.push(allListings[o]);
                        }
                    }
                }
                for (var p in allListings){
                    if (allListings[p].username == req.session.username){
                        myList.push(allListings[p]);
                    }
                }
                var fav = req.session.openFav;
                var tran = req.session.openTran;
                var hypeCode = req.session.withHypeCode;
                var claimCode = req.session.claimCode;
                var aboutCode = req.session.aboutCode;
                req.session.openFav = undefined;
                req.session.openTran = undefined;
                req.session.withHypeCode = undefined;
                req.session.claimCode = undefined;
                req.session.aboutCode = undefined;
                // For Transaction Tab
                sequelizeInstance.query(`   SELECT o.session, paid, productName, ms.buyer, ms.seller, method, meetup_Date, meetup_Time, meetup_location, meetup_price, delivery_date, delivery_address, delivery_price, hypecode 
                                            FROM offers o 
                                            INNER JOIN msgsessions ms ON o.session = ms.session 
                                            INNER JOIN transactions t ON o.session = t.session 
                                            LEFT OUTER JOIN hypecodes hc ON o.session = hc.session 
                                            WHERE ms.buyer = :me OR ms.seller = :me;`,
                    {
                        replacements: { me: req.session.username },
                        type: sequelizeInstance.QueryTypes.SELECT
                    }
                ).then(function(transactionDetail){
                    // For Reviews Tab
                    sequelizeInstance.query("SELECT poster, review FROM reviews WHERE username = :me;",
                        {
                            replacements: { me: req.session.username },
                            type: sequelizeInstance.QueryTypes.SELECT
                        }
                    ).then(function(userReviews){
                        res.render("profile", {
                            title: "Profile",
                            username: req.session.username,
                            adminUsername: undefined,
                            userData: retrievedData[0],
                            goFav: fav,
                            goTran: tran,
                            hiGuest: "",
                            allFavorites: myFavo,
                            allMyListings: myList,
                            picture: req.session.picture,
                            myTransaction: transactionDetail,
                            hypeCode: hypeCode,
                            claimCode: claimCode,
                            aboutCode: aboutCode,
                            userReviews: userReviews,
                            openReview: "",
                            itemSession: "",
                            reviewError: ""
                        })
                    })
                })
            })
        }
    })
}

// Profile Page Favorite Tab
exports.openFavorite = function(req, res) {
    req.session.openFav = "Favorite!";
    res.redirect("/profile");
}

// Profile Page Transaction Tab
exports.openTransaction = function(req, res){
    req.session.openTran = "Transaction!";
    res.redirect("/profile");
}

// Profile Page Claim Code
exports.claimCode = function(req, res){
    req.session.claimCode = "iHype!";
    res.redirect("/profile");
}

// Profile Page Review
exports.goToReview = function(req, res){
    var user = req.body.userReview;
    var itemSession = req.body.session;
    req.session.openReview = user;
    req.session.itemSession = itemSession;
    res.redirect("/profile/"+user);
}

// Update Username
exports.updateUsername = function(req, res) {
    var updateData = {
        username: req.body.username
    }
    var buyerData = {
        buyer: req.body.username
    }
    var sellerData = {
        seller: req.body.username
    }
    var senderData = {
        sender: req.body.username
    }
    UserModel.update(updateData, { where: {
        username: req.session.username
    }}).then(function(){
        UserReviewModel.update(updateData, { where: {
            username: req.session.username
        }}).then(function(){
            ListingModel.update(updateData, { where: {
                username: req.session.username
            }}).then(function(){
                CommentModel.update(updateData, { where: {
                    username: req.session.username
                }}).then(function(){
                    MessageModel.update(senderData, { where: {
                        sender: req.session.username
                    }}).then(function(){
                        MessageSessionModel.update(buyerData, { where: {
                            buyer: req.session.username
                        }}).then(function(){
                            MessageSessionModel.update(sellerData, { where: {
                                seller: req.session.username
                            }}).then(function(){
                                HypeCodeModel.update(buyerData, { where: {
                                    buyer: req.session.username
                                }}).then(function(){
                                    HypeCodeModel.update(sellerData, { where: {
                                        seller: req.session.username
                                    }}).then(function(){
                                        req.session.username = updateData.username;
                                        res.redirect("/profile");
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// Update Profile
exports.updateProfile = function(req, res) {
    if(req.body.profileMobile == ""){
        var mobileNum = null;
    } else {
        var mobileNum = req.body.profileMobile;
    }
    var updateData = {
        firstname: req.body.profileFirst,
        lastname: req.body.profileLast,
        mobile: mobileNum,
        bio: req.body.profileBio
    }
    UserModel.update(updateData, { where: {
        username: req.session.username
    }}).then(function(){
        res.redirect("/profile");
    })
}

// Update Private Profile
exports.updatePrivateProfile = function(req, res) {
    if (req.body.profileCardNumber == ""){
        var accNum = null;
    } else {
        var accNum = req.body.profileCardNumber;
    }
    if (req.body.profileCVV == ""){
        var accCVV = null;
    } else {
        var accCVV = req.body.profileCVV;
    }
    var updateData = {
        accnumber: accNum,
        accexp: req.body.profileEXP,
        acccvv: accCVV
    }
    UserModel.update(updateData, {
        where: {
            username: req.session.username
        }
    }).then(function(){
        res.redirect("/profile");
    })
}

// Update Password
exports.updatePassword = function(req, res) {
    var updateData = {
        password: req.body.newPasswordInput
    }
    UserModel.update(updateData, {
        where: {
            username: req.session.username
        }
    }).then(function() {
        res.redirect("/profile");
    })
}

// Update Avatar
exports.updateAvatar = function(req, res) {
    var fileName = req.session.username;
    var src;
    var dest;
    var targetPath;
    var tempPath = req.file.path;
    targetPath = './public/uploads/profileImages/' + fileName;
    src = fs.createReadStream(tempPath);
    dest = fs.createWriteStream(targetPath);
    src.pipe(dest);

    var updateData = {
        profileimg: fileName
    }

    UserModel.update(updateData, {
        where: {
            username: req.session.username
        }
    })

    req.session.picture = fileName;

    fs.unlink(tempPath, function () {
        res.redirect("profile");
    });
}

// Create Review in DB
exports.createReview = function(req, res) {
    var targetUser = req.body.targetUserReview;
    var session = req.body.session;
    var comment = req.body.reviewComment;
    sequelizeInstance.query("SELECT username, poster, session FROM reviews WHERE username = :username and poster = :poster and session = :session;",
        {
            replacements: { username: targetUser, poster: req.session.username, session: session },
            type: sequelizeInstance.QueryTypes.SELECT
        }
    ).then(function(foundData){
        if (foundData[0] == undefined){
            UserReviewModel.create({
                username: targetUser,
                poster: req.session.username,
                session: session,
                review: comment
            }).then(function(){
                res.redirect("/profile/"+targetUser);
            })
        } else {
            req.session.reviewError = "Only can review once for each item bought or sold!";
            res.redirect("/profile/"+targetUser);
        }
    })
}

// Pay now Proceed
exports.payingItem = function(req, res) {
    var session = req.body.session;
    var data = {
        paid: "paid"
    }
    TransactionModel.update(data, {
        where: {
            session: session
        }
    }).then(function(){
        sequelizeInstance.query("SELECT * FROM offers o INNER JOIN msgsessions ms ON o.session = ms.session INNER JOIN transactions t ON o.session = t.session WHERE o.session = :session;",
            {
                replacements: { session: session },
                type: sequelizeInstance.QueryTypes.SELECT
            }
        ).then(function(sessionData){
            if (sessionData[0].method == "Delivery"){

                sequelizeInstance.query("SELECT hypecode FROM hypecodes;",
                    {
                        type: sequelizeInstance.QueryTypes.SELECT
                    }
                ).then(function(allHypeCode){

                    // Produce unique random 5 length string
                    var bool = true
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    while(bool){
                        text = "";
                        for (var i = 0; i < 5; i++){
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                        }
                        bool = false;
                        for (var i in allHypeCode){
                            if (text == allHypeCode[i].hypecode){
                                bool = true;
                                continue;
                            }
                        }
                    }
                    
                    var data = {
                        session: session,
                        buyer: sessionData[0].buyer,
                        seller: sessionData[0].seller,
                        price: sessionData[0].delivery_price,
                        hypecode: text
                    }
                    HypeCodeModel.create(data).then(function(){
                        req.session.openTran = "Transaction!";
                        req.session.withHypeCode = text;
                        res.redirect("/profile");
                    });
                })
            } else {
                req.session.openTran = "Transaction!";
                res.redirect("/profile");
            }
        })
    })
}

// Get Money from iHype Code
exports.collectMoney = function(req, res) {
     var hypeCode = req.body.theCode;
    sequelizeInstance.query("SELECT * FROM hypecodes WHERE seller = :me and hypecode = :hypecode;",
        {
            replacements: { me: req.session.username, hypecode: hypeCode },
            type: sequelizeInstance.QueryTypes.SELECT
        }
    ).then(function(data){
        if (data != ""){
            req.session.aboutCode = "$" + data[0].price + " has been transferred into your account!";
            var hypeCodeDate = data[0].createdAt;
            var currDate = new Date();
            var diff = currDate - hypeCodeDate;
            if ((diff / (1000*60*60*24)) >= 30){
                req.session.aboutCode = "This iHype Code has expired.";
            }
            sequelizeInstance.query("DELETE FROM hypecodes WHERE seller = :me and hypecode = :hypecode;",
                {
                    replacements: { me: req.session.username, hypecode: hypeCode },
                    type: sequelizeInstance.QueryTypes.DELETE
                }
            ).then(function(){
                res.redirect("/profile");
            })
        } else {
            req.session.aboutCode = "Claim unsuccessful.";
            res.redirect("/profile");
        }
    })
}

// Terms & Conditions Page
exports.openTermsConditions = function(req, res) {
    res.render("terms&conditions", {
        title: "Terms & Conditions",
        username: req.session.username,
        picture: req.session.picture,
        adminUsername: req.session.adminUsername
    })
}

// Privacy Page
exports.openPrivacy = function(req, res) {
    res.render("privacy", {
        title: "Privacy",
        username: req.session.username,
        picture: req.session.picture,
        adminUsername: req.session.adminUsername
    })
}

// getJSON
    // Check for similar Username
exports.checkSimilarUsername = function(req, res) {
    UserModel.findAll().then(function(allData) {
        var bool;
        for (var i in allData){
            if (req.body.username == allData[i].username){
                bool = false;
                break;
            } else {
                bool = true;
            }
        }
        res.send(bool);
    })
}

// Kai Report User
exports.createUserReport = function(req,res) {

    var newUserReport = {
        report_username: req.body.report_username,
        reported_by: req.session.username,
        report_reason: req.body.report_reason
    }
    reportUserModel.create(newUserReport).then(function(){
        res.redirect('/');
    });
};