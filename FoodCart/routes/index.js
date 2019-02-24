const Cart = require('../models/cart');
const Product = require('../models/product');
const Transaction = require('../models/transaction');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//get home page
router.get('/', async (req, res) => {
  //show all products
  const products = await Product.find().sort('title');
  res.send(products);  
});

//get shopping cart
router.get('/cart', async (req, res, next) => {
  if(!req.session.cart){
    var newCart = new Cart({items: {}, totalPrice: 0}); 
  }
  else{
    var newCart = new Cart(req.session.cart);
  }
  res.send(newCart);
});


//add to cart
router.put('/cart/add/:id', async (req, res, next) => {
  var productId = req.params.id; 

  // if cart is empty, create an empty cart
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {}, totalPrice: 0 }); 

  // find all products
  const product = await Product.findByIdAndUpdate(productId);
  if (!product) return res.status(404).send('The product with the given ID was not found.');
  // add product to cart
  cart.add(product, product.id); 
  // store cart in the cookie
  req.session.cart = cart; 
  res.send(cart);

});

//reduce number of product in cart
router.get('/cart/reduce/:id', async (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}, totalPrice: 0});

  cart.reduce(productId);
  req.session.cart = cart;

  res.send(cart);
});

//remove product from cart
router.get('/cart/remove/:id', async (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}, totalPrice: 0});

  const product = await Product.findByIdAndUpdate(productId);
  if (!product) return res.status(404).send('The product with the given ID was not found.');
  
  cart.removeItem(productId);
  req.session.cart = cart;

  res.send(cart)
});

//checkout
router.get('/cart/checkout', async (req, res) => {
  if(!req.session.cart) return res.status(404).send('The cart is empty');
  var cart = new Cart(req.session.cart);
  
  //create new trasaction and save
  const transaction = new Transaction({
    timeStamp: Date.now(),
    totalPrice: cart.totalPrice
  });
  const result = await transaction.save();

  //clean cart
  cart.clean();

  res.send(result);
});

//report of transactions, 5 default
router.get('/report', async (req, res) => {
  const transactions = await Transaction.find().sort('id').limit(5);
  res.send(transactions);
});

module.exports = router;