function changeFunc() {
    if($("#loginCont").css("display") == "block"){
        $("#registerCont").css("display", "block");
        $("#loginCont").css("display", "none");
        $(".titleTitle").html("Register!")
        .css("margin-left", "-50px");
        $("title").html("iHype - Register");
        $(".secondRow").html("<p>Already have an account? <span id='changeButton' onclick='changeFunc()'>Log in now!</span></p>");
    } else {
        $("#registerCont").css("display", "none");
        $("#loginCont").css("display", "block");
        $(".titleTitle").html("Log in!")
        .css("margin-left", "-100px");
        $("title").html("iHype - Login");
        $(".secondRow").html("<p>Need an account? <span id='changeButton' onclick='changeFunc()'>Sign up now!</span></p>");
    }
}

/* Bottom right div */
function clickUser() {
    $("#userUser").attr("class", "onThis");
    $("#adminAdmin").attr("class", "");
    $(".secondRow").css("display", "block");
    $("#userLoginCont").css("display", "block");
    $("#adminLoginCont").css("display", "none");
    $(".whenNotAdmin").css("display", "block");
    $(".whenAdmin").css("display", "none");
}
function clickAdmin() {
    $("#adminAdmin").attr("class", "onThis");
    $("#userUser").attr("class", "");
    $(".secondRow").css("display", "none");
    $("#adminLoginCont").css("display", "block");
    $("#userLoginCont").css("display", "none");
    $(".whenAdmin").css("display", "block");
    $(".whenNotAdmin").css("display", "none");
}