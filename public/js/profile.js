// Sub Tab
function switchDisplay(str) {
    $(".myProfileCont").css("display", "none");
    $(".myPersonalInformationCont").css("display", "none");
    $(".myListingsCont").css("display", "none");
    $(".myFavoritesCont").css("display", "none");
    $(".myFavoritesCont").css("display", "none");
    $(".myReviewsCont").css("display", "none");
    $(".myTransactionsCont").css("display", "none");
    $("."+str).css("display", "block");
}

function changeTabStyle(pressed) {
    $("#profileTab").css("background-color", "#d8d8d8");
    $("#personalTab").css("background-color", "#d8d8d8");
    $("#listingsTab").css("background-color", "#d8d8d8");
    $("#favoritesTab").css("background-color", "#d8d8d8");
    $("#reviewsTab").css("background-color", "#d8d8d8");
    $("#transactionsTab").css("background-color", "#d8d8d8");
    var idName = pressed.id;
    $("#"+idName).css("background-color", "white");
}

$(".subTabList").on("click", function(){
    var str = this.innerHTML;
    str = "my" + str.split(" ").join("") + "Cont"
    if ($("."+str).css("display") != "block"){
        switchDisplay(str);
        changeTabStyle(this);
        profileCancel(1);
        profileCancel(2);

        // For the Edit & Update button
        $(".disabled").attr("disabled", "disabled");
        $("#editProfileButton").css("display", "block");
        $("#cancelProfileButton").css("display", "none");
        $("#updateProfileButton").css("display", "none");
        $("#editPriProfileButton").css("display", "block");
        $("#cancelPriProfileButton").css("display", "none");
        $("#updatePriProfileButton").css("display", "none");
    }
})

// Profile Edit Button
$("#editProfileButton").on("click", function(){
    $("#editProfileButton").css("display", "none");
    $("#cancelProfileButton").css("display", "inline-block");
    $("#updateProfileButton").css("display", "inline-block");
    $(".disabled").removeAttr("disabled");
    $("#profileFirst").focus()
    [0].setSelectionRange(-1, -1);
})

// Private Profile Edit Button
$("#editPriProfileButton").on("click", function(){
    $("#editPriProfileButton").css("display", "none");
    $("#cancelPriProfileButton").css("display", "inline-block");
    $("#updatePriProfileButton").css("display", "inline-block");
    $(".disabled").removeAttr("disabled");
    $("#profileCardNumber").focus()
    [0].setSelectionRange(-1, -1);
})

// Open change Username Modal
$("#changeUsernameButton").on("click", function(){
    $("#newUsername").val("");
    $("#currentPasswordInput2").val("");
    $("#modalChangeUsernameButton").attr("disabled", "disabled")
    .attr("class", "btn btn-default modalButtons");
})

// Open change Password Modal
$("#changePasswordButton").on("click", function(){
    $(".passwordInputs").val("");
    $("#changePassError").val("")
    .css("display", "none");
    $("#modalChangePasswordButton").attr("disabled", "disabled")
    .attr("class", "btn btn-default modalButtons");
})

// Check if new password = confirm new password
function buttonActivate() {
    if ($("#newPasswordInput").val() == "" || $("#currentPasswordInput").val() == ""){
        buttonDeactivate(0);
    } else {
        $("#modalChangePasswordButton").removeAttr("disabled");
        $("#modalChangePasswordButton").attr("class", "btn btn-default modalButtonsAct");
    }
}
function buttonDeactivate(num) {
    if (num == 1) {
        $("#changePassError").html("<span class='fa fa-warning'></span>&nbsp;&nbsp;Passwords do not match.")
        .css("display", "block");
    } else if (num == 2) {
        if ($("#currentPasswordInput").val() != ""){
            $("#changePassError").html("<span class='fa fa-warning'></span>&nbsp;&nbsp;New password must not be the same as current password.")
            .css("display", "block");
        }
    }
    $("#modalChangePasswordButton").attr("disabled", "disabled")
    .attr("class", "btn btn-default modalButtons");
}
function checkPass() {
    $("#changePassError").val("")
    .css("display", "none");
    if ($("#newPasswordInput").val() == $("#confNewPasswordInput").val()){
        if ($("#newPasswordInput").val() != $("#currentPasswordInput").val()) {
            buttonActivate();
        } else {
            buttonDeactivate(2);
        }
    } else {
        buttonDeactivate(1);
    }
}

// Check for Changing Username
function checkForNoVal(){
    if ($("#newUsername").val() != "" && $("#currentPasswordInput2").val() != ""){
        $("#modalChangeUsernameButton").removeAttr("disabled")
        .attr("class", "btn btn-default modalButtonsAct");
    } else {
        $("#modalChangeUsernameButton").attr("disabled", "disabled")
        .attr("class", "btn btn-default modalButtons");
    }
}

// Confirm Update???
function confirmationMsg() {
    return confirm("Confirm update?");
}

// Move to Favorite
function clickFav() {
    $("#favoritesTab").click();
}

// Move to Transaction
function clickTran() {
    $("#transactionsTab").click();
}

// Show iHype Code
function showHypeCode(code){
    $("#hypeCodeModal").modal("toggle");
    $("#codeHere").html(code);
}

// Open Claim iHype Code Modal
function openClaimCodeModal(){
    if ($("#profileCardNumber").val() == "" || $("#profileEXP").val() == "" || $("#profileCVV").val() == ""){
        alert("Please update your Credit Card details!");
    } else {
        $("#claimCodeModal").modal("toggle");
        $("#hypeCodeInput").val("");
    }
}

// Open Review Modal
function openReviewModal(targetUser, session){
    $("#reviewsTab").click();
    $("#writeReviewTo").html(targetUser);
    $("#targetUserReview").val(targetUser);
    $("#itemSession").val(session);
    $("#writeReviewModal").modal("toggle");
}

// Transaction  Tab
$( document ).ready(function() {
    var tranDetail = $(".tranDetail");
    var tranHist = $(".tranHist");
    if (tranDetail.length > 2){
        $("#showMore1").css("display", "block");
        for (var i = 2; i <= tranDetail.length-1 ; i++){
            tranDetail[i].style.display = "none";
        }
    }
    if (tranHist.length > 2){
        $("#showMore2").css("display", "block");
        for (var i = 2; i <= tranHist.length-1 ; i++){
            tranHist[i].style.display = "none";
        }
    }
})
function clickShowMore(num){
    var tranDetail = $(".tranDetail");
    var tranHist = $(".tranHist");
    var total = 0;
    if (num == 1){
        total = 0;
        for (var i = 0; i < tranDetail.length; i++){
            if (tranDetail[i].style.display != "none"){ // If display: block then add 1
                total += 1;
            }
        }
        if (total+2 >= tranDetail.length){
            $("#showMore1").css("display", "none");
        }
        for (var i = total; i <= total+1 ; i++){
            if (tranDetail[i] != null){
                tranDetail[i].style.display = "block";
            }
        }
    } else {
        total = 0;
        for (var i = 0; i < tranHist.length; i++){
            if (tranHist[i].style.display != "none"){ // If display: block then add 1
                total += 1;
            }
        }
        if (total+2 >= tranHist.length){
            $("#showMore2").css("display", "none");
        }
        for (var i = total; i <= total+1 ; i++){
            if (tranHist[i] != null){
                tranHist[i].style.display = "block";
            }
        }
    }
}

// Profile view for Guest
function guestIsHere(){
    $("#claimCodeButton").css("display", "none");
    $("#changeImageButton").css("display", "none");
    $("#personalTab").css("display", "none");
    $("#transactionsTab").css("display", "none");
    $("#changeUsernameButton").css("display", "none");
    $("#editProfileButton").css("display", "none");
    $("#editProfileButton").attr("id", "editProfileButtonNOCHANGE");
    $("#createListingButton").css("display", "none");
    $("#insideInputMobile").css("top", "342px");
    $("#KaiButton").css("display", "block");
    var tabDiv = document.getElementsByClassName("shiftLeft");
    for (var i = 0; i<tabDiv.length; i++){
        var changeThis = tabDiv[i].getElementsByTagName("h4");
        var newWord = changeThis[0].innerHTML.split(" ").splice(1, 2).join(" ");
        tabDiv[i].innerHTML = "<h4>"+ newWord +"</h4>";
    }
}

// View Overlay to Change Avatar
$("#changeImageButton").on("click", function(){
    $("#overlay").css("display", "block");
    $("#updateAvatarButton").css("display", "none");
    $("#uploadImg").val("");
    cropForOverlayProfileImage(2);
})
$("#overlayX").click(function(){
    $("#overlay").css("display", "none");
})

// Cropping
function cropForOverlayProfileImage(num){
    if(num == 1) {
        var image = document.getElementById("overlayDummieImg");
    } else if (num == 2) {
        var image = document.getElementById("dummieImg");
    }
    var canvas = document.getElementById("overlayProfileImg");
    var ctx = canvas.getContext("2d");
    var width = image.naturalWidth;
    var height = image.naturalHeight;

    if (height == width) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
        var diff = width - height;
        var absPaddingDiff = Math.abs(diff) / 2;
        if (diff < 0) {
            ctx.drawImage(image, 0, absPaddingDiff, width, height-absPaddingDiff*2, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.drawImage(image, absPaddingDiff, 0, width-absPaddingDiff*2, height, 0, 0, canvas.width, canvas.height);
        }
    }
}

// Crop with Canvas
$("#overlayDummieImg").on("load", function(){
    cropForOverlayProfileImage(1);
    $("#updateAvatarButton").css("display", "inline-block");
})

// Update pic in Circle
function openFile(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        $("#overlayDummieImg").attr("src", dataURL);
    }
    reader.readAsDataURL(input.files[0]);
}

// Favorite Tab
$( document ).ready(function() {
    var images = document.getElementsByClassName("prodDummie");
    if(images != null){
        var canvas = document.getElementsByClassName("prodUserPic");
        var ctx;
        var width;
        var height;
    
        for(var i = 0; i<canvas.length; i++){
            width = images[i].naturalWidth;
            height = images[i].naturalHeight;
            ctx = canvas[i].getContext("2d");
            if (height == width) {
                ctx.drawImage(images[i], 0, 0, canvas[i].width, canvas[i].height);
            } else {
                var diff = width - height;
                var absPaddingDiff = Math.abs(diff) / 2;
                if (diff < 0) {
                    ctx.drawImage(images[i], 0, absPaddingDiff, width, height-absPaddingDiff*2, 0, 0, canvas[i].width, canvas[i].height);
                } else {
                    ctx.drawImage(images[i], absPaddingDiff, 0, width-absPaddingDiff*2, height, 0, 0, canvas[i].width, canvas[i].height);
                }
            }
        }
    }
});