$(document).ready(function ()
{
    init();
    populateYear();
});

function init()
{
    $("#infoPage").hide();
    $("#listPage").hide();
    $("#linkPage").hide();
    $("#btnNew").on("click", btnNew_Click);
    $("#btnSearch").on("click", btnSearch_Click);
    $("#btnSubmit").on("click", btnSubmit_Click);
    $("#btnGoHome").on("click", btnGoHome_Click);
    $("#btnHome").on("click", btnHome_Click);
}

function btnNew_Click()
{
    $("#searchPage").hide();
    $("#infoPage").fadeIn();
}
function btnSearch_Click()
{
    $("#searchPage").hide();
    $("#listPage").fadeIn();
}

function btnHome_Click()
{
    $("#linkPage").hide();
    $("#searchPage").fadeIn();
}
function btnSubmit_Click()
{
    isValid();

    if($("#vehicleForm").valid() == true)
    {
        saveLocally();
        populatePage();
        $("#infoPage").hide();
        $("#linkPage").show();
        buildLink();
        addToList();
    }
    else
    {
        alert("Form is not valid, check values are correct.");
    }

}
function btnGoHome_Click()
{
    $("#listPage").hide();
    $("#searchPage").fadeIn();
}

function saveLocally()
{
    localStorage.setItem("SellerName", $("#txtSellerName").val());
    localStorage.setItem("Address", $("#txtAddress").val());
    localStorage.setItem("Phone",$("#txtPhone").val());
    localStorage.setItem("Email",$("#txtEmail").val());
    localStorage.setItem("Make", $("#cmbMake").val());
    localStorage.setItem("Model", $("#txtModel").val());
    localStorage.setItem("Year", $("#cmbYear").val());
}

function buildLink()
{
    var year = localStorage.getItem("Year");
    var make = localStorage.getItem("Make");
    var model = localStorage.getItem("Model");

    var link = "http://www.jdpower.com/cars/search/"+year+"-"+make+"-"+model+"/"+make+"/"+model+"/non-awardees-included/any-rating/"+year+"/all-msrp-ranges/all-mpg-ranges/";
    $("#lnkJDPower").prop("href",link);
    $("#lnkJDPower").text(link);
}

function addToList()
{
    var name = localStorage.getItem("SellerName");
    var address= localStorage.getItem("Address");
    var phone= localStorage.getItem("Phone");
    var email = localStorage.getItem("Email");
    var make= localStorage.getItem("Make");
    var model= localStorage.getItem("Model");
    var year = localStorage.getItem("Year");

    var list = $("#vehicleLists");
    var text = "<li>Name: " + name + "," + " Address: " + address + "," + " Phone Num: " + phone + "," + " Email: " + email + "," + " Make: " + make + "," + " Model: " + model + "," + " Year: " + year + "," + "</li>";
    list.append(text);

}
function populatePage()
{
    document.getElementById("txtSellerName2").innerHTML = localStorage.getItem("SellerName");
    document.getElementById("txtAddress2").innerHTML  = localStorage.getItem("Address");
    document.getElementById("txtPhone2").innerHTML  = localStorage.getItem("Phone");
    document.getElementById("txtEmail2").innerHTML = localStorage.getItem("Email");
    document.getElementById("txtMake2").innerHTML  = localStorage.getItem("Make");
    document.getElementById("txtModel2").innerHTML  = localStorage.getItem("Model");
    document.getElementById("txtYear2").innerHTML  = localStorage.getItem("Year");
}

function populateYear()
{
    var min = 1980;
    var max = 2017;

    for(var i = min;i<max;i++)
    {
        var select = document.getElementById("cmbYear");

        var combo = document.createElement('option');
        combo.innerHTML = i;
        combo.value = i;
        select.appendChild(combo);
    }
}

function isValid()
{
    var form = $("#vehicleForm");

    form.validate({
        rules:{
            txtSellerName:{
                required:true,
                minlength:2
            },
            txtAddress:{
                required:true,
                minlength:4

            },
            txtPhone:{
                required:true,
                PhoneNum: true
            },
            txtEmail:{
                required:true,
                email:true
            },
            cmbMake:{
                required:true
            },
            txtModel:{
                required:true,
                minlength:3
            },
            cmbYear:{
                required:true
            }


        },
        messages:{
            txtSellerName:{
                required:"This is Required",
                minlength:"Must be more than 2 characters"
            },
            txtAddress:{
                required:"this is required"
            },
            txtPhone:{
                required:"this is required",
                PhoneNum: "Phone number is invalid, enter in format '519-555-555'"
            },
            txtEmail:{
                required:"this is required",
                email:"Must be in format 'someone@example.com'"
            },
            cmbMake:{
                required:"this is required"
            },
            txtModel:{
                required:"this is required",
                minlength:"must be 3 or more characters"
            },
            cmbYear:{
                required:"this is required"
            }
        }
    });

    return form.valid();
}
jQuery.validator.addMethod("PhoneNum",
    function(value, element){
        var regex = /(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/;
        return this.optional(element) || regex.test(value);
    },
    "Phone number is invalid, enter in format '519-555-555'");