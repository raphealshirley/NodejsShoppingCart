/*
Used for create products
*/
const mongoose = require('mongoose');
const Product = require('../models/product');

async function createProduct(){
  const product1 = new Product({
    title:'1',
    description: 'A',
    category: 'CA',
    price: 1
  });
  const result1 = await product1.save();
  console.log(result1);

  const product2 = new Product({
    title:'2',
    description: 'B',
    category: 'CB',
    price: 2
  });
  const result2 = await product2.save();
  console.log(result2);

  const product3 = new Product({
    title:'3',
    description: 'C',
    category: 'CC',
    price: 3
  });
  const result3 = await product3.save();
  console.log(result3);

  const product4 = new Product({
    title:'4',
    description: 'D',
    category: 'CD',
    price: 4
  });
  const result4 = await product4.save();
  console.log(result4);

  const product5 = new Product({
    title:'5',
    description: 'E',
    category: 'CE',
    price: 5
  });
  const result5 = await product5.save();
  console.log(result5);

  const product6 = new Product({
    title:'6',
    description: 'F',
    category: 'CF',
    price: 6
  });
  const result6 = await product6.save();
  console.log(result6);

  const product7 = new Product({
    title:'7',
    description: 'G',
    category: 'CG',
    price: 7
  });
  const result7 = await product7.save();
  console.log(result7);

  const product8 = new Product({
    title:'8',
    description: 'G',
    category: 'CG',
    price: 8
  });
  const result8 = await product8.save();
  console.log(result8);

  const product9 = new Product({
    title:'9',
    description: 'H',
    category: 'CH',
    price: 9
  });
  const result9 = await product9.save();
  console.log(result9);
}
  
createProduct();