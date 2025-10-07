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
    image: "/assets/logo.png"
  },
  {
    _id: "2",
    name: "Metrocom Desk Lamp",
    sku: "MC-LAMP-002",
    image: "/assets/logo.png"
  },
  {
    _id: "3",
    name: "Metrocom Filing Cabinet",
    sku: "MC-CAB-003",
    image: "/assets/logo.png"

  }
];

router.get('/products',(req, res) => {
    res.render('manageProducts', { products: sampleProducts})
});

module.exports = router;