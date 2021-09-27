function deleteBtn(deleting){    
    var conf = confirm("Are you sure ?");
    if (conf == true){
        $.ajax({
                url: '/deleteReportedUser',
                type: 'post',
                data:{
                    report_id: deleting,
                },
                success: function(result) {
                    console.log('Delete Successfully')
                    window.location.reload();
                },
                error: function(result){
                    console.log("Unable to delete report.");
                    console.log(result.message);
                } 
            });  
    }
};


function banButton(banning, reasoning) {
    $.ajax({
        url: '/ban',
        type: 'post',
        data:{
            username: banning,
            reason: reasoning,
            banned: "yes"
        },
        async: false,
        success: function(){
            console.log("Ban Successfully");
            window.location.reload();
        },
        error: function(){
            console.log('Ban Unsuccessfully');
            console.log(result.message);
        }
    });
};

function unbanButton(banning, deleting){
    var conf = confirm("Are you sure ?");
    if (conf == true){
        $.ajax({
            url: '/deleteBan',
            type: 'post',
            data:{
                username: banning,
                banned: "no",
                ban_id: deleting
            },
            async: false,
            success: function(){
                console.log("Unban Successfully");
                window.location.reload();
            },
            error: function(){
                console.log('Unban Unsuccessfully');
                console.log(result.message);
            }
        });
    }   
};

$('.BLbtn').click(function(){
    $(".FaqForm").css('display', 'block');
    $("#banninguser").html(this.getAttribute('value'))
});

$('.BLclose').click(function(){
    $(".FaqForm").css('display', 'none');
})