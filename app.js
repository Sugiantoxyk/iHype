var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var socket = require("socket.io");

// Multer
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/", limits: {fileSize: 1500000000, files: 5} })

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

app.use(session({ secret: "helloiHype" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')))

var server = app.listen(3000);

// SUGI
    // All
var sugi = require("./server/controllers/sugiControl");
app.get("/terms&conditions", sugi.openTermsConditions);
app.get("/privacy", sugi.openPrivacy);
app.get("/login", sugi.openLogin);
app.get("/logout", sugi.logout);
    // After Login
app.get("/profile", sugi.openProfile);
app.get("/profile/:username", sugi.openOtherProfile);
app.get("/openNoti", sugi.openNoti);
app.get("/openFav", sugi.openFavorite);
app.get("/openTransaction", sugi.openTransaction);
app.get("/claimCode", sugi.claimCode);
    // Forms
app.post("/login", sugi.login);
app.post("/adminLogin", sugi.adminLogin);
app.post("/register", sugi.register);
app.post("/updateUsername", sugi.updateUsername);
app.post("/updateProfile", sugi.updateProfile);
app.post("/updatePrivateProfile", sugi.updatePrivateProfile);
app.post("/updatePassword", sugi.updatePassword);
app.post("/updateAvatar", upload.single("uploadImg"), sugi.updateAvatar);
app.post("/payingItem", sugi.payingItem);
app.post("/collectMoney", sugi.collectMoney);
app.post("/goToReview", sugi.goToReview);
app.post("/createReview", sugi.createReview);
    // Ajax
app.post("/checkSimilarUsername", sugi.checkSimilarUsername);

// PHILEO
var phil = require("./server/controllers/philControl");
app.get("/", phil.openHome);
app.get("/sell", phil.openSell);
app.get("/categories/:username/:name", phil.openDisplay);

app.post("/categories", upload.fields([{ name: 'listingIMG', maxCount: 4 }, { name: 'evidence', maxCount: 1 }]), phil.uploadSell);
app.post("/checkSimilarTitle", phil.checkTitle);
app.post("/upFav", phil.increaseFav);
app.post("/downFav", phil.decreaseFav);
app.post("/postComment", phil.postComment);
app.post("/updateListing", phil.updateListing);
app.post("/deleteListing", phil.deleteListing);

// SHUAN JIN
var jin = require("./server/controllers/jinControl");
var MsgModel = require("./server/models/msgModel");
var io = socket(server);

io.on("connection", function(socket){
    console.log("made socket connection", socket.id);

    socket.on("chat", function(data){
        var messages = {
            session: data.session,
            message: data.message,
            sender: data.handle,
            sendTime: data.sendTime,
        };
        MsgModel.create(messages);
        io.sockets.emit("chat", data);
    });
    
    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data);
    });
});

app.get("/chat", jin.myChat);
app.get("/chat/:sellerUsername/:listingTitle", jin.createSession);

app.post("/getChat", jin.getChat);
app.post("/chat", jin.UploadOffer);
app.post("/declineOffer", jin.declineOffer);
app.post("/acceptOffer", jin.acceptOffer);
app.post("/markSold", jin.markSold);

// ERNEST
var productsController = require("./server/controllers/productsController");
app.get("/categories", productsController.list);
app.get("/categories/popular", productsController.listPopular);
app.get("/categories/hightolow", productsController.listHighLow);
app.get("/categories/lowtohigh", productsController.listLowHigh);
app.get("/searchuser", productsController.searchUser);
app.get("/user", productsController.user);
app.post("/search", productsController.searchItem);
app.post("/searchuser", productsController.searchUser);
// Ernest - header filter
app.get("/categories/male", productsController.allM);
app.get("/categories/female", productsController.allF);
app.get("/categories/clothingf", productsController.clothingF);
app.get("/categories/clothingm", productsController.clothingM);
app.get("/categories/bagm", productsController.bagM);
app.get("/categories/bagf", productsController.bagF);
app.get("/categories/accessoriesm", productsController.accessoriesM);
app.get("/categories/accessoriesf", productsController.accessoriesF);
app.get("/categories/watchesm", productsController.watchesM);
app.get("/categories/watchesf", productsController.watchesF);
app.get("/categories/shoesm", productsController.shoesM);
app.get("/categories/shoesf", productsController.shoesF);
app.get("/categories/dressesf", productsController.dressesF);
app.get("/categories/jewelleryf", productsController.jewelleryF);
// nav brand - men
app.get("/categories/burberry", productsController.burberry);
app.get("/categories/dior", productsController.dior);
app.get("/categories/fendi", productsController.fendi);
app.get("/categories/givenchy", productsController.givenchy);
app.get("/categories/gucci", productsController.gucci);
app.get("/categories/hermes", productsController.hermes);
app.get("/categories/louisvuitton", productsController.louisvuitton);
app.get("/categories/valentino", productsController.valentino);
app.get("/categories/yvessaintlaurent", productsController.yvessaintlaurent);
// nav brand - women
app.get("/categories/balenciaga", productsController.balenciaga);
app.get("/categories/celine", productsController.celine);
app.get("/categories/chloe", productsController.chloe);
app.get("/categories/christian", productsController.christian);
app.get("/categories/louboutin", productsController.louboutin);
app.get("/categories/miumiu", productsController.miumiu);

// KAI YANG
var kaya = require("./server/controllers/kayaControl");
app.get("/report", kaya.listReport);
app.get("/CustomerCare", kaya.openCustomerCare);
app.get("/FAQ", kaya.openFAQ);
app.get("/prodreport", kaya.openProdreport);
app.get("/ban", kaya.openBan);

//report
app.post("/report", upload.single("uploadss"), kaya.createReport);
app.post("/check", kaya.checkReport);
app.post("/uncheck", kaya.uncheckReport);
app.post("/deleteReport", kaya.deleteReport);
//faq
app.post("/FAQ", kaya.createFAQ);
app.post("/deleteFaq", kaya.deleteFaq);
//prod report
app.post('/prodreport', phil.createprodreport);
app.post('/deleteProdReport', kaya.deleteProdReport);
//ban
app.post("/ban", kaya.createBan);
app.post("/deleteBan", kaya.undoBan);
app.post("/deleteReportedUser", kaya.deleteUserReport);
//report user
app.post('/reportUser', sugi.createUserReport);



app.get('*',function (req, res) {
    res.redirect('/');
});