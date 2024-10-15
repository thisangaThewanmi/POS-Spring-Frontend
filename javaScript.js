$('#customer').css({display:'block'});
$('#item').css({display:'none'});
$('#order').css({display:'none'});
$('#orderDetail').css({display:'none'});


//student click
$('#cus-link').on('click',()=>{
    console.log("student click")

    $('#customer').css({display:'block'});
    $('#item').css({display:'none'});
    $('#order').css({display:'none'});
    $('#orderDetail').css({display:'none'});

});

//course click
$('#item-link').on('click',()=>{
    console.log("course click")

    $('#customer').css({display:'none'});
    $('#item').css({display:'block'});
    $('#order').css({display:'none'});
    $('#orderDetail').css({display:'none'});
});

$('#placeOrder-link').on('click',()=>{
    console.log("course click")

    $('#customer').css({display:'none'});
    $('#item').css({display:'none'});
    $('#order').css({display:'block'});
    $('#orderDetail').css({display:'none'});

});

$('#orderDetail-link').on('click',()=>{
    console.log("course click")

    $('#customer').css({display:'none'});
    $('#item').css({display:'none'});
    $('#order').css({display:'none'});
    $('#orderDetail').css({display:'block'});
});

