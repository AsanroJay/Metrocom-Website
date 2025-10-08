const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('index')
});

router.get('/products', (req,res) => {
    res.render('products', {products: sampleProducts})
});

router.get('/product-details', (req,res) => {
    res.render('product-details') //temporary, we will use /products/:id later on
});

router.get('/about-us', (req,res) =>{
    res.render('about-us')
});

router.get('/contact-us', (req,res) =>{
    res.render('contact-us')
});

router.get('/cart', (req,res) =>{
    res.render('cart')
});


const sampleProducts = [
  {
    _id: "1",
    name: "Metrocom Office Chair",
    sku: "MC-CHAIR-001",
    category: "Furniture",
    subcategory: "Chair",
    image: "/assets/logo.png"
  },
  {
    _id: "2",
    name: "Metrocom Desk Lamp",
    sku: "MC-LAMP-002",
    category: "Furniture",
    subcategory: "Miscellaneous",
    image: "/assets/logo.png"
  },
  {
    _id: "3",
    name: "Metrocom Filing Cabinet",
    sku: "MC-CAB-003",
    category: "Furniture",
    subcategory: "Cabinets",
    image: "/assets/logo.png"

  },
   {
    _id: "4",
    name: "Metrocom 4",
    sku: "MC-LAMP-004",
    category: "Furniture",
    subcategory: "Miscellaneous",
    image: "/assets/logo.png"
  },
];

module.exports = router;