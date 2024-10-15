
var ItemRecordIndex;

$(document).ready(function() {
    initializeItemForm();

    function initializeItemForm() {
        // Load item table data on page load
        loadItemTable();

        // Event handlers for item form buttons
       /* $("#btnItemSave").on('click', handleItemSave);
        $("#btnItemUpdate").on('click', handleItemUpdate);
        $("#btnItemDelete").on('click', handleItemDelete);

        // Event delegation for item table rows
        $("#item-table-body").on('click', 'tr', handleItemRowClick);*/
    }

    /*---------------------------  save Item ----------------------------------*/
    $("#btnItemSave").on('click', () => {
        console.log("Button was clicked");


        if (validateAllItemData()) {
            var itemId = $("#ItemId").val();

            var itemName = $("#ItemName").val();

            var itemQty = $("#ItemQty").val();

            var itemPrice = $("#ItemPrice").val();


            const item = {
                code: itemId,
                name: itemName,
                qty: itemQty,
                price: itemPrice

            };


            const jsonItem = JSON.stringify(item);
            console.log("jsonObject:" + item);


            $.ajax({
                url: "http://localhost:8080/api/v1/item",
                type: "POST",
                data: jsonItem,
                headers: {"Content-Type": "application/json"},
                success: function (results) {
                    console.log("results" + results)
                    alert('Item saved successfully...')
                    loadItemTable()

                },
                error: function (error) {
                    console.log(error)
                    alert('Item not saved...')
                }
            });


            /*    loadTable();*/
            $("#btnCusClear").click();

        }

    });

    /*------------------------------------------------------*/


    /*---------------------------- update an item --------------------------*/
    $("#btnItemUpdate").on('click', () => {
        console.log("update button clicked");

        if (validateAllItemData()) {
            var itemId = $("#ItemId").val();

            var itemName = $("#ItemName").val();

            var itemQty = $("#ItemQty").val();

            var itemPrice = $("#ItemPrice").val();


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


            $("#btnItemClear").click();
        }

    });


    /*-------------------------------------------------------------------*/

    /*----------------------  delete Item  ------------------------------------------*/

    $("#btnItemDelete").on('click', () => {
        console.log("delete button clicked");

        var ItemId = $("#ItemId").val();
        $.ajax({
            url: "http://localhost:8080/api/v1/item/" + ItemId,
            type: "DELETE",
            success: function (results) {
                console.log(results)
                alert('Item DELETED successfully...')
                loadItemTable()

            },
            error: function (error) {
                console.log(error)
                alert('Item DELETION failed......')
            }
        });

    });


    /*-----------------------------------------------------------------------------------*/

    $("#btnItemClear").on('click', () => {
        console.log("clear button clicked");
    });


    /*---------------- load table -------------------------------*/
    function loadItemTable() {
        console.log("loadTable function called");

        $.ajax({
            url: "http://localhost:8080/api/v1/item",
            type: "GET",
            dataType: "json",

            success: function (results) {
                console.log(results);


                $('#item-table-body').empty(); // Clear the existing table body

                results.forEach(function (item) {
                    var record = `
                        <tr>
                            <td class="item-id-value">${item.code}</td>
                            <td class="item-name-value">${item.name}</td>
                            <td class="item-qty-value">${item.qty}</td>
                            <td class="item-price-value">${item.price}</td>
                        </tr>
                    `;
                    $("#item-table-body").append(record);
                })
            },

            error: function (error) {
                console.log(error)
                alert('ewwwwwwwww')


            }
        });
    }
    /*-------------------------------------------------------------*/



    /*-------------------- get from the index --------------------*/
    $('#item-table-body').on('click', 'tr', function () {

        let index = $(this).index();
        ItemRecordIndex = index;

        console.log("index: ", index);

        let Id = $(this).find(".item-id-value").text();
        console.log(Id)
        let Name = $(this).find(".item-name-value").text();
        console.log(Name)
        let Qty = $(this).find(".item-qty-value").text();
        console.log(Qty)
        let Price = $(this).find(".item-price-value").text();
        console.log(Price)


        $("#ItemId").val(Id);
        $("#ItemName").val(Name);
        $("#ItemQty").val(Qty);
        $("#ItemPrice").val(Price);


    });
    /*------------------------------------------------------------*/


    /*-------------- validate methods ----------------------------*/


    function validateItemId() {
        console.log("method validateItemId called");

        var ItemId = $('#ItemId').val();
        let pattern = /^I\d{3}$/;

        if (pattern.test(ItemId)) {
            $('#error-ItemId').html("");
            return true;
        } else {
            $('#error-ItemId').html("Please enter in the I-*** format  ");
            return false;
        }
    }

    function validateItemName() {
        console.log("method validateItemName called");

        var ItemName = $('#ItemName').val();
        let pattern = /^[A-Za-z]+(([' -][A-Za-z ])?[A-Za-z]*)*$/;

        if (pattern.test(ItemName)) {
            $('#error-ItemName').html("");
            return true;
        } else {
            $('#error-ItemName').html("Please enter a valid Name  ");
            return false;
        }
    }


    function validateItemQty() {
        console.log("method validateItemQty called");

        var Itemqty = $('#ItemQty').val();
        let pattern = /^[1-9]\d*$/;

        if (pattern.test(Itemqty)) {
            $('#error-ItemQty').html("");
            return true;
        } else {
            $('#error-ItemQty').html("Please enter a valid quantity ");
            return false;
        }
    }


    function validateItemPrice() {
        console.log("method validateItemprice called");

        var ItemPrice = $('#ItemPrice').val();
        let pattern = /^\d{1,4}\.\d{2}$/;


        if (pattern.test(ItemPrice)) {
            $('#error-ItemPrice').html("");
            return true;
        } else {
            $('#error-ItemPrice').html("Please enter in the format Rs.****");
            return false;
        }
    }

    /*
    $('#ItemId').on('input',validateItemId);
    $('#ItemName').on('input',validateItemName);
    $('#ItemQty').on('input',validateItemQty);
    $('#ItemPrice').on('input',validateItemPrice);
    */


    function validateAllItemData() {
        // Call each validation method and store the result
        let isValidId = validateItemId();
        let isValidName = validateItemName();
        let isValidQty = validateItemQty();
        let isValidPrice = validateItemPrice();

        // Check if all validation methods return true
        if (isValidId && isValidName && isValidQty && isValidPrice) {
            // All validations passed
            return true;
        } else {
            // At least one validation failed
            return false;
        }
    }

    /*-------------------------------------------------------------*/


//////////////////dom//////////

});
/*-------------------------------------------------------------*/
