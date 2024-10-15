

var CusRecordIndex;




$(document).ready(function() {
    loadTable()


        /*--------------------------------------------------------------------------*/


        function loadTable() {
            console.log("loadTable function called Customer");


            $.ajax({
                url: "http://localhost:8080/api/v1/customer",
                type: "GET",
                dataType: "json",

                success: function (results) {
                    console.log(results);


                    $('#Cus-table-body').empty();  // Clear the existing table body

                    results.forEach(function (customer) {
                        var record = `
                        <tr>
                            <td class="cus-id-value">${customer.id}</td>
                            <td class="cus-name-value">${customer.name}</td>
                            <td class="cus-address-value">${customer.address}</td>
                            <td class="cus-contactNo-value">${customer.phone}</td>
                        </tr>
                    `;
                        $("#Cus-table-body").append(record);
                    })
                },

                error: function (error) {
                    console.log(error)
                    alert('ewwwwwwwww')


                }
            });
        }


            /*--------------------------------------------------------------------------*/

            /*=======================get data from the current index=====================*/

            $("#Cus-table-body").on('click', 'tr', function () {

                let index = $(this).index();
                CusRecordIndex = index;

                console.log("index: ", index);

                let Id = $(this).find(".cus-id-value").text();
                let Name = $(this).find(".cus-name-value").text();
                let Address = $(this).find(".cus-address-value").text();
                let ContactNo = $(this).find(".cus-contactNo-value").text();


                $("#cusId").val(Id);
                $("#cusFullname").val(Name);
                $("#cusAddress").val(Address);
                $("#cusContactNo").val(ContactNo);


            });


            /*---------------------------      save a customer      -----------------------------------*/

            $("#btnCusSave").on('click', () => {
                console.log("start button Customer");
                alert("cusSaveBTn")

                if (validateAll()) {
                    var CustomerId = $("#cusId").val();

                    var CustomerName = $("#cusFullname").val();

                    var CustomerAddress = $("#cusAddress").val();

                    var CustomerContact = $("#cusContactNo").val();


                    const customer = {
                        id: CustomerId,
                        name: CustomerName,
                        address: CustomerAddress,
                        phone: CustomerContact

                    };


                    const jsonCustomer = JSON.stringify(customer);
                    console.log("jsonObject:" + customer);


                    $.ajax({
                        url: "http://localhost:8080/api/v1/customer",
                        type: "POST",
                        data: jsonCustomer,
                        headers: {"Content-Type": "application/json"},
                        success: function (results) {
                            console.log(results)
                            alert('Customer saved successfully...')
                            loadTable()
                        },
                        error: function (error) {
                            console.log(error)
                            alert('Customer not saved...')
                        }
                    });



                    $("#btnCusClear").click();

                }
            });
            /*------------------------------------------------------------------------------------------*/


            /*---------------------------     update a customer      -----------------------------------*/

            $("#btnCusUpadate").on('click', () => {

                var customerId = $("#cusId").val();

                var CustomerName = $("#cusFullname").val();

                var CustomerAddress = $("#cusAddress").val();

                var CustomerContact = $("#cusContactNo").val();

                const customer = {
                    id: customerId,
                    name: CustomerName,
                    address: CustomerAddress,
                    phone: CustomerContact

                };


                const jsonCustomer = JSON.stringify(customer);
                console.log("jsonObject:" + customer);


                $.ajax({
                    url: "http://localhost:8080/api/v1/customer/" + customerId,
                    type: "PUT",
                    data: jsonCustomer,
                    headers: {"Content-Type": "application/json"},
                    success: function (results) {
                        console.log(results)
                        alert('Customer updated successfully...')
                        loadTable();
                    },
                    error: function (error) {
                        console.log(error)
                        alert('Customer update failed......')
                    }
                });


                $("#btnCusClear").click();
            });

            /*----------------------------------------------------------------------------------------------------*/


            /*---------------------------    delete a customer      -----------------------------------*/


            $("#btnCusDelete").on('click', () => {

                var cusId = $("#cusId").val();
                $.ajax({
                    url: "http://localhost:8080/api/v1/customer/" + cusId,
                    type: "DELETE",
                    success: function (results) {
                        console.log(results)
                        alert('Customer DELETED successfully...')
                        loadTable()
                    },
                    error: function (error) {
                        console.log(error)
                        alert('Customer DELETION failed......')
                    }
                });



                $("#btnCusClear").click();
            });


            /*------------------------------------------------------------------------------------------------------*/


            /*---------------------------      VALIDATION      -----------------------------------*/

            function validateCusId() {
                console.log("validate method called");

                var CustomerId = $("#cusId").val();
                let pattern = /^C\d{3}$/;


                if (pattern.test(CustomerId)) {
                    $('#error-msgId').html("");
                    return true;
                } else {
                    $('#error-msgId').html("Please enter the id in C-*** format");
                    console.log("Please enter the id in C-*** format");
                    return false;
                }
            }

            function validateCusName() {
                console.log("validate method called for Name");

                var CustomerName = $("#cusFullname").val();
                let pattern = /^[A-Za-z]+(([' -][A-Za-z ])?[A-Za-z]*)*$/;


                if (pattern.test(CustomerName)) {
                    $('#error-msgName').html("");
                    return true;
                } else {
                    $('#error-msgName').html("Please enter a valid name");
                    console.log("Please enter a valid name");
                    return false;
                }
            }

            function validateCusAddress() {
                console.log("validate method called for Name");

                var CustomerAddress = $("#cusAddress").val();
                let pattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
                ;


                if (pattern.test(CustomerAddress)) {
                    $('#error-msgAddress').html("");
                    return true;
                } else {
                    $('#error-msgAddress').html("Please enter a valid address");
                    console.log("Please enter a valid Address");
                    return false;
                }
            }


            function validateCusContact() {
                console.log("validate method called for Contact");

                var CustomerContact = $("#cusContactNo").val();
                let pattern = /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/;


                if (pattern.test(CustomerContact)) {
                    $('#error-msgContact').html("");
                    return true;
                } else {
                    $('#error-msgContact').html("Please enter a valid address");
                    console.log("Please enter a valid Address");
                    return false;
                }
            }


            $("#cusId").on('input', validateCusId);
            $("#cusFullname").on('input', validateCusName);
            $("#cusAddress").on('input', validateCusAddress);
            $("#cusContactNo").on('input', validateCusContact);


            /*--------------------------------------------------------------------------------------------*/


            /*--------------------------- ----------     VALIDATE ALL     -------------------------------*/

            function validateAll() {
                // Call each validation method and store the result
                let isValidId = validateCusId();
                let isValidName = validateCusName();
                let isValidAddress = validateCusAddress();
                let isValidContact = validateCusContact();

                // Check if all validation methods return true
                if (isValidId && isValidName && isValidAddress && isValidContact) {
                    // All validations passed
                    return true;
                } else {
                    // At least one validation failed
                    return false;
                }
            }

            /*--------------------------------------------------------------------------------------------*/


            /*================================================Cus Search====================================*/


// Function to simulate fetching customer data (replace with your actual backend call)

            // Function to handle customer search
            $('#searchButton').on('click', function () {
                var customerName = $('#CusSearchBar').val().trim(); // Get customer name from input

                // Perform a check to ensure customerName is not empty
                if (customerName === '') {
                    alert('Please enter a customer name.');
                    return;
                }


                var customerData = findCustomerByName(customerName); // Replace with your actual function to fetch data


                if (customerData) {
                    alert("Customer Found :)");
                } else {
                    alert("CustomerNot Found :(");
                }

                $('#CusSearchBar').val('');

            });


            // Function to simulate fetching customer data (replace with your actual backend call)
            function findCustomerByName(name) {

                for (var i = 0; i < customers.length; i++) {
                    if (name === customers[i].Name) {
                        console.log("cusName", customers[i].Name);
                        $('#cusId').val(customers[i].id);
                        $('#cusName').val(customers[i].Name);
                        $('#cusAddress').val(customers[i].address);
                        $('#cusContactNo').val(customers[i].contactNo);
                        return true;
                    }
                }

            }


////////////////////////////  dom eke end eka /////////////

});





