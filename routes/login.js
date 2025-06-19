const express = require('express');

const mongoose = require('mongoose');
const User = require("../models/user");


const router = express.Router();
router.use(express.urlencoded({extended: false}))

router.post('/', async (req, res) => {
    const data = req.body
    const response = await Login.create(data)
    res.send("successful");
})

module.exports = router;