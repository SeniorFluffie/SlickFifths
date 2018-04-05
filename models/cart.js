// Cart schema
module.exports = function Cart(oldCart) {
  // if there are old values retrieve them, otherwise new cart
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) {
    if (!this.items[id])
      this.items[id] = {item: item, qty: 0, price: 0};

    this.items[id].qty++;
    this.items[id].price = parseFloat((this.items[id].item.price * this.items[id].qty).toFixed(2));

    this.totalQty++;
    this.totalPrice += this.items[id].price;
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  this.decreaseQty = function(id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.items[id].price = parseFloat(this.items[id].price.toFixed(2));

    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));

    if(this.items[id].qty <= 0)
      delete this.items[id];
  }

  this.increaseQty = function(id) {
    this.items[id].qty++;
    this.items[id].price += this.items[id].item.price;
    this.items[id].price = parseFloat(this.items[id].price.toFixed(2));

    this.totalQty++;
    this.totalPrice += this.items[id].item.price;
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  this.generateArray = function () {
    var arr = [];
    for (let id in this.items)
      arr.push(this.items[id])
    return arr;
  }
};
