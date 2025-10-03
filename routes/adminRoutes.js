const express = require('express')
const router = express.Router()

router.get('/quota', (req, res) =>{
    res.render('quota')
});

module.exports = router;