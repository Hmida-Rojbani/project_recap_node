const express = require('express');
const router = express.Router();

router.get(['','/','/index'], (req,res)=>{
    res.send('<h1> Welcome to My Application </h1>')
});

module.exports = router;