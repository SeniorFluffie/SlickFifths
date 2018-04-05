const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Order = require('../models/order');
var paypal = require('paypal-rest-sdk');

var cart;
var totalPrice;

// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next) {
  console.log(`ROUTE: GET CHECKOUT PAGE`)
  cart = new Cart(req.session.cart)
  res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice, bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
});

// POST checkout-process
router.post('/checkout-process', function(req, res) {
  console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
  cart = new Cart(req.session.cart);
  totalPrice = cart.totalPrice.toFixed(2);
  var cartItems = [];

  for(key in cart.items) {
    cartItems.push({
      name:       String(cart.items[key].item.title),
      sku:        String(key),
      price:      String(cart.items[key].item.price),
      currency:   "CAD",
      quantity:   cart.items[key].qty,
    })
  }

  var create_payment_json = {
    "intent": "sale",
    "payer": { "payment_method": "paypal" },
    "redirect_urls": {
      "return_url": "http://localhost:3000/checkout/checkout-success",
      "cancel_url": "http://localhost:3000/checkout/checkout-cancel"
    },
    "transactions": [{
      "item_list": { "items": cartItems },
      "amount": {
        "currency": "CAD",
        "total": totalPrice,
      },
      "description": "Slick Fifths thanks you for record purchase."
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.log(error);
      throw(error);
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      for(i of payment.links)
        if (i.rel === "approval_url")
      res.redirect(i.href);
      var newOrder = new Order({
        orderID             : payment.id.substr(4),
        username            : req.user.username,
        orderPrice          : "$".concat(totalPrice).concat("\nCAD"),
        address             : "1 Maire-Victorin, Toronto, Ontario M5A 1E1, Canada",
        orderDate           : payment.create_time,
        shipping            : (Math.random() >= 0.5) });
      newOrder.save();
    }
  });
});

// GET CHECKOUT-SUCCESS
router.get('/checkout-success', ensureAuthenticated, function(req, res) {
  console.log(`ROUTE: GET CHECKOUT-SUCCESS`)

  req.session.cart.totalQty = 0;
  req.session.cart.totalPrice = 0;
  req.session.cart.items = {};

  cart = new Cart(req.session.cart);
  totalPrice = cart.totalPrice;

  res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function(req, res) {
  console.log(`ROUTE: GET CHECKOUT-CANCEL`)
  res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});
});

// ENSURE USER AUTHENTICATION
function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated())
  return next();
  else {
    console.log(`ERROR: USER IS NOT AUTHENTICATED`)
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/');
  }
}

module.exports = router;
