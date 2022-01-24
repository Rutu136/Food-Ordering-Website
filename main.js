if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', loading)
} else {
    loading()
}

var popUp;
function popup() {
    
    var x = confirm("Add this item?").valueOf();
    popUp=x;
}

function loading(){
    var removeBtn = document.getElementsByClassName('remove-btn')
    for(var i=0;i<removeBtn.length;i++)
    {
        removeBtn[i].addEventListener('click',function(e){
            var buttonRemove = e.target;
            buttonRemove.parentElement.parentElement.remove();
            updateOnClick();
        })
    }

    var confirmBtn = document.getElementById('place-order-button')
        confirmBtn.addEventListener('click',function(e){
            var tar = e.target;
            if(tar.length==0)
            {
                alert('you can not.')
            }
        })
    
    var getQuant = document.getElementsByClassName('noof-item-count')
    for(var i=0;i<getQuant.length;i++)
    {
        getQuant[i].addEventListener('change',function(e){
            var numOfItem = e.target;
            if(numOfItem.value == isNaN || numOfItem.value <=0)
            {
                numOfItem.value=1;
            }
            updateOnClick();
        })
    }
    var addItemCart = document.getElementsByClassName('list-of-items-addBtn')
    for(var i=0;i<addItemCart.length;i++)
    {
        addItemCart[i].addEventListener('click',function(e){
            var target = e.target;
            var getTheDetails = target.parentElement;
            var description = getTheDetails.getElementsByClassName('list-of-items-description')[0].innerText;
            var priceItem = getTheDetails.getElementsByClassName('list-of-items-price')[0].innerText;
            if(popUp.valueOf()==true)
            {
                addToCart(description,priceItem);
                updateOnClick();
            }
        })
    }

}

function addToCart(descript,price)
{
    var newItemCreated = document.createElement('div');
    newItemCreated.classList.add('cart-display');
    var addInContainer = document.getElementsByClassName('cart-container')[0];
    var itemName = addInContainer.getElementsByClassName('cart-itemname');

    for(var i=0;i<itemName.length;i++)
    {
        if(itemName[i].innerText== descript)
        {
            alert('You have already added that item. you can increse the quantity.');
            return
        }
    }

    addInContainer.append(newItemCreated);
    var cartRowVaria = `
    <div class="cart-item col">
        <span class="cart-itemname col">${descript}</span>
    </div>
    <div class="cart-noof-item col">
        <input class="noof-item-count" type="number" value="1">
        <button class="remove-btn" type="button">REMOVE</button>
    </div>
    <span class="cart-item-price col">${price}</span>`
    newItemCreated.innerHTML =cartRowVaria;
    addInContainer.append(newItemCreated);
    newItemCreated.getElementsByClassName('remove-btn')[0].addEventListener('click',function(e){
        var buttonRemove = e.target;
        buttonRemove.parentElement.parentElement.remove();
        updateOnClick();
    })

    newItemCreated.getElementsByClassName('noof-item-count')[0].addEventListener('change',function(e){
        var numOfItem = e.target;
        if(numOfItem.value == isNaN || numOfItem.value <=0)
        {
            numOfItem.value=1;
        }
        updateOnClick();
    })
}

function updateOnClick()
{
    var cartUpdate = document.getElementsByClassName('cart-container')[0];
    var ItemsCart = cartUpdate.getElementsByClassName('cart-display');
    var totalPrice = 0;
    var count=0;
    for (var i = 0; i < ItemsCart.length; i++) {
        var singleItem = ItemsCart[i];
        var singleItemPrice = singleItem.getElementsByClassName('cart-item-price')[0];
        var singleItemQuantity = singleItem.getElementsByClassName('noof-item-count')[0];
        var price = parseFloat(singleItemPrice.innerText.replace('$',''));
        var qunt = parseInt(singleItemQuantity.value);
        var totalPrice =totalPrice+ (price*qunt);
        var count = count + qunt;
    }
    totalPrice = Math.round(totalPrice * 100) / 100;
    document.getElementsByClassName('total-items')[0].innerText = 'Total Items:'+count;
    document.getElementsByClassName('total-updated-price')[0].innerText ='Total Price: $'+ totalPrice;
}

function hidemultiple(shown,hidden2) {
    
    var cartUpdate = document.getElementsByClassName('cart-container')[0];
    var ItemsCart = cartUpdate.getElementsByClassName('cart-display');
    var count=0;
    for (var i = 0; i < ItemsCart.length; i++) {
        var singleItem = ItemsCart[i];
        var singleItemQuantity = singleItem.getElementsByClassName('noof-item-count')[0];
        var qunt = parseInt(singleItemQuantity.value);
        var count = count + qunt;
    }
    if(count==0)
    {
        alert('You have to select at-least one item to place an order.');
        return
    }
    if(count!=0)
    {
        document.getElementById(shown).style.display = 'block';
        document.getElementById(hidden2).style.display = 'none';
    }

    return false;
}

function showmultiple(shown, shown1,shown2,hidden1,hidden2,hidden3) {

    
        document.getElementById(shown).style.display = 'block';
        document.getElementById(shown1).style.display = 'block';
        document.getElementById(shown2).style.display = 'block';
        document.getElementById(hidden1).style.display = 'none';
        document.getElementById(hidden2).style.display = 'none';
        document.getElementById(hidden3).style.display = 'none';
    
    return false;
}

function showOnDisplay(shown, hidden) {
    document.getElementById(shown).style.display = 'flex';
    document.getElementById(hidden).style.display = 'none';
    return false;
}

function address(shown,hidden) {
    var x = document.getElementById("address").value;
    console.log(x);
    if(x == '')
    {
        alert('Please enter the address to serve you better');
        return
    }
    else(x != '')
    {
        document.getElementById("locations").innerHTML = x;
        
        document.getElementById(shown).style.display = 'block';
        document.getElementById(hidden).style.display = 'none';
    }
    var y = document.getElementById("Name").value;
    if (y != '') {
        document.getElementById("change-name").innerHTML = y;
    }
    return false;
}

function getChecked(shown,hidden)
{
    var x = document.getElementById('street-box').value
    var y = document.getElementById('cvvnum').value
    console.log(x);
    console.log(y);
    if(y == '')
    {
        alert('Please fill out all the field for place the order.');
        return false;
    }
    else if(isNaN(y))
    {
        alert('Please fill out all the field for place the order.');
        return false;
    }
    else
    {
        document.getElementById(shown).style.display = 'block';
        document.getElementById(hidden).style.display = 'none';
    }
    return false;
}

function searchRestaurant()
{
    let getInput = document.getElementById('get-restaurant').value  
    let search = document.getElementsByClassName('goto-res'); 
      
    for (i = 0; i < search.length; i++) {  
        if (!search[i].innerHTML.toLowerCase().includes(getInput)) { 
            search[i].style.display="none"; 
        } 
        else { 
            search[i].style.display="inline";                  
        } 
    } 
}

function displayMsg() {

    var a=document.getElementById('chat-name').value
    var b=document.getElementById('chat-email').value
    var c=document.getElementById('chat-question').value
    if(a == '')
    {
        alert('Please fill the Name field.');
    }
    else if(b == '')
    {
        alert('Please enter the email.');
    }
    else if(c == '')
    {
        alert('Please enter your Question.');
    }
    else{
        var x = "10 people ahead...";
        document.getElementById("submitBtn").innerHTML = x;
    }
    return false;
}


function myFunction(){
    var pswd = document.getElementById("password");
    var confirmpswd = document.getElementById("confirmPassword");
    if (pswd.value != confirmpswd.value) {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Password does not match';
    }
    else {
        document.getElementById('message').innerHTML = '';
    }
}

/*-----------------RECENT CHANGES--------------------*/
//keep track of the current and last visited pages
var currPage = "address-page";
var lastPage = "address-page";
function show(shown, hidden) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    lastPage = hidden;
    currPage = shown;
    return false;
}

function goBack(){
    show(lastPage,currPage);
}

var items = ["KFC-Item1","KFC-Item2","KFC-Item3","KFC-tem4","KFC-Item5","KFC-Item6","KFC-Item7","KFC-Item8",
"KFC-Item9","KFC-Item10","KFC-Item11","KFC-Item12","KFC-Item13","KFC-Item14","KFC-Item15","KFC-Item16",
"MCD-Item1","MCD-Item2","MCD-Item3","MCD-Item4","MCD-Item5","MCD-Item6","MCD-Item7","MCD-Item8","MCD-Item9",
"MCD-Item10","MCD-Item11","MCD-Item12","MCD-Item13","MCD-Item14","MCD-Item15","MCD-Item16","SUB-Item1","SUB-Item2",
"SUB-Item3","SUB-Item4","SUB-Item5","SUB-Item6","SUB-Item7","SUB-Item8","SUB-Item9","SUB-Item10",
"SUB-Item11","SUB-Item12","SUB-Item13","SUB-Item14","SUB-Item15","SUB-Item16"];
var prices =["$10.99","$12.99","$8.99","$10.99","$7.99","$5.99","$2.99","$2.99","$7.99","$5.99","$2.99","$2.99",
"$7.99","$5.99","$2.99","$2.99"];

function addRandItem(){
    var i = Math.floor(Math.random()*items.length);
    addToCart(items[i],prices[i%16]);
}

function showRegister(shown, hidden) {
    var x = document.getElementById('register-input1').value;
    var y = document.getElementById('register-input2').value;
    var z = document.getElementById('register-input3').value;
    if(x == '')
    {
        alert('please fill out all the field.')
    }
    else if(y == '')
    {
        alert('please fill out all the field.')
    }
    else if(z == '')
    {
        alert('please fill out all the field.')
    }
    else
    {
        document.getElementById(shown).style.display = 'block';
        document.getElementById(hidden).style.display = 'none';
        lastPage = hidden;
        currPage = shown;
    }
    return false;
}

function showLogin(shown, hidden) {

    var x =document.getElementById('input-id01').value;
    var y =document.getElementById('input-id02').value;
    if(x == '')
    {
        alert('Please fill all the field.')
    }
    else if(y == '')
    {
        alert('Please fill all the field.')
    }
    else{
        document.getElementById(shown).style.display = 'block';
        document.getElementById(hidden).style.display = 'none';
        lastPage = hidden;
        currPage = shown;
    }
    return false;
}

