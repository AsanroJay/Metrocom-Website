const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('index')
});

router.get('/products', (req,res) => {
    res.render('products')
});

router.get('/product-details', (req,res) => {
    res.render('product-details') //temporary, we will use /products/:id later on
});

router.get('/about-us', (req,res) =>{
    res.render('about')
});

module.exports = router;