//This script manages the input and manipulation of JSON data


/* This is a template for a product object */

class Product {

  constructor(productId, productName, productType, newRelease, productPrice) {
    this.productId = productId;
    this.productName =  productName;
    this.productType = productType;
    this.newRelease = newRelease;
    this.productPrice =  productPrice;
    this.units = 0;
    this.productTotal = function(){
      this.productPrice * this.units;
    }
  }

}


var orderList = [];

var orderSummary = "";

var total = 0;

var listOfProducts = [];

const data = '{"products":[{"productId":"001","productName":"Oblivion","productType":"Movie","newRelease":true,"productPrice":6.50},{"productId":"002","productName":"Iron Man 3","productType":"Movie","newRelease":true,"productPrice":6.50},{"productId":"003","productName":"Monty Python\'s Meaning of Life", "productType":"Movie","newRelease":false,"productPrice":2.00},{"productId":"004","productName":"Star Trek into Darkness","productType":"Movie","newRelease":true,"productPrice":6.50},{"productId":"005","productName":"iRobot","productType":"Movie","newRelease":false,"productPrice":3.50}, {"productId":"006","productName":"Can\'t Hold Us (Macklemore)","productType":"Song","newRelease":true,"productPrice":3.50},{"productId":"007","productName":"Mirrors (Justin Timberlake)","productType":"Song","newRelease":true,"productPrice":3.50},{"productId":"008","productName":"Can\'t touch this (MC Hammer)","productType":"Song","newRelease":false,"productPrice": 1.50},{"productId":"009","productName": "Spirit Got Lost (Mental as Anything)","productType":"Song","newRelease":false,"productPrice":0.99},{"productId":"010","productName":"Only Happy when it Rains (Garbage)","productType":"Song","newRelease":false,"productPrice":0.99},{"productId":"011","productName":"Bangarang (Skrillex)","productType":"Song","newRelease":true,"productPrice":2.50},{"productId":"012","productName":"Splinter (Savant)","productType":"Song","newRelease":true,"productPrice":3.00}]}';



function loadJSONData() {

  //Parse JSON Data
  dataList = JSON.parse(data);

  for (let i = 0; i < dataList.products.length; i++) {
    // Create object of product for sale
    var product = new Product(dataList.products[i].productId, dataList.products[i].productName, dataList.products[i].productType, dataList.products[i].newRelease, dataList.products[i].productPrice);
    console.log(product.productName);
    //Add that product to list of product objects for future use
    listOfProducts.push(product);
    console.log(listOfProducts);

    //Populate the side menu
    if (product.productType == "Song"){
      //Add item as a new li to Songs menu
      var item = '<a href="#" id="'+product.productId+'" class="itemForSale">'+product.productName+'</a>';
      console.log(item);
      var ul = document.getElementById("songItems");
      var li = document.createElement("li");
      li.innerHTML = item;
      ul.appendChild(li);
    }
    else if (product.productType == "Movie") {
      //Add item as a new li to Movies menu
      var item = '<a href="#" id="'+product.productId+'" class="itemForSale">'+product.productName+'</a>';
      console.log(item);
      var ul = document.getElementById("movieItems");
      var li = document.createElement("li");
      li.innerHTML = item;
      ul.appendChild(li);
    }
    else {
      //Error in data
    }

  }
}





function selectedLink(e) {
  //When an item from the menu is clicked it is added to the cart section of the page

  //First identify all items in the menu
  if (e.srcElement.className == 'itemForSale') {

    //Get the clicked item (try parse into Product Object)
    var clickedObjectId = e.srcElement.id;

    //Format id for index of array
    var idTurnedToArrayIndex = formatIdForIndexOfArray(clickedObjectId);
    console.log(listOfProducts[idTurnedToArrayIndex])

    var item = '<p id="'+listOfProducts[idTurnedToArrayIndex].productId+'+item">Product: '+listOfProducts[idTurnedToArrayIndex].productName+', Price: $'+listOfProducts[idTurnedToArrayIndex].productPrice.toFixed(2)+'</p>';
    var row = document.getElementById("rows");
    var p = document.createElement("p");
    p.innerHTML = item;
    row.appendChild(p);

    //Create button to add to quote
    var addToQuoteButton = '<a href="#" id="0'+listOfProducts[idTurnedToArrayIndex].productId+'" class="addToQuoteButton">Add to Quote</a>';
    var row = document.getElementById('rows');
    var buttonX = document.createElement('button');
    buttonX.innerHTML = addToQuoteButton;
    row.appendChild(buttonX);

    //Add event listener for the add to quote button
    document.addEventListener("click", addToQuote);

  }
  else {
    //Nothing
  }

}

function formatIdForIndexOfArray(id) {
  var placeInList = 0;

  placeInList= 1*id;

  return placeInList-1;
}


function addToQuote(e) {
  //Validating that this event should only fire when the Add to Quote button is clicked

  //First identify all add to quote buttons
  if (e.srcElement.className == 'addToQuoteButton'){

    //Save event clicked id to variable
    var eventClickedId = e.srcElement.id;

    //Format id for index of array
    var idTurnedToArrayIndex = formatIdForIndexOfArray(eventClickedId);

    //Add to orderList
    for (let i=0; i < listOfProducts.length; i++){
      if (idTurnedToArrayIndex == i) {
        orderList.push(idTurnedToArrayIndex);

        //Provide alert for user so they know the item is added
        alert(listOfProducts[idTurnedToArrayIndex].productName + "\nhas been added to your cart.");

        //Create a button to delete from quote
        var removeFromQuoteButton = '<a href="#" id="00'+listOfProducts[idTurnedToArrayIndex].productId+'" class="removeFromQuoteButton">Remove From Quote</a>';
        var row = document.getElementById("rows");
        var buttonY = document.createElement('button');
        buttonY.innerHTML = removeFromQuoteButton;
        row.appendChild(buttonY);

        //Add event listener for the remove from quote button
        document.addEventListener("click", removeFromQuote);



      }
    }
  }
}

function removeFromQuote(e) {
  //Validating that this event should only fire when the remove from quote button is clicked

  //First identify all remove from quote buttons
  if (e.srcElement.className == 'removeFromQuoteButton'){

    //Save event clicked id to variable
    var eventClickedId = e.srcElement.id;

    //Format id for index of array
    var idTurnedToArrayIndex = formatIdForIndexOfArray(eventClickedId);

    //Add to orderList
    for (let i=0; i < listOfProducts.length; i++){
      if (idTurnedToArrayIndex == i) {
        orderList.splice(listOfProducts[idTurnedToArrayIndex], 1);

        //Provide alert for user so they know the item is removed
        alert(listOfProducts[idTurnedToArrayIndex].productName + "\nhas been removed from your cart.");

      }
    }

    //Remove button as you can't remove twice
    var element = document.getElementById(eventClickedId);
    element.parentNode.removeChild(element);
  }

}


//When the get quote button is clicked it creates a summary of the items
//and displays this summary as an alert
function createQuote(e) {
  var clickedButtonId = e.srcElement.id;

  if (clickedButtonId == "submit") {
    var total = 0;
    var orderSummary = "";

    for (let i=0; i< orderList.length; i++) {
      var x = orderList[i];


      //To fix formatting of bools
      if (listOfProducts[x].newRelease == true) {
        listOfProducts[x].newRelease = "Yes";
      }
      else {
        listOfProducts[x].newRelease = "No";
      }


      //Create order summary
      orderSummary += "Product: " + listOfProducts[x].productName + "\n" +
        "New Release: " + listOfProducts[x].newRelease + "\n" +
        "Type: " + listOfProducts[x].productType + "\n" +
        "Price: $" + listOfProducts[x].productPrice.toFixed(2) + "\n\n";

      total += listOfProducts[x].productPrice;

    }
    alert(orderSummary + "\n" + "Total: $" + total.toFixed(2));
  }
}

//For removing the add to cart button
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}



//This function inserts the tool tip span into the HTML doc
function setupToolTips(id, msg) {
  let newID = id + 'tip';
  document.getElementById(newID).innerHTML = msg;
  document.getElementById(newID).style.visibility = "hidden";

}


window.onload = function() {
  'use strict'



  //Load Json data into the menu
  loadJSONData();

  //Set up link clicked in the menu
  document.addEventListener("click", selectedLink);
  //Set up get quote button
  document.addEventListener("click", createQuote);


  //Enable tool tips on the get quote button
  U.enableToolTips('submit');

  setupToolTips('submit', 'When you are ready to get your order click here');


}









