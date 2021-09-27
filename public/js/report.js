function deleteBtn(deleting){    
    var conf = confirm("Are you sure ?");
    if (conf == true){
        $.ajax({
                url: '/deleteReport',
                type: 'post',
                data:{
                    report_id: deleting,
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

function checkbutton(checking) {
    $.ajax({
        url:'/check',
        type: 'post',
        data:{
            report_id: checking,
            checked: "yes"
        },
        async: false,
        success: function(){
            console.log("Check Successfully");
            window.location.reload();
        },
        error: function(){
            alert('Check Unsuccessfully');
            console.log(result.message);
        }
    })
}

function uncheckbutton(checking) {
    $.ajax({
        url:'/uncheck',
        type: 'post',
        data:{
            report_id: checking,
            checked: "no"
        },
        async: false,
        success: function(){
            console.log("Uncheck Successful");
            window.location.reload();
        },
        error: function(){
            alert('Check Successfully');
            console.log(result.message);
        }
    })
}

$("#pendingDown").click(function(){
    $('#pendingUp').css('display', 'block');
    $('#pendingDown').css('display', 'none');
    $('.pendingReports').css('display', 'block');
})

$("#pendingUp").click(function(){
    $('#pendingDown').css('display', 'block');
    $('#pendingUp').css('display', 'none');
    $('.pendingReports').css('display', 'none');
})

$("#resolvedDown").click(function(){
    $('#resolvedUp').css('display', 'block');
    $('#resolvedDown').css('display', 'none');
    $('.resolvedReports').css('display', 'block');
})

$("#resolvedUp").click(function(){
    $('#resolvedDown').css('display', 'block');
    $('#resolvedUp').css('display', 'none');
    $('.resolvedReports').css('display', 'none');
})

$(".item").hover(function(){
    $(".item").css('position', 'static');
})