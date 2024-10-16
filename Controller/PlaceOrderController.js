/*



autoGenerateOrderId("");
console.log("orderIdcalled");


function autoGenerateOrderId(orderId) {

    console.log("currentOrderId: " + orderId);

    if(orderId !== "") {
        var split = [];
        split = orderId.split("O0");
        var id = Number.parseInt(split[1]);
        id++;
        if(id < 10) {
            $("#orderID").val("O00" + id);
        }else{
            $("#orderID").val("O0" + id);
        }
    } else {
        $("#orderID").val("O001");
    }

}

/!*------------------------------------------*!/




function loadComboBoxes(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    var comboBox = $(comboBoxId); //uda ena comboxId eka tama meken ganne

    // clearing the combo 2
    comboBox.empty();

    //udata ena arrya ek aganata iterate krnoo
    for (var i = 0; i < array.length; i++) {
        // array eke current index eke id eka ganno
        var id = array[i].id;
        // Append option to combo box
        comboBox.append($('<option>', {value: id, text: id}));
    }

    // If there's only one item, manually trigger change event
    if (array.length === 1) {
        comboBox.one('click', function() {
            $(this).change();
        });
    }
}

$('#placeOrder-link').click(function () {  //place order link eka ebuwama witharak meka load wenna ona e nisaii header link ekata id dunne ntm mulinma load unoth arraya nisa data na
    console.log("main method");

    loadComboBoxes(customers, '#orderCusId'); // meken method ekata array ekai cmb id ekai yawanoo
    loadComboBoxes(items, '#O-itemID');

    if( orderDetails===0){
       var GenertedOID = autoGenerateOrderId("");
        console.log("cllunaid generator eka");

    }

});

function loadCusData(cusId) {
    console.log("loaded the loadCusData");
    for (var i = 0; i < customers.length; i++) {
        if (cusId === customers[i].id) {
            console.log("cusName", customers[i].Name);
            $('#orderCusName').val(customers[i].Name);
            $('#orderCusAddress').val(customers[i].address);
            $('#orderCusContact').val(customers[i].contactNo);
        }
    }
}

$('#orderCusId').change(function () {
    console.log("clicke cmb");
    var cusId = $(this).val();
    console.log("cusId:", cusId);
    loadCusData(cusId);
});

/!*=======================LOAD ITEM DATA=========================*!/

function loadItemData(itemId) {
    console.log("loaded the loadItemData");
    for (var i = 0; i < items.length; i++) {
        if (itemId === items[i].id) {
            console.log("itemName", items[i].Name);
            $('#O-itemName').val(items[i].Name);
            $('#O-itemPrice').val(items[i].price);
            $('#O-itemQty').val(items[i].qty);
        }
    }
}

$('#O-itemID').change(function () {
    console.log("clicked item combo");
    var itemId = $(this).val();
    console.log("itemId:", itemId);
    loadItemData(itemId);
});


/!*===================================Load to the table====================*!/
function loadTable() {
    $('#item-cart-tablebody').empty();

   itemCart.map((itemCart, index) => {
        var record = `
            <tr>
                <td class="cartItemId">${itemCart.itemId}</td>
                <td class="cartItemName">${itemCart.ItemName}</td>
                <td class="cartItemQty">${itemCart.Qty}</td>
                <td class="cartItemPrice">${itemCart.Price}</td>
                <td class="cartItemTotal">${itemCart.Total}</td>
            </tr>
        `;
        $("#item-cart-tablebody").append(record);
    });
}







function updateItemQty() {

    var OrderItemId = $('#O-itemID').val();

    for (var i = 0; i < items.length; i++) {
        if (OrderItemId === items[i].id) {
            var currentItemQty = items[i].qty;
            console.log("currentItemQty : "+currentItemQty);
            var OrderQty = parseInt($('#O-orderQty').val());
            console.log("currentOrderQty : "+OrderQty);
            var updatedQty = currentItemQty - OrderQty;
            console.log("updateQty : "+updatedQty);

            items[i].qty = updatedQty;
            console.log(" items[i].qty"+ items[i].qty);
        }

    }


    var OrderItemId = $('#O-itemID').val();



}


/!*==============================save to the cart=======================*!/
var total =0;
var finalTotal=0;
$("#btnAddItem").on('click', () => {
    var OrderItemId = $('#O-itemID').val();
    var OrderItemName = $('#O-itemName').val();

    // Strip non-numeric characters from price
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


   /!* updateItemQty();*!/


     total = OrderQty * OrderItemPrice;
    console.log("total: " + total);

    finalTotal += total; // Incrementally add to final total
    console.log("Final Total: " + finalTotal);

    $('#totalPriceLabel').text(finalTotal);

    // Create an object to store item data
    let cartItem = new ItemCartModel(OrderItemId, OrderItemName,  OrderQty, OrderItemPrice,total);
    console.log("Before sending to the table");


    // Push the object to the itemCart array
    itemCart.push(cartItem);

    /!*updateItemQty(OrderItemId, OrderQty);*!/

    console.log(itemCart);
    loadTable();

    $('#O-itemID').val('');
    $('#O-itemName').val('');
    $('#O-itemPrice').val('');
    $('#O-orderQty').val('');




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
});

/!*================================================placing an order==================================*!/

$('#btnPlaceOrder').on('click', () => {


    var OrderId = $('#orderID').val();
    var OrderDate = $('#orderDate').val();
    var CustomerId = $('#orderCusId').val();
    var CustomerName = $('#orderCusName').val();
    var total=$('#totalPriceLabel').text();




  /!*  var discount=$('#discount').val();*!/

    var discount = parseFloat($('#discount').val()); // meken eka parse krla ganno
    if (isNaN(discount) || discount < 0) { // mekedi balnoo meka not a numberda ntm 0 wlta wada aduda kila ehenm ekata 0 assign karanoo
        discount = 0;
    }


    var subTotal=$('#subTotalPriceLabel').text();


    console.log(OrderId);
    console.log(OrderDate);
    console.log(CustomerId);
    console.log(CustomerName);
    console.log(total);
    console.log(discount);
    console.log(subTotal);

    let orderValues = [OrderId,OrderDate,CustomerId,CustomerName,total,discount,subTotal]
    orderDetails.push(orderValues);

    console.log(orderDetails);



    loadODTable();


    $('#totalPriceLabel').val('');
    $('#discount').val('');
    $('#subTotalPriceLabel').val('');


    $('#orderID').val('');
    $('#orderDate').val('');
    $('#orderCusId').val('');
    $('#orderCusName').val('');
    $('#orderCusAddress').val('');
    $('#orderCusContact').val('');

    autoGenerateOrderId(OrderId);




    /!*let orderDetailRec = new orderDetailsModel(OrderId,OrderDate,CustomerId,CustomerName,total,discount,subTotal);
    console.log("orderDetail11 :"+ orderDetailRec);



    orderDetails.push(orderDetailRec);
    console.log("orderDetaisl :"+ orderDetails);*!/


  //  loadODTable();


});



/!*==========================loading order Detail Table=================================*!/


$('#orderDetail-link').click(function () {  //place order link eka ebuwama witharak meka load wenna ona e nisaii header link ekata id dunne ntm mulinma load unoth arraya nisa data na
    console.log("main method");
    loadODTable();
    console.log("load eka cll una");
});



/!*function loadODTable() {
    // Clear existing rows in the table body
    $('#orderDetails-tablebody').empty();

    // Iterate through each order detail in orderDetails array
    orderDetails.forEach((orderDetail) => {
        // Construct HTML for a new table row using template literals
        var record = `
            <tr>
                <td class="cartOrderId">${orderDetail[0]}</td>
                <td class="cartOrderDate">${orderDetail[1]}</td>
                <td class="cartCusId">${orderDetail[2]}</td>
                <td class="cartCusName">${orderDetail[3]}</td>
                <td class="cartTotal">${orderDetail[4]}</td>
                <td class="cartDiscount">${orderDetail[5]}</td>
                <td class="cartFinalTotal">${orderDetail[6]}</td>
            </tr>
        `;

        // Append the constructed row HTML to the table body
        $("#orderDetails-tablebody").append(record);

    });
}*!/




function loadODTable() {
    // Select the table body where rows will be appended
    var tableBody = $('#orderDetail-tablebody');

    // Clear existing rows if any
    tableBody.empty();

    // Iterate through each order in orderDetails array
    orderDetails.forEach(function(order) {
        // Create a new row element
        var row = $('<tr>');

        // Append columns (cells) to the row
        $('<td>').text(order[0]).appendTo(row); // OrderId
        $('<td>').text(order[2]).appendTo(row); // CustomerId
        $('<td>').text(order[3]).appendTo(row); // CustomerName
        $('<td>').text(order[4]).appendTo(row); // Total
        $('<td>').text(order[5]).appendTo(row); // Discount
        $('<td>').text(order[6]).appendTo(row); // SubTotal

        // Append the row to the table body
        tableBody.append(row);
    });
} /!* mekath hari but terum ganna amaruiii*!/


/!*===============================================Generating OrderId============================*!/





/!*
var orderIdCounter = 0; // Counter for generating sequential order IDs

function autoGenerateOrderId() {
   orderIdCounter= orderIdCounter++;
    if (orderIdCounter < 10) {
        return "O00" + orderIdCounter;
    } else if (orderIdCounter < 100) {
        return "O0" + orderIdCounter;
    } else {
        return "O" + orderIdCounter;
    }
}
*!/



*/
