// delte FAQ
function deleteBtn(deleting){    
    var conf = confirm("Are you sure ?");
    if (conf == true){
        $.ajax({
                url: '/deleteFaq',
                type: 'post',
                data:{
                    faq_id: deleting,
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


//category-box select
$('#category-account').click(function(){
    $('#account').css('display', 'block');
    $('#techsupport').css('display', 'none');
    $('#hypecode').css('display', 'none');
    $('#others').css('display', 'none');
    $('#acct-title').css('display', 'block');
    $('#tech-title').css('display', 'none');
    $('#hype-title').css('display', 'none');
    $('#oth-title').css('display', 'none');
});

$('#category-techsupport').click(function(){
    $('#account').css('display', 'none');
    $('#techsupport').css('display', 'block');
    $('#hypecode').css('display', 'none');
    $('#others').css('display', 'none');
    $('#acct-title').css('display', 'none');
    $('#tech-title').css('display', 'block');
    $('#hype-title').css('display', 'none');
    $('#oth-title').css('display', 'none');
});

$('#category-hypecode').click(function(){
    $('#account').css('display', 'none');
    $('#techsupport').css('display', 'none');
    $('#hypecode').css('display', 'block');
    $('#others').css('display', 'none');
    $('#acct-title').css('display', 'none');
    $('#tech-title').css('display', 'none');
    $('#hype-title').css('display', 'block');
    $('#oth-title').css('display', 'none');
});

$('#category-others').click(function(){
    $('#account').css('display', 'none');
    $('#techsupport').css('display', 'none');
    $('#hypecode').css('display', 'none');
    $('#others').css('display', 'block');
    $('#acct-title').css('display', 'none');
    $('#tech-title').css('display', 'none');
    $('#hype-title').css('display', 'none');
    $('#oth-title').css('display', 'block');
})
