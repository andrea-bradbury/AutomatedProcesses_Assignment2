/* This is holds the template for a product object */



class Product {

  constructor(productId, productName, productType, newRelease, productPrice, units) {
    this.productId = productId;
    this.productName =  productName;
    this.productType = productType;
    this.newRelease = newRelease;
    this.productPrice =  productPrice;
    this.units = units;
  }
  productTotal(){
    this.productPrice * this.units;
  }


};

function orderTotal() {
  let total;

  for (let i=0; i < listOfProducts.length, i++ ; ) {
    total += listOfProducts[i].productTotal();
  }
  return total;
};



