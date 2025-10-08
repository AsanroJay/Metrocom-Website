const express = require('express')
const router = express.Router()

router.get('/quota', (req, res) =>{
    res.render('quota')
});


// TEMP PRODUCTS
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

  }
];

router.get('/products',(req, res) => {
    res.render('manageProducts', { products: sampleProducts})
});

module.exports = router;