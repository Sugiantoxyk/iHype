var ReportModel = require('../models/reportModel');
var faqModel = require('../models/faqModel');
var prodReportModel = require('../models/prodReportModel');
var banModel = require('../models/banModel');
var usersModel = require('../models/usersModel');
var reportUserModel = require('../models/reportUserModel');

var myDatabase = require('./sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var fs = require('fs');

//List Reports (user/admin)
exports.listReport = function (req, res) {
    if(req.session.username != null){
        ReportModel.findAll({where: {
            username: req.session.username
        }}).then(function(reportData){
            res.render("report", {
                title: "Reports a Problem",
                reports: reportData,
                username: req.session.username,
                adminUsername: req.session.adminUsername,
                picture: req.session.picture
            })
        }).catch((err)=>{
            return res.status(400).send({
                message: err
            });
        });
    }
    else if(req.session.adminUsername != null) {
        ReportModel.findAll().then(function(reportData){
            res.render("report", {
                title: "Reports a Problem",
                reports: reportData,
                username: req.session.username,
                picture: req.session.picture,
                adminUsername: req.session.adminUsername
            })
        }).catch((err)=>{
            return res.status(400).send({
                message: err
            });
        });
    }
    else{
        res.redirect('/login');
    }
}

//Create the reports
exports.createReport = function (req, res) {
    console.log("Creating Reports")

    //new report details
    var newReport = {
        report_title: req.body.reporttitle,
        report_content: req.body.reportcontent,
        username: req.session.username,
        category: req.body.category,
        checked: req.body.checked
    }
    ReportModel.create(newReport).then(function(reportData){
        var fileName = 'report' + reportData.report_id;
        var src;
        var dest;
        var targetPath;
        if(req.file != undefined){
        var tempPath = req.file.path;
        }
        else{
            var tempPath = "public/images/defaultReport.png";
        }
        targetPath = './public/uploads/reportImages/' + fileName;
        src = fs.createReadStream(tempPath);
        dest = fs.createWriteStream(targetPath);
        src.pipe(dest);
        if(req.file != undefined){
        fs.unlink(tempPath);
        }
        res.redirect('/report');
    }).catch(function(err){
        res.status(404).send(err);
    })
};

//delete report
exports.deleteReport = function (req, res) {
    var record_num = req.body.report_id;
    console.log("deleting reports " + record_num);
    ReportModel.destroy({where: {report_id: record_num}}).then((deletedReport)=>{
        if (!deletedReport){
            return res.send(400, {
                message: "error"
            });
            res.status(200).send({ message: "Deleted reports :" + record_num});
        }
        res.send();
    })
}


//update report status
exports.checkReport = function(req,res) {
    var report_id = req.body.report_id;
    ReportModel.findAll({
        where: {
            report_id: report_id
        }
    }).then(function(thisReport){
        var check = req.body.checked;
        var newCheck = {
            checked : check
        }
        ReportModel.update(newCheck, {
            where:{
                report_id: report_id
            }
        })
    }).then(function(){
        res.redirect("/report");
        res.send();
    })
}

exports.uncheckReport = function(req, res) {
    var report_id = req.body.report_id;
    ReportModel.findAll({
        where: {
            report_id: report_id
        }
    }).then(function(thisReport){
        var check = req.body.checked;
        var newCheck = {
            checked : check
        }
        ReportModel.update(newCheck, {
            where:{
                report_id: report_id
            }
        })
    }).then(function(){
        res.redirect("/report");
        res.send();
    })
}

// main page
exports.openCustomerCare = function(req, res) {
    res.render("CustomerCare", {
        title: "Customer Care",
        username: req.session.username,
        picture: req.session.picture,
        adminUsername: req.session.adminUsername
    })
}

//faq ONLY !!!
exports.openFAQ = function(req, res) {
    faqModel.findAll().then(function(faqData){
        res.render("FAQ", {
            title: "FAQ",
            faqs: faqData,
            username: req.session.username,
            picture: req.session.picture,
            adminUsername: req.session.adminUsername
        })
    })
}

//admin creating faq 
exports.createFAQ = function(req, res){
    console.log('Creating FAQ')
    var newFAQ = {
        faq_title: req.body.faqtitle,
        faq_content: req.body.faqcontent,
        faq_category: req.body.faqcategory,
        link: req.body.link,
        adminUsername: req.session.adminUsername
    }
    faqModel.create(newFAQ).then(function(faqData){
        res.redirect('/FAQ');
    })
};

exports.deleteFaq = function(req, res){
    var record_num = req.body.faq_id;
    console.log("deleting FAQs " + record_num);
    faqModel.destroy({where: {faq_id: record_num}}).then((deletedFaq)=>{
        if (!deletedFaq){
            return res.send(400, {
                message: "error"
            });
            res.status(200).send({ message: "Deleted FAQs :" + record_num});
        }
        res.send();
    })
}

exports.updateFAQ = function(req,res){
    console.log("Update FAQs");
}


// Product Report Controller
exports.openProdreport = function(req, res) {
    if (req.session.adminUsername != null){
        prodReportModel.findAll().then(function(prodreportData){
            res.render("prodreport", {
                title: "Report a Product",
                prodreports: prodreportData,
                username: req.session.username,
                picture: req.session.picture,
                adminUsername: req.session.adminUsername
            })
        })
    }
    else{
        res.redirect('/login');
    }
}

exports.deleteProdReport = function (req, res) {
    var record_num = req.body.prod_report_id;
    console.log("deleting reports " + record_num);
    prodReportModel.destroy({where: {prod_report_id: record_num}}).then((deletedReport)=>{
        if (!deletedReport){
            return res.send(400, {
                message: "error"
            });
            res.status(200).send({ message: "Deleted reports :" + record_num});
        }
        res.send();
    })
}

//ban controller
exports.openBan = function(req, res) {
    if(req.session.adminUsername != null) {
        usersModel.findAll().then(function(usersData){
            banModel.findAll().then(function(bansData){
                reportUserModel.findAll().then(function(userReportData){
                    res.render("ban", {
                        title: "Ban Users",
                        users: usersData,
                        bans: bansData,
                        reportedUsers: userReportData,
                        username: req.session.username,
                        picture: req.session.picture,
                        adminUsername: req.session.adminUsername
                    })
                })
            })
        })
    }
    else{
        res.redirect('/login');
    }
}

exports.deleteUserReport = function (req, res) {
    var record_num = req.body.report_id;
    console.log("deleting reports " + record_num);
    reportUserModel.destroy({where: {report_id: record_num}}).then((deletedReport)=>{
        if (!deletedReport){
            return res.send(400, {
                message: "error"
            });
            res.status(200).send({ message: "Deleted reports :" + record_num});
        }
        res.send();
    })
}

exports.createBan = function(req, res) {
    console.log("Banning People");

    var newBan = {
        blacklist: req.body.username,
        reason: req.body.reason
    }
    banModel.create(newBan).then(function(){
        var username = req.body.username;
        usersModel.findAll({
            where:{
                username: username
            }
        }).then(function(thisBan){
            var ban = req.body.banned;
            var newBanned = {
                banned: ban
            }
            usersModel.update(newBanned, {
                where:{
                    username: username
                }
            }).then(function(){
                res.send();
            })
        })
    })
}

exports.undoBan = function(req, res) {
    var record_num = req.body.ban_id;
    console.log("Banning Users " + record_num);
    banModel.destroy({where: {ban_id: record_num}}).then((deletedBan) => {
        if (!deletedBan){
            return res.send(400, {
                message: "error"
            });
            res.status(200).send({ message: "Deleted Bans :" + record_num});
        }
    })

    var username = req.body.username;
    usersModel.findAll({
        where:{
            username: username
        }
    }).then(function(thisBan){
        var ban = req.body.banned;
        var newBanned = {
            banned: ban
        }
        usersModel.update(newBanned, {
            where:{
                username: username
            }
        }).then(function(){
            res.send();
        })
    })
}
