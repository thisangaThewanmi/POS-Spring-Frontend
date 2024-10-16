
$(document).ready(function(){
    console.log("orderDtailed loadd")
loadTableOrderDetail()

});



/*-------------------------- loas table -----------------------*/

function loadTableOrderDetail() {
    console.log("loadTable function called OD tbale");


    $.ajax({
        url: "http://localhost:8080/api/v1/order",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);


            $('#orderDetail-tablebody').empty();  // Clear the existing table body

            results.forEach(function (order) {
                var record = `
                        <tr>
                            <td class="order-id-value">${order.orderId}</td>
                            <td class="order-date-value">${order.orderDate}</td>
                            <td class="order-cusId-value">${order.customerId}</td>
                            <td class="order-total-value">${order.total}</td>
                           <td class="order-discount-value">${order.discount}</td>
                            <td class="order-subtotal-value">${order.subtotal}</td>


                        </tr>
                    `;
                $("#orderDetail-tablebody").append(record);
            })
        }
    });


}