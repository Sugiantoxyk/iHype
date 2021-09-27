var mainNav = $("#main-nav");
var navbarToggle = $("#navbar-toggle");

navbarToggle.click(function() {
    if(mainNav.css("display") == "none"){
        mainNav.css("display", "flex");
    }
    else{
        mainNav.css("display", "none");
    }
})

window.onresize = function(){
    if($("#navbar-toggle").css("display") == "none"){
        $(".nav-links").attr("data-toggle", "dropdown")
        .attr("data-target", "");
        $(".menCate").attr("class", "nav-links menCate");
        $(".womenCate").attr("class", "nav-links womenCate");
        $(".collapse").attr("class", "dropdown-menu")
        .attr("style", "");
    }else {
        $(".nav-links").attr("data-toggle", "collapse");
        $(".menCate").attr("data-target", "#menCate");
        $(".womenCate").attr("data-target", "#womenCate");
        $(".dropdown-menu").attr("class", "collapse");
    }
}

window.onload = function(){
    if($("#navbar-toggle").css("display") == "none"){
        $(".nav-links").attr("data-toggle", "dropdown")
        .attr("data-target", "");
        $(".menCate").attr("class", "nav-links menCate");
        $(".womenCate").attr("class", "nav-links womenCate");
        $(".collapse").attr("class", "dropdown-menu")
        .attr("style", "");
    }else {
        $(".nav-links").attr("data-toggle", "collapse");
        $(".menCate").attr("data-target", "#menCate");
        $(".womenCate").attr("data-target", "#womenCate");
        $(".dropdown-menu").attr("class", "collapse");
    }

    cropWithCanvas();
}

// Profile Pic
function cropWithCanvas(){
    var image = document.getElementById("dummieImg");
    if(image != null){
        var canvas = document.getElementsByClassName("profileImg");
        var ctx;
        var width = image.naturalWidth;
        var height = image.naturalHeight;
    
        for(var i = 0; i < canvas.length; i++){
            ctx = canvas[i].getContext("2d");
            if (height == width) {
                ctx.drawImage(image, 0, 0, canvas[i].width, canvas[i].height);
            } else {
                var diff = width - height;
                var absPaddingDiff = Math.abs(diff) / 2;
                if (diff < 0) {
                    ctx.drawImage(image, 0, absPaddingDiff, width, height-absPaddingDiff*2, 0, 0, canvas[i].width, canvas[i].height);
                } else {
                    ctx.drawImage(image, absPaddingDiff, 0, width-absPaddingDiff*2, height, 0, 0, canvas[i].width, canvas[i].height);
                }
            }
        }
    }
}