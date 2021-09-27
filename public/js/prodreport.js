function reportButton(title, reason){
    $.ajax({
        url: 'prodreport',
        type: "post",
        data:{
            prod_report_title: title,
            prod_report_content: reason
        },
        async: false,
        success: function(){
            console.log("Product Report Successful");
            window.onload.reload();
        },
        error: function(){
            console.log("Product Report Unsuccessful");
            console.log(result.message);
        }
    })
}

function showCat(){
    $('.cat-select').css('display', 'block');
}

function showDesc(op){
    if(op.value == "Counterfeit"){
        $('#cat1-info').css('display', 'block');
        $('#cat2-info').css('display', 'none');
        $('#cat3-info').css('display', 'none');
        $('#cat4-info').css('display', 'none');
        $('#cat5-info').css('display', 'none');
        $('.cat-select').css('display', 'none');
    }
    else if(op.value == "Wrong Category"){
        $('#cat1-info').css('display', 'none');
        $('#cat2-info').css('display', 'block');
        $('#cat3-info').css('display', 'none');
        $('#cat4-info').css('display', 'none');
        $('#cat5-info').css('display', 'none');
        $('.cat-select').css('display', 'block');
    }
    else if(op.value == "Duplicate Post"){
        $('#cat1-info').css('display', 'none');
        $('#cat2-info').css('display', 'none');
        $('#cat3-info').css('display', 'block');
        $('#cat4-info').css('display', 'none');
        $('#cat5-info').css('display', 'none');
        $('.cat-select').css('display', 'none');
    }
    else if(op.value == "Offensive Content"){
        $('#cat1-info').css('display', 'none');
        $('#cat2-info').css('display', 'none');
        $('#cat3-info').css('display', 'none');
        $('#cat4-info').css('display', 'block');
        $('#cat5-info').css('display', 'none');
        $('.cat-select').css('display', 'none');
    }
    else if(op.value == "Irrelevant Keywords"){
        $('#cat1-info').css('display', 'none');
        $('#cat2-info').css('display', 'none');
        $('#cat3-info').css('display', 'none');
        $('#cat4-info').css('display', 'none');
        $('#cat5-info').css('display', 'block');
        $('.cat-select').css('display', 'none');
    }
}

function deleteBtn(deleting){    
    var conf = confirm("Are you sure ?");
    if (conf == true){
        $.ajax({
                url: '/deleteProdReport',
                type: 'post',
                data:{
                    prod_report_id: deleting,
                },
                success: function(result) {
                    console.log('Delete Successfully')
                    window.location.reload();
                },
                error: function(result){
                    alert("Unable to delete report.");
                    console.log(result.message);
                } 
            });  
    }
};