$(document).ready(function(){
    console.log("order eka load wunooo");

    loadItemComboBoxes();
    loadCusComboBoxes();
    loadCurrentDate();

});

$('#btnPlaceOrder').on('click', () => {
    console.log("place order btn eka ebuwa")
});

const itemCartArray = [];





/*------------- load combo boxes -------------------*/

function loadItemComboBoxes(){
    console.log("loadItemCMB");

    $.ajax({
        url:"http://localhost:8080/api/v1/item",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);


            // Clear the existing items in the dropdown or list
            $('#O-itemID').empty();

            // Loop through the results to get all item IDs
            results.forEach(function(item) {


                // Assuming each item has a property named 'itemID'
                const itemID = item.code;

                // Add each itemID to the dropdown or list
                $('#O-itemID').append(`<option value="${itemID}">${itemID}</option>`);
            });


        }
    });
}

/*--------------------------------------------------*/



/*---------------  load Customer ComboBox ------------*/
function loadCusComboBoxes(){
    console.log("loadCusCMB");

    $.ajax({
        url:"http://localhost:8080/api/v1/customer",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);


            // Clear the existing items in the dropdown or list
            $('#orderCusId').empty();

            // Loop through the results to get all item IDs
            results.forEach(function(customer) {


                // Assuming each customer has a property named 'id'
                const cusID = customer.id;

                // Add each itemID to the dropdown or list
                $('#orderCusId').append(`<option value="${cusID}">${cusID}</option>`);
            });


        }
    });
}
/*---------------------------------------------------*/




/*---------------- load current date -----------------*/
function loadCurrentDate() {
    // Create a new Date object representing the current date and time
    const today = new Date();

    // Extract the year, month, and day from the Date object
    const year = today.getFullYear(); // Get the full year (e.g., 2024)
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), add 1, and pad with a leading zero if necessary
    const day = String(today.getDate()).padStart(2, '0'); // Get the day of the month and pad with a leading zero if necessary

    // Format the date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Display the formatted date (for example, in an input field with ID "dateInput")
    $('#orderDate').val(formattedDate);
}

/*----------------------------------------------------*/


/*--------------- load the Item Data ------------*/

$('#O-itemID').change(function () {
    console.log("clicke cmb");
    var itemId = $(this).val();
    console.log("itemId:", itemId);
    loadItemData(itemId);
});

function loadItemData(itemId){

    $.ajax({
        url:"http://localhost:8080/api/v1/item",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);

            // Loop through the results to get all item IDs
            results.forEach(function(item) {
                if((item.code)==itemId){
                    var itemName = item.name;
                    var itemQty=item.qty;
                    var itemPrice = item.price;


                    console.log("itemName:"+ itemName,"itemQty"+itemQty,"itemPrice"+itemPrice);

                    $('#O-itemName').val(itemName);
                    $('#O-itemPrice').val(itemPrice);
                    $('#O-itemQty').val(itemQty);


                }
            });


        }
    });

}
/*----------------------------------------------------*/


/*--------------- load the Cus Data ------------*/

$('#orderCusId').change(function () {
    console.log("clicke cmb");
    var cusId = $(this).val();
    console.log("cusId:", cusId);
    loadCusData(cusId);
});

function loadCusData(cusId){

    $.ajax({
        url:"http://localhost:8080/api/v1/customer",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);

            // Loop through the results to get all item IDs
            results.forEach(function(customer) {
                if((customer.id)==cusId){
                    var cusName = customer.id;
                    var cusAddress=customer.name;
                    var cusPhone = customer.phone;


                    console.log("cusName:"+ cusName,"cusAddress"+cusAddress,"cusPhone"+cusPhone);

                    $('#orderCusName').val(cusName);
                    $('#orderCusAddress').val(cusAddress);
                    $('#orderCusContact').val(cusPhone);


                }
            });


        }
    });

}
/*----------------------------------------------------*/



var total =0;
var finalTotal=0;


$("#btnAddItem").on('click', () => {
    console.log("btnAddClicked")

    var OrderId = $('#orderID').val();
    var OrderItemId = $('#O-itemID').val();
    var OrderItemName = $('#O-itemName').val();
    var OrderItemPriceString = $('#O-itemPrice').val();
    var OrderItemPrice = parseFloat(OrderItemPriceString.replace(/[^0-9.]/g, ''));
    console.log(OrderItemPrice+"OrderItemPrice");


    // Parse quantity as integer
    var OrderQtyString = $('#O-orderQty').val();
    var OrderQty = parseInt(OrderQtyString);
    console.log(OrderQty+"orderQty");

    if (isNaN(OrderItemPrice) || isNaN(OrderQty)) {
        alert("Please enter valid numbers for price and quantity.");
        return;
    }

    updateItemQty();

    total = OrderQty * OrderItemPrice;
    console.log("total: " + total);

    finalTotal += total; // Incrementally add to final total
    console.log("Final Total: " + finalTotal);

    $('#totalPriceLabel').text(finalTotal);

    // Create an object to store item data
    const itemCart={
        orderId:OrderId,
        itemCode: OrderItemId,
        itemName: OrderItemName,
        qty:OrderQty,
        price:OrderItemPrice,
        total: total
    }

     itemCartArray.push(itemCart);

    loadItemCartTable()







    /* const jsonItemCart = JSON.stringify(itemCart);
     console.log("jsonObject:" + jsonItemCart.toString());


     $.ajax({
         url: "http://localhost:8080/itemCart",
         type: "POST",
         data: jsonItemCart,
         headers: {"Content-Type": "application/json"},
         success: function (results) {
             console.log("results" + results.toString())
             alert('ItemCart saved successfully...')


         },
         error: function (error) {
             console.log(error)
             alert('ItemCart not saved...')
         }
     });*/


    $('#O-itemID').val('');
    $('#O-itemName').val('');
    $('#O-itemPrice').val('');
    $('#O-orderQty').val('');




    /*----------------------------------------------------*/
    $("#discount, #cash").on('input', () => { // listeners danoo
        var discount = parseFloat($('#discount').val()); // meken eka parse krla ganno
        if (isNaN(discount) || discount < 0) { // mekedi balnoo meka not a numberda ntm 0 wlta wada aduda kila ehenm ekata 0 assign karanoo
            discount = 0;
        }

        var discountedTotal = finalTotal - (finalTotal * (discount / 100)); //equation
        $('#subTotalPriceLabel').text(discountedTotal.toFixed(2)); // meken decimal dekakata convert karanoo like 20.123 awill tibboth 20.12 karanoo

        var cash = parseFloat($('#cash').val());  // same thing checked above
        if (isNaN(cash) || cash < 0) {
            cash = 0;
        }

        var balance = cash - discountedTotal; //equation
        $('#balance').val(balance.toFixed(2));
    });


    function updateItemQty(){

        var itemId = $('#O-itemID').val();

        var itemName = $('#O-itemName').val();

        var itemQty =$('#O-itemQty').val(itemQty);

        var itemPrice =$('#O-itemPrice').val(itemQty);



        const item = {
            id: itemId,
            name: itemName,
            qty: itemQty,
            price: itemPrice

        };

        const jsonItem = JSON.stringify(item);
        console.log("jsonObject:" + item);


        $.ajax({
            url: "http://localhost:8080/api/v1/item/" + itemId,
            type: "PUT",
            data: jsonItem,
            headers: {"Content-Type": "application/json"},
            success: function (results) {
                console.log(results)
                alert('Item updated successfully...')
                loadItemTable()
            },
            error: function (error) {
                console.log(error)
                alert('Item update failed......')
            }
        });
    }



    /*-------------------------load item Cart Table ----------------------*/

    function loadItemCartTable(){
        console.log("load itemCart loaded")
        // Clear the existing table body once, before the loop
        $('#item-cart-tablebody').empty();

// If you are iterating over itemCartArray
        for (let i = 0; i < itemCartArray.length; i++) {
            // Assuming results should come from itemCartArray (otherwise use results directly)
            var item = itemCartArray[i];
            console.log(item)

            var record = `
        <tr>
            <tr>
                            <td class="itemCart-id-value">${item.itemCode}</td>
                             <td class="itemCart-name-value">${item.itemName}</td>
                            <td class="itemCart-qty-value">${item.qty}</td>
                            <td class="itemCart-price-value">${item.price}</td>
                            <td class="itemCart-total-value">${item.total}</td>
                        </tr>
        </tr>
    `;
            // Append the new row to the table
            $("#item-cart-tablebody").append(record);
        }
    }




});




