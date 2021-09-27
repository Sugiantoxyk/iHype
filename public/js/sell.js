
// Step 2 Activation
$(".listingIMG").change(function(){
    if ($(".listingIMG").val() != null){
        $("#step2").css("display", "block");
    }else if($(".listingIMG").val() == null){
        $("#step2").css("display", "none");
    }
    console.log($(".listingIMG").val());
});

// Choosing Type of Gender (Step 3 Activation)
$("#fashionGender").change(function(){
    $("#listingMen").val("defaultMen");
    $("#listingWomen").val("defaultWomen");
    $("#step4").css("display", "none");
    if ($("#fashionGender").val() == "Men"){
        $("#listingMen").css("display", "block");
        $("#listingWomen").css("display", "none");
        $("#step3").css("display", "block");
    }else if($("#fashionGender").val() == "Women"){
        $("#listingWomen").css("display", "block");
        $("#listingMen").css("display", "none");
        $("#step3").css("display", "block");
    }
});

// Choosing Men's Category (Step 4 Activation)
$("#listingMen").change(function(){
    // Reset previously selected values
    $(".empty").val("");
    $(".size").val("");

    //Removing previous attributes
    $(".empty").removeAttr("required");
    $(".size").removeAttr("required");

    // Show brands for men
    $("#menBrand").css("display", "block");
    $("#womenBrand").css("display", "none");
    $("#womenBrand").val("");
    console.log("Men Brand");

    // Clearing Brand Inputs
    $(".brandSelect").val("");
    $("#inputBrand").val("");
    $("#inputBrand").css("display", "none");

    // Assigning appropriate attributes to brand select
    if ($("#fashionGender").val()=="Men"){
        $("#menBrand").attr("required", "required")
        $("#menBrand").attr("name", "brand")
        $("#womenBrand").removeAttr("required")
        $("#womenBrand").removeAttr("name")
    }else{
        $("#womenBrand").attr("required", "required")
        $("#womenBrand").attr("name", "brand")
        $("#menBrand").removeAttr("required")
        $("#menBrand").removeAttr("name")
    }
    // Hide Women Inputs
    $(".womenInputs").css("display","none");
    // Hide Men Inputs
    $(".menInputs").css("display","none");
    
    // Showing appropriate inputs based on selected category
    if ($("#listingWomen").val() == null){
        $("#step4").css("display", "block");
        if ($("#listingMen").val() == "Clothing"){
            console.log("Clothing");
            $("#menClothing").css("display", "block")
            $("#menClothingType").attr("required", "required");
        }else if($("#listingMen").val() == "Bags"){
            console.log("Men's Bags");
            $("#menBags").css("display", "block")
            $("#menBagMaterial").css("display", "block");
            $(".menBags").attr("required", "required");
            console.log("Men's Bags");
        }else if($("#listingMen").val() == "Accessories"){
            console.log("Men's Accessories");
            $("#menAccessories").css("display", "block");
            $(".menAccessories").attr("required", "required");
        }else if($("#listingMen").val() == "Watches"){
            console.log("Men's Watches");
            $("#menWatches").css("display", "block");
            $("#watchMovement").css("display", "block");
            $("#watchStrapType").css("display", "block");
            $("#watchDial").css("display", "block");
            $(".menWatches").attr("required", "required");

        }else if($("#listingMen").val() == "Shoes"){
            console.log("Men's Shoes");
            $("#menFootwear").css("display", "block");
            $("#menShoeSize").css("display", "block");
            $(".menFootwear").attr("required", "required");
            $(".menShoeSize").attr("required", "required");
        }
    }
});

// Choosing Men's Clothing
$("#menClothingType").change(function(){
    $("#menTop").removeAttr("required")
    $("#menBottom").removeAttr("required")
    if ($("#menClothingType").val() == "Mens Tops"){
        $("#menTopSize").css("display", "block");
        $("#menBottomSize").css("display", "none");
        $("#menTop").attr("required", "required");
        $(".size").val("");
        console.log("Men's Top");
    }else if ($("#menClothingType").val() == "Mens Bottoms"){
        $("#menBottomSize").css("display", "block");
        $("#menTopSize").css("display", "none");
        $("#menBottom").attr("required", "required");
        $(".size").val("");
        console.log("Mens Bottom");
    }
})

// Choosing Women's Category
$("#listingWomen").change(function(){
    $(".empty").val("");
    $(".size").val("");

    // Show brands for women
    $("#womenBrand").css("display", "block");
    $("#menBrand").css("display", "none");
    $("#menBrand").val("");
    console.log("Women Brand");

    // Clearing Brand Inputs
    $(".brandSelect").val("");
    $("#inputBrand").val("");
    $("#inputBrand").css("display", "none");

    // Clear Women's Inputs
    $(".womenInputs").css("display","none");
    // Clear Men's Inputs
    $(".menInputs").css("display","none");

    // Showing appropriate inputs based on selected category
    if ($("#listingMen").val() == null){
        $("#step4").css("display", "block");
        if ($("#listingWomen").val() == "Clothing"){
            $("#womenClothing").css("display", "block");
            $("#womenClothingType").attr("required", "required");
            console.log("Women's Clothing")
        }else if($("#listingWomen").val() == "Dresses"){
            $("#womenDresses").css("display", "block");
            $(".womenDresses").attr("required", "required");
            console.log("Women's Dresses")
        }else if($("#listingWomen").val() == "Bags"){
            $("#womenBags").css("display", "block");
            $("#womenBagMaterial").css("display", "block");
            $(".womenBags").attr("required", "required");
            console.log("Women's Bags")
        }else if($("#listingWomen").val() == "Accessories"){
            $("#womenAccessories").css("display", "block");
            $(".womenAccessories").attr("required", "required");
            console.log("Women's Accessories")
        }else if($("#listingWomen").val() == "Jewellery"){
            $("#womenJewelry").css("display", "block");
            $(".womenJewelry").attr("required", "required");
            console.log("Women's Jewellery")
        }else if($("#listingWomen").val() == "Shoes"){
            $("#womenFootwear").css("display", "block");
            $("#womenShoeSize").css("display", "block");
            $(".womenFootwear").attr("required", "required");
            $(".womenShoeSize").attr("required", "required");
            console.log("Women's Shoes")
        }
    }
});

// Choosing Women's Clothing
$("#womenClothingType").change(function(){
    if ($("#womenClothingType").val() == "Womens Tops"){
        $("#womenTopSize").css("display", "block");;
        $("#womenTop").attr("required", "required");
        $("#womenBottomSize").css("display", "none");
        $(".size").val("");
        console.log("Women's Top");
    }else if ($("#womenClothingType").val() == "Womens Bottoms"){
        $("#womenBottomSize").css("display", "block");
        $("#womenBottom").attr("required", "required");
        $("#womenTopSize").css("display", "none");
        $(".size").val("");
        console.log("Women's Bottom");
    }
})

// Give user option to input brand (also removing )
$(".brandSelect").change(function(){
    $("#inputBrand").val("");
    if($("#womenBrand").val() == "Other" || $("#menBrand").val() == "Other"){
        console.log("Show Brand Input");
        $("#inputBrand").css("display", "block");
        $("#inputBrand").attr("required", "required");
    }else{
        $("#inputBrand").css("display", "none");
        $("#inputBrand").removeAttr("required");
    }
})

// Add name="brand" and required="required" to respective brand based on gender selection
function getBrand(){
    if ($("#fashionGender").val()=="Men"){
        $("#menBrand").attr("required", "required")
        $("#menBrand").attr("name", "brand")
        $("#womenBrand").removeAttr("required")
        $("#womenBrand").removeAttr("name")
    }else{
        $("#womenBrand").attr("required", "required")
        $("#womenBrand").attr("name", "brand")
        $("#menBrand").removeAttr("required")
        $("#menBrand").removeAttr("name")
    }
}